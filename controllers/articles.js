var mongoose = require('mongoose');
var db = require('../config/db');
var Article = db.model('Article');
var TeamProfile = db.model('TeamProfile');
var cloudinaryConfig = require('../config/cloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(cloudinaryConfig);

var getPage =  function (req, res) {
    
    var docs = {title: 'Articles', 
                cloudinary: JSON.stringify(cloudinary.uploader.direct_upload())};
    
    var articlePromise = Article.find({}).lean().exec();

    var promises = [articlePromise];

    Promise.all(promises).then(values => {
        docs.articles = JSON.stringify(values[0]);
        return res.render('articles', docs);
    }).catch((err) => {
        console.log(err);
    });
};



var get =  function (req, res) { 
    var query = {};

    (req.query.by) ? query.by = req.query.by : false;
    (req.query.link) ? query.link = req.query.link : false;
    (req.query.description) ? query.description = req.query.description : false;
    (req.query.title) ? query.title = req.query.title : false;

    Article.find(query).lean().exec().then(function (articlesFromDb) {
        return res.json(articlesFromDb);
    });
}; 


var create = function (req, res) {
    var article = new Article();
    
    article.by = (req.body.by) ? req.body.by : null;
    article.link = (req.body.link) ? req.body.link : null;
    article.description = (req.body.description) ? req.body.description : null;
    article.imageUrl = (req.body.imageUrl) ? req.body.imageUrl : null;
    article.title = (req.body.title) ? req.body.title : null;
    article.team = (req.body.team) ? req.body.team : null;


    article.save(function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.json(article);
    });
};

var remove = function (req, res) {
    Article.remove({_id: req.body.id}, function(err){
        if(err){
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
};

var update = function (req, res) {
    var updates = {};

    updates.by = (req.body.by) ? req.body.by : null;
    updates.link = (req.body.link) ? req.body.link : null;
    updates.description = (req.body.description) ? req.body.description : null;
    updates.imageUrl = (req.body.imageUrl) ? req.body.imageUrl : null;
    updates.title = (req.body.title) ? req.body.title : null;
    updates.team = (req.body.team) ? req.body.team : null;

    Atricle.update({_id: req.body._id}, updates, function(err){
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



