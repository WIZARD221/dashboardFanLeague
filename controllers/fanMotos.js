var mongoose = require('mongoose');
var db = require('../config/db');
var FanMoto = db.model('FanMoto');
var TeamProfile = db.model('TeamProfile');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'fanMotos', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var fanMotosPromise = FanMoto.find({}).lean().exec();
    var teamsPromise = TeamProfile.find({}, '_id name league').lean().exec();

    var promises = [fanMotosPromise, teamsPromise];

    Promise.all(promises).then(values => {
        docs.fanMotos = JSON.stringify(values[0]);
        docs.teams = JSON.stringify(values[1]);
        return res.render('fanMotos', docs);
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

    FanMoto.find(query).lean().exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    var newItem = new FanMoto();
    
    prepareItem(newItem, req.body);

    newItem.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(newItem);
    });
};

var remove = function (req, res) {
    FanMoto.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};
    
    prepareItem(updates, req.body);

    FanMoto.update({_id: req.body._id}, updates, function(err){
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



