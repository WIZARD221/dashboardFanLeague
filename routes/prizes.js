var express = require('express');
var router = express.Router();
var Prizes = require('../controllers/Prizes');

router.get('/', Prizes.get);
router.get('/index', Prizes.getPage);
router.post('/', Prizes.create);
router.put('/', Prizes.update);
router.delete('/', Prizes.remove);

module.exports = router;
