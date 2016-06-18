var mongoose = require('mongoose');
var chalk = require('chalk');
var fs =  require('fs');
var path =  require('path');

fs.readdirSync(path.join(__dirname, "../models")).forEach(function(file){
    var model = require (path.join(__dirname,  "../models", file))
    mongoose[model.modelName] = model;
});

// DB connection
var db = mongoose.connect('mongodb://heroku:FLHeroku@ds055925.mongolab.com:55925/heroku_tstbdzck', function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
  else {
    console.log(chalk.green('connected to MongoDB!'));
  }
});


module.exports = db;