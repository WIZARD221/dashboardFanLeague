var express = require('express');
var router = express.Router();
var Matches = require('../controllers/matches');

router.get('/', Matches.get);
router.get('/index', Matches.getPage);

module.exports = router;
