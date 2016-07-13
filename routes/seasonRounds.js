var express = require('express');
var router = express.Router();
var SeasonRounds = require('../controllers/seasonRounds');

router.get('/', SeasonRounds.get);
router.get('/index', SeasonRounds.getPage);
router.post('/', SeasonRounds.create);
router.put('/', SeasonRounds.update);
router.delete('/', SeasonRounds.remove);

module.exports = router;
