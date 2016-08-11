var express = require('express');
var router = express.Router();
var FanDuties = require('../controllers/FanDuties');

router.get('/', FanDuties.get);
router.get('/index', FanDuties.getPage);
router.post('/', FanDuties.create);
router.put('/', FanDuties.update);
router.delete('/', FanDuties.remove);

module.exports = router;
