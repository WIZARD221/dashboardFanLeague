var express = require('express');
var router = express.Router();
var KeyWords = require('../controllers/KeyWords');

router.get('/', KeyWords.get);
router.get('/index', KeyWords.getPage);
router.post('/', KeyWords.create);
router.delete('/', KeyWords.remove);

module.exports = router;
