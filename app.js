exports = module.exports;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var routes = require('./routes/index');
var users = require('./routes/users');
var teamProfiles = require('./routes/teamProfiles');
var matches = require('./routes/matches');
var stadiums = require('./routes/stadiums');
var seasonRounds = require('./routes/seasonRounds');
var articles = require('./routes/articles');
var teamSeasons = require('./routes/teamSeasons');
var polls = require('./routes/polls');
var trivias = require('./routes/trivias');
var achievements = require('./routes/achievements');
var prizes = require('./routes/prizes');
var fanMotos = require('./routes/fanMotos');
var fanLevels = require('./routes/fanLevels');
var fanDuties = require('./routes/fanDuties');
var fanMatches = require('./routes/fanMatches');
var fanProfiles = require('./routes/fanProfiles');
var keyWords = require('./routes/keyWords');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Paths
app.use('/', routes);
app.use('/users', users);
app.use('/teamprofiles', teamProfiles);
app.use('/matches', matches);
app.use('/stadiums', stadiums);
app.use('/seasonRounds', seasonRounds);
app.use('/articles', articles);
app.use('/teamSeasons', teamSeasons);
app.use('/polls', polls);
app.use('/trivias', trivias);
app.use('/achievements', achievements);
app.use('/prizes', prizes);
app.use('/fanMotos', fanMotos);
app.use('/fanLevels', fanLevels);
app.use('/fanDuties', fanDuties);
app.use('/fanMatches', fanMatches);
app.use('/fanProfiles', fanProfiles);
app.use('/keyWords', keyWords);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
