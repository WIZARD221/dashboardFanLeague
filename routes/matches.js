var express = require('express');
var router = express.Router();
var Matches = require('../controllers/matches');

router.get('/', Matches.get);
router.get('/index', Matches.getPage);
router.post('/', Matches.create);
router.put('/', Matches.update);
router.delete('/', Matches.remove);

module.exports = router;
