var mongoose = require('mongoose');
var db = require('../config/db');
var TeamProfile = db.model('TeamProfile');
var Stadium = db.model('Stadium');

var getAll =  function (req, res) {
        
    var docs = {title: 'Team Profiles'};


    TeamProfile.find({}).exec()
    .then(function(teamProfilesFromDb){

        docs["teamProfiles"] = teamProfilesFromDb;
        return Stadium.find({}).exec();
    })
    .then(function (stadiumsFromDb) {
        docs["stadiums"] = stadiumsFromDb;
        return res.render('teamProfiles', docs);
    })
    .then(null, function() {
        return res.status(500);
    })

    // TeamProfile.find({}, function(err,teamProfiles){
    //     if(err){
    //         return res.status(500);
    //     }
    //     return res.render('teamProfiles', { 
    //         title: 'Team Profiles',
    //         teamProfiles: teamProfiles
    //     });
    // });
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

var resolveAction = function (req, res) {
    console.dir(req.body);
    if (req.body.action == 'edit') {

        return update(req, res)
    }
    else if(req.body.action == 'delete'){
        console.dir("remove");
        return remove(req, res)
    }
    else{
        create(req, res)
    }
};


module.exports = {getAll: getAll,
                  create: create, 
                  remove: remove, 
                  resolveAction: resolveAction};



