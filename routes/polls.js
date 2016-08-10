var express = require('express');
var router = express.Router();
var Polls = require('../controllers/polls');

router.get('/', Polls.get);
router.get('/index', Polls.getPage);
router.post('/', Polls.create);
router.put('/', Polls.update);
router.delete('/', Polls.remove);

module.exports = router;
