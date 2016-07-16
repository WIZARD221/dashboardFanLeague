var express = require('express');
var router = express.Router();
var Articles = require('../controllers/articles');

router.get('/', Articles.get);
router.get('/index', Articles.getPage);
router.post('/', Articles.create);
router.put('/', Articles.update);
router.delete('/', Articles.remove);

module.exports = router;
