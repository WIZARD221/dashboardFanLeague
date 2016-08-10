var mongoose = require('mongoose');
var db = require('../config/db');
var Prize = db.model('Prize');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'prizes', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var prizesPromise = Prize.find({}).lean().exec();


    var promises = [prizesPromise];

    Promise.all(promises).then(values => {
        docs.prizes = JSON.stringify(values[0]);
        return res.render('prizes', docs);
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

    Prize.find(query).lean().exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    var newItem = new Prize();
    
    prepareItem(newItem, req.body);

    newItem.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(newItem);
    });
};

var remove = function (req, res) {
    Prize.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};
    
    prepareItem(updates, req.body);

    Prize.update({_id: req.body._id}, updates, function(err){
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



