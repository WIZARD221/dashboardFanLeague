var mongoose = require('mongoose');
var db = require('../config/db');
var League = db.model('League');
var TeamProfile = db.model('TeamProfile');
var Season = db.model('Season');
var TeamSeason = db.model('TeamSeason');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'Team Seasons', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var teamSeasonsPromise = TeamSeason.find({}).lean().exec();
    var teamsPromise = TeamProfile.find({}, '_id name league').lean().exec();
    var leagusPromise = League.find({}, '_id name').lean().exec();
    var seasonsPromise = Season.find({}, '_id year league').lean().exec();

    var promises = [teamSeasonsPromise, teamsPromise, leagusPromise, seasonsPromise];

    Promise.all(promises).then(values => {
        docs.teamSeasons = JSON.stringify(values[0]);
        docs.teams = JSON.stringify(values[1]);
        docs.leagues = JSON.stringify(values[2]);
        docs.seasons = JSON.stringify(values[3]);
        return res.render('teamSeasons', docs);
    }).catch((err) => {
        console.log(err);
    });
};



var get =  function (req, res) { 
    var query = req.query;

    for (var key in query) {
      if (query.hasOwnProperty(key)) {
        if(query[key] == null || query[key] === ""){
            delete query[key];
        }
      }
    }

    TeamSeason.find(query).lean().exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    var newItem = new TeamSeason();
    
    prepareItem(newItem, req.body);

    newItem.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(newItem);
    });
};

var remove = function (req, res) {
    TeamSeason.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};
    
    prepareItem(updates, req.body);

    TeamSeason.update({_id: req.body._id}, updates, function(err){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.json(updates);
    });
};

var prepareItem = function (item, body) {
    for (var key in body) {
      if (body.hasOwnProperty(key)) {
        item[key] = (body[key]) ?  body[key] : null;
      }
    }

    return item;
};


module.exports = {getPage: getPage,
                  get: get,
                  create: create, 
                  remove: remove, 
                  update: update};



