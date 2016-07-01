var mongoose = require('mongoose');
var db = require('../config/db');
var TeamProfile = db.model('TeamProfile');
var Stadium = db.model('Stadium');
var League = db.model('League');

var getPage =  function (req, res) {
        
    var docs = {title: 'Team Profiles'};
    

    var teamsPromise = TeamProfile.find({}).populate('stadium league').lean().exec();
    var stadiumsPromise = Stadium.find({}, '_id name').lean().exec();
    var leaguesPromise = League.find({}, '_id name').lean().exec();

    var promises = [teamsPromise, stadiumsPromise, leaguesPromise];

    Promise.all(promises).then(values => {
        docs.teams = JSON.stringify(values[0]);
        docs.stadiums = JSON.stringify(values[1]);
        docs.leagues = JSON.stringify(values[2]);

        return res.render('teamProfiles', docs);
    }).catch((err) => {
        console.log(err);
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


var create = function (req, res) {
    var teamProfile = new TeamProfile();
    
    teamProfile.name = req.body.name;
    teamProfile.country = req.body.country;
    teamProfile.homeColour = req.body.homeColour;
    teamProfile.awayColour = req.body.awayColour;
    teamProfile.imageUrl = req.body.imageUrl;
    // teamProfile.homeStadium = req.body.homeStadium;
    // console.dir(teamProfile);
    teamProfile.save(function(err){
        if(err){
            return res.status(500);
        }
        return getAll(req, res);
    });
};

var remove = function (req, res) {
    TeamProfile.remove({_id: req.body.id}, function(err){
        if(err){
            return res.status(500);
        }
        return res.status(200);
    });
};

var update = function (req, res) {
    console.log("edit TeamProfile");
    var updates = req.body;

    delete updates.homeStadium;

    TeamProfile.update({_id: req.body.id}, updates, function(err){
        if(err){
            console.log(err);
            return res.status(500);
        }
        // return res.status(200);
        return getAll(req, res);
    });
};

module.exports = {getPage: getPage,
                  get: get,
                  create: create, 
                  remove: remove, 
                  update: update};



