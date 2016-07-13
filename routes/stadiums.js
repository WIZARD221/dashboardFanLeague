var express = require('express');
var router = express.Router();
var Stadiums = require('../controllers/stadiums');

router.get('/', Stadiums.get);
router.get('/index', Stadiums.getPage);
router.post('/', Stadiums.create);
router.put('/', Stadiums.update);
router.delete('/', Stadiums.remove);

module.exports = router;
