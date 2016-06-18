var mongoose = require('mongoose');
var db = require('../config/db');
var TeamProfile = db.model('TeamProfile');

var getAll =  function (req, res) {
    TeamProfile.find({}, function(err,teamProfiles){
        if(err){
            return res.status(500);
        }
        return res.render('teamProfiles', { 
            title: 'Team Profiles',
            teamProfiles: teamProfiles
        });
    });
};

exports.getAll = getAll;

exports.create = function (req, res) {
    var teamProfile = new TeamProfile();
    console.dir(req.body);
    teamProfile.name = req.body.name;
    teamProfile.country = req.body.country;
    teamProfile.homeColor = req.body.homeColor;
    teamProfile.awayColor = req.body.awayColor;
    teamProfile.teamImage = req.body.teamImage;
    teamProfile.homeStaduim = req.body.homeStaduim;

    teamProfile.save(function(err){
        if(err){
            return res.status(500);
        }
        return getAll(req, res);
    });
};