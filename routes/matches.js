var express = require('express');
var router = express.Router();
var Matches = require('../controllers/matches');

router.get('/', Matches.getAll);
router.get('/grid', Matches.grid);

module.exports = router;
