var mongoose = require('mongoose');
var db = require('../config/db');
var Poll = db.model('Poll');
var PollItem = db.model('PollItem');
var PollItemArrayList = db.model('PollItemArrayList');
var TeamProfile = db.model('TeamProfile');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'Polls', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var pollsPromise = Poll.find({}).lean().exec();
    var teamsPromise = TeamProfile.find({}, '_id name league').lean().exec();

    var promises = [pollsPromise, teamsPromise];

    Promise.all(promises).then(values => {
        docs.polls = JSON.stringify(values[0]);
        docs.teams = JSON.stringify(values[1]);
        docs.teamOptions = values[1];
        return res.render('polls', docs);
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

    Poll.find(query).lean().populate("answers").exec().then(function (itemsFromDb) {
        return res.json(itemsFromDb);
    });
}; 


var create = function (req, res) {
    var newItem = new Poll();
    var pollItemArrayList = new PollItemArrayList();


    var keys = [];
    for (var key in req.body) {      
        if (req.body.hasOwnProperty(key)) keys.push(key);
    }



    for (var i = 0; i < keys.length; i++) {
        if (req.body['answerText[' + i +']']) {
            var pollItem = new PollItem();
            pollItem.text = req.body['answerText[' + i +']'];
            pollItem.imageUrl = req.body['answerImage[' + i +']'];
            newItem.answersSums[i] = parseInt(req.body['answerSum[' + i +']']);
            pollItem.save(function(err){
                if(err){
                    console.log(err.message);
                    return res.sendStatus(500);
                } 
            });
            pollItemArrayList.PollItems.push(pollItem);
        }
        else{
            break;
        }
    }

    (req.body.team) ? req.body.team = req.body.team.replace(/"/g, '') : false;

    prepareItem(newItem, req.body);
    newItem.answers = pollItemArrayList;
    newItem.save(function(err){
        if(err){
            console.log(err.message);
            return res.sendStatus(500);
        }

        pollItemArrayList.save(function(err){
            if(err){
                console.log(err.message);
                return res.sendStatus(500);
            }
        });

        return res.json(newItem);
    });
};

var remove = function (req, res) {
    Poll.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};
    
    prepareItem(updates, req.body);

    Poll.update({_id: req.body._id}, updates, function(err){
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



