var mongoose = require('mongoose');
var db = require('../config/db');
var FanProfile = db.model('FanProfile');
var TeamProfile = db.model('TeamProfile');
var League = db.model('League');
var FanLevel = db.model('FanLevel');
var Achievement = db.model('Achievement');
var Prize = db.model('Prize');
var FanMatch = db.model('FanMatch');
var FanMoto = db.model('FanMoto');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'fanProfiles', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var fanProfilesPromise = FanProfile.find({}).lean().exec();
    var teamsPromise = TeamProfile.find({}, '_id name league').lean().exec();
    var leaguesPromise = League.find({}, '_id name').lean().exec();
    var levelsPromise = FanLevel.find({}, '_id levelNumber').lean().exec();
    var achievementsPromise = Achievement.find({}, '_id name').lean().exec();
    var prizesPromise = Prize.find({}, '_id name').lean().exec();
    var fanMotosPromise = FanMoto.find({}, '_id text').lean().exec();
    var promises = [fanProfilesPromise, teamsPromise,
                    leaguesPromise,
                    levelsPromise, achievementsPromise,
                    prizesPromise, fanMotosPromise];

    Promise.all(promises).then(values => {
        docs.fanProfiles = JSON.stringify(values[0]);
        docs.teams = JSON.stringify(values[1]);
        docs.leagues = JSON.stringify(values[2]);
        docs.levels = JSON.stringify(values[3]);
        docs.achievements = JSON.stringify(values[4]);
        docs.prizes = JSON.stringify(values[5]);
        docs.fanMotos = JSON.stringify(values[6]);
        return res.render('fanProfiles', docs);
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

    FanProfile.find(query).lean().exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    var newItem = new FanProfile();
    
    prepareItem(newItem, req.body);

    newItem.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(newItem);
    });
};

var remove = function (req, res) {
    FanProfile.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};
    
    prepareItem(updates, req.body);

    FanProfile.update({_id: req.body._id}, updates, function(err){
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



