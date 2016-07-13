var mongoose = require('mongoose');
var db = require('../config/db');
var Stadium = db.model('Stadium');
var League = db.model('League');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'Stadiums', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var stadiumsPromise = Stadium.find({}).populate('league').lean().exec();

    var promises = [stadiumsPromise];

    Promise.all(promises).then(values => {
        docs.stadiums = JSON.stringify(values[0]);
        return res.render('stadiums', docs);
    }).catch((err) => {
        console.log(err);
    });
};



var get =  function (req, res) { 
    Stadiums.find({}).lean().exec().then(function (stadiumsFromDb) {
        return res.json(stadiumsFromDb);
    });
}; 


var create = function (req, res) {
    var stadium = new Stadium();
    
    stadium.name = req.body.name;
    stadium.city = req.body.city;
    stadium.stadiumSize = req.body.stadiumSize;
    stadium.imageUrl = req.body.imageUrl;
    stadium.locationCoordinates = req.body.locationCoordinates;
    stadium.league = (req.body.league) ? req.body.league : null;

    stadium.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(stadium);
    });
};

var remove = function (req, res) {
    Stadium.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};

    updates.name = req.body.name;
    updates.city = req.body.city;
    updates.stadiumSize = req.body.stadiumSize;
    updates.imageUrl = req.body.imageUrl;
    updates.locationCoordinates = (req.body.locationCoordinates) ? req.body.locationCoordinates : null;
    updates.league = (req.body.league) ? req.body.league : null;

    Stadium.update({_id: req.body._id}, updates, function(err){
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



