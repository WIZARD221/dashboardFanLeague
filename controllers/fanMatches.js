var mongoose = require('mongoose');
var db = require('../config/db');
var FanMatch = db.model('FanMatch');
var SeasonRound = db.model('SeasonRound');
var Season = db.model('Season');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'fanMatches', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var fanMatchesPromise = FanMatch.find({}).populate('season', 'year').populate('matchRound', 'title').lean().exec();
    var seasonsPromise = Season.find({}, '_id year').lean().exec();
    var seasonRoundsPromise = SeasonRound.find({}).lean().exec();
    var promises = [fanMatchesPromise, seasonsPromise, seasonRoundsPromise];

    Promise.all(promises).then(values => {

        docs.fanMatches = JSON.stringify(values[0]);
        docs.seasons = JSON.stringify(values[1]);
        docs.seasonRounds = JSON.stringify(values[2]);
        return res.render('fanMatches', docs);
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

    FanMatch.find(query).lean().exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    var newItem = new FanMatch();
    
    prepareItem(newItem, req.body);

    newItem.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(newItem);
    });
};

var remove = function (req, res) {
    FanMatch.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};
    
    prepareItem(updates, req.body);

    FanMatch.update({_id: req.body._id}, updates, function(err){
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



