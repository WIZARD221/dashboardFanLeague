var mongoose = require('mongoose');
var db = require('../config/db');
var TeamProfile = db.model('TeamProfile');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'KeyWords', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var TeamProfilesPromise = TeamProfile.find({}).lean().exec();
    var promises = [TeamProfilesPromise];

    Promise.all(promises).then(values => {

        docs.teams = JSON.stringify(values[0]);
        return res.render('keyWords', docs);
    }).catch((err) => {
        console.log(err);
    });
};



var get =  function (req, res) { 
    var query = req.query;

    for (var key in query) {
      if (query.hasOwnProperty(key)) {
        if(query[key] === null || query[key] === ""){
            delete query[key];
        }
      }
    }
    if (query.name) {
        query._id = query.name;
        delete query['name'];  
    }

    TeamProfile.find(query).lean().exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    TeamProfile.findOne({_id: req.body.name}, function (err, team) {
        team.keyWords.push(req.body.keyWord);
        team.save(function(err){
            if(err){
                return res.sendStatus(500);
            }
            return res.json(team);
        });
    });
};

var remove = function (req, res) {
    TeamProfile.findOne({_id: req.body._id}, function (err, team) {
        var keyWordIndex = team.keyWords.indexOf(req.body.keyWord);
        team.keyWords.splice(keyWordIndex, 1);
        team.save(function(err){
            if(err){
                return res.sendStatus(500);
            }
            return res.json(team);
        });
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
                  remove: remove};



