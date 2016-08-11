var express = require('express');
var router = express.Router();
var FanMatches = require('../controllers/FanMatches');

router.get('/', FanMatches.get);
router.get('/index', FanMatches.getPage);
router.post('/', FanMatches.create);
router.put('/', FanMatches.update);
router.delete('/', FanMatches.remove);

module.exports = router;
