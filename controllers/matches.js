var mongoose = require('mongoose');
var db = require('../config/db');
var Match = db.model('Match');
var Stadium = db.model('Stadium');
var League = db.model('League');

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
                    "league": (matchesFromDb[i].league) ? matchesFromDb[i].league.id : "",
                    "season" : matchesFromDb[i].season.year, 
                    "matchRound" : (matchesFromDb[i].matchRound) ? matchesFromDb[i].matchRound.title : "",
                    "stadium" : matchesFromDb[i].stadium.id, 
                    "awayTeam" : matchesFromDb[i].awayTeam.name, 
                    "homeTeam" : matchesFromDb[i].homeTeam.name, 
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
        return League.find({}, '_id name teams').exec();
    }).then(function(leaguesFromDb){
        docs["leagues"] = JSON.stringify(leaguesFromDb);
        return res.render('matches', docs);
    });
};

var get =  function (req, res) { 
    var matches = [];
    Match.find({}).populate('_id awayTeam homeTeam matchRound season stadium')
         .exec(function(err, matchesFromDb){
            {
             for (var i = matchesFromDb.length - 1; i >= 0; i--) {
                var match = {
                    "id": matchesFromDb[i].id,
                    "awayTeamFanScore": matchesFromDb[i].awayTeamFanScore,
                    "homeTeamFanScore": matchesFromDb[i].homeTeamFanScore,
                    "awayTeamRealScore": matchesFromDb[i].awayTeamRealScore,
                    "homeTeamRealScore": matchesFromDb[i].homeTeamRealScore,
                    "league": matchesFromDb[i].league.name,
                    "season" : matchesFromDb[i].season.year, 
                    "matchRound" : (matchesFromDb[i].matchRound) ? matchesFromDb[i].matchRound.title : "",
                    "stadium" : matchesFromDb[i].stadium.name, 
                    "awayTeam" : matchesFromDb[i].awayTeam.name, 
                    "homeTeam" : matchesFromDb[i].homeTeam.name, 
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
    match.league = req.body.league;
    match.season = req.body.season;
    match.matchRound = req.body.matchRound;
    match.awayTeam = req.body.awayTeam;
    match.homeTeam = req.body.homeTeam;
    match.matchDate = req.body.matchDate;

}; 


module.exports = { getPage: getPage,
                   get: get};