var express = require('express');
var router = express.Router();
var db = require('../config/db');
var TeamProfile = require('../models/TeamProfile');


/* GET Leagues page. */
router.get('/', function(req, res, next) {
    res.render('leagues', { 
        title: 'Leagues',
        teamprofiles: docs
    });
});

module.exports = router;
