var mongoose = require('mongoose');
var db = require('../config/db');
var League = db.model('League');
var SeasonRound = db.model('SeasonRound');
var Season = db.model('Season');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'SeasonRounds', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var seasonRoundsPromise = SeasonRound.find({}).populate('league season').lean().exec();
    var leaguesPromise = League.find({}, '_id name').lean().exec();
    var seasonsPromise = Season.find({}, '_id year').lean().exec();

    var promises = [seasonRoundsPromise, leaguesPromise, seasonsPromise];

    Promise.all(promises).then(values => {
        docs.seasonRounds = JSON.stringify(values[0]);
        docs.leagues = JSON.stringify(values[1]);
        docs.seasons = JSON.stringify(values[2]);
        return res.render('seasonRounds', docs);
    }).catch((err) => {
        console.log(err);
    });
};



var get =  function (req, res) { 
    SeasonRound.find({}).lean().exec().then(function (seasonRoundsFromDb) {
        return res.json(seasonRoundsFromDb);
    });
}; 


var create = function (req, res) {
    var seasonRound = new SeasonRound();
    
    seasonRound.title = req.body.name;
    seasonRound.season = (req.body.season) ? req.body.season : null;
    seasonRound.league = (req.body.league) ? req.body.league : null;

    seasonRound.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(seasonRound);
    });
};

var remove = function (req, res) {
    SeasonRound.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};

    updates.title = req.body.title;
    updates.season = (req.body.season) ? req.body.season : null;
    updates.league = (req.body.league) ? req.body.league : null;

    SeasonRound.update({_id: req.body._id}, updates, function(err){
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



