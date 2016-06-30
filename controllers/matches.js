var mongoose = require('mongoose');
var db = require('../config/db');
var chalk = require('chalk');
var Match = db.model('Match');
var Stadium = db.model('Stadium');
var League = db.model('League');
var TeamProfile = db.model('TeamProfile');
var SeasonRound = db.model('SeasonRound');
var Season = db.model('Season');


var getPage =  function (req, res) {  
    var docs = {};
    var matches = [];
    Match.find({}).populate('league awayTeam homeTeam matchRound season stadium')
         .exec().then( function(matchesFromDb){
            {
             for (var i = matchesFromDb.length - 1; i >= 0; i--) {
                var match = {
                    "id": matchesFromDb[i].id,
                    "awayTeamFanScore": matchesFromDb[i].awayTeamFanScore,
                    "homeTeamFanScore": matchesFromDb[i].homeTeamFanScore,
                    "awayTeamRealScore": matchesFromDb[i].awayTeamRealScore,
                    "homeTeamRealScore": matchesFromDb[i].homeTeamRealScore,
                    "league": (matchesFromDb[i].league) ? matchesFromDb[i].league.id : null,
                    "season" : (matchesFromDb[i].season) ? matchesFromDb[i].season.id : null, 
                    "matchRound" : (matchesFromDb[i].matchRound) ? matchesFromDb[i].matchRound.id : null,
                    "stadium" : (matchesFromDb[i].stadium) ? matchesFromDb[i].stadium.id : null, 
                    "awayTeam" : (matchesFromDb[i].awayTeam) ? matchesFromDb[i].awayTeam.id : null, 
                    "homeTeam" : (matchesFromDb[i].homeTeam) ? matchesFromDb[i].homeTeam.id : null,
                    "matchDate" : matchesFromDb[i].matchDate
                    };
                matches.push(match);
                }   
            }

            docs["matches"] = JSON.stringify(matches);
            return Stadium.find({}, '_id name').exec();
        }
    ).catch((err) => {
        console.log(err);
    })
     .then(function(stadiumsFromDb){
        docs["stadiums"] = JSON.stringify(stadiumsFromDb);
        return League.find({}, '_id name teams').populate('teams').exec();
    }).then(function(leaguesFromDb){
        docs["leagues"] = JSON.stringify(leaguesFromDb);
        return TeamProfile.find({}, '_id name').exec();
    }).then(function (teamsFromDb) {
        docs["teams"] = JSON.stringify(teamsFromDb);
        return SeasonRound.find({}, '_id title').exec();
    }).then(function (seasonRoundsFromDb) {
        docs["matchRounds"] = JSON.stringify(seasonRoundsFromDb);
        return Season.find({}, '_id year').exec();
    }).then(function (seasonsFromDb) {
        docs["seasons"] = JSON.stringify(seasonsFromDb);
        return res.render('matches', docs);
    });
};

var get =  function (req, res) { 
    var matches = [];
    Match.find({}).populate('awayTeam league homeTeam matchRound season stadium')
         .exec(function(err, matchesFromDb){
            {
             for (var i = matchesFromDb.length - 1; i >= 0; i--) {
                var match = {
                    "id": matchesFromDb[i].id,
                    "awayTeamFanScore": matchesFromDb[i].awayTeamFanScore,
                    "homeTeamFanScore": matchesFromDb[i].homeTeamFanScore,
                    "awayTeamRealScore": matchesFromDb[i].awayTeamRealScore,
                    "homeTeamRealScore": matchesFromDb[i].homeTeamRealScore,
                    "league": (matchesFromDb[i].league) ? matchesFromDb[i].league.id : null,
                    "season" : (matchesFromDb[i].season) ? matchesFromDb[i].season.id : null, 
                    "matchRound" : (matchesFromDb[i].matchRound) ? matchesFromDb[i].matchRound.id : null,
                    "stadium" : (matchesFromDb[i].stadium) ? matchesFromDb[i].stadium.id : null, 
                    "awayTeam" : (matchesFromDb[i].awayTeam) ? matchesFromDb[i].awayTeam.id : null, 
                    "homeTeam" : (matchesFromDb[i].homeTeam) ? matchesFromDb[i].homeTeam.id : null, 
                    "matchDate" : matchesFromDb[i].matchDate
                    };
                matches.push(match);
                }   
            }
            return res.json(matches);
        }
    );
}; 

var create =  function (req, res) { 
    var match = new Match();
    match.awayTeamFanScore = req.body.awayTeamFanScore;
    match.homeTeamFanScore = req.body.homeTeamFanScore;
    match.awayTeamRealScore = req.body.awayTeamRealScore;
    match.homeTeamRealScore = req.body.homeTeamRealScore;
    match.league = (req.body.league) ? req.body.league: null;
    match.season = (req.body.season) ? req.body.season : null;
    match.matchRound = (req.body.matchRound) ? req.body.matchRound : null;
    match.awayTeam = (req.body.awayTeam) ? req.body.awayTeam : null;
    match.homeTeam = (req.body.homeTeam) ? req.body.homeTeam : null;
    match.matchDate = (req.body.matchDate) ? req.body.matchDate: null;
    match.stadium = (req.body.stadium) ? req.body.stadium : null, 

    match.save(function(err){
        if(err){
            console.error(chalk.red(err));
            return res.sendStatus(500);
        }
        return res.json(match);
    });

}; 


var update = function (req, res) {
    var updates = {};
    updates.awayTeamFanScore = req.body.awayTeamFanScore;
    updates.homeTeamFanScore = req.body.homeTeamFanScore;
    updates.awayTeamRealScore = req.body.awayTeamRealScore;
    updates.homeTeamRealScore = req.body.homeTeamRealScore;
    updates.league = (req.body.league) ? req.body.league: null;
    updates.season = (req.body.season) ? req.body.season : null;
    updates.matchRound = (req.body.matchRound) ? req.body.matchRound : null;
    updates.awayTeam = (req.body.awayTeam) ? req.body.awayTeam : null;
    updates.homeTeam = (req.body.homeTeam) ? req.body.homeTeam : null;
    updates.matchDate = (req.body.matchDate) ? req.body.matchDate: null;
    updates.stadium = (req.body.stadium) ? req.body.stadium : null, 

    Match.update({_id: req.body.id}, updates, function(err){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.json(updates);
    });
};

var remove = function (req, res) {
    Match.findByIdAndRemove(req.body.id, function(err){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};


module.exports = {  getPage: getPage,
                    get: get,
                    create: create,
                    remove: remove,
                    update: update};