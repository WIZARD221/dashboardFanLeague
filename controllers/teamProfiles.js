var mongoose = require('mongoose');
var db = require('../config/db');
var TeamProfile = db.model('TeamProfile');
var Stadium = db.model('Stadium');
var League = db.model('League');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'hzrasexo1', 
  api_key: '676693128923862', 

});

var getPage =  function (req, res) {
    
   

    var docs = {title: 'Team Profiles', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    

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
    TeamProfile.find({}).populate('stadium league').lean().exec().then(function (teamsFromDb) {
        return res.json(teamsFromDb);
    });
}; 


var create = function (req, res) {
    var teamProfile = new TeamProfile();
    
    teamProfile.name = req.body.name;
    teamProfile.country = req.body.country;
    teamProfile.homeColour = req.body.homeColour;
    teamProfile.awayColour = req.body.awayColour;
    teamProfile.imageUrl = req.body.imageUrl;
    teamProfile.homeStadium = (req.body.homeStadium) ? req.body.homeStadium : null;
    teamProfile.league = (req.body.league) ? req.body.league : null;

    teamProfile.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(teamProfile);
    });
};

var remove = function (req, res) {
    TeamProfile.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};

    updates.name = req.body.name;
    updates.country = req.body.country;
    updates.homeColour = req.body.homeColour;
    updates.awayColour = req.body.awayColour;
    updates.imageUrl = req.body.imageUrl;
    updates.homeStadium = (req.body.homeStadium) ? req.body.homeStadium : null;
    updates.league = (req.body.league) ? req.body.league : null;

    TeamProfile.update({_id: req.body._id}, updates, function(err){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.json(updates);
    });
};

module.exports = {getPage: getPage,
                  get: get,
                  create: create, 
                  remove: remove, 
                  update: update};



