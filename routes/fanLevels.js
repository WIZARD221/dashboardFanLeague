var express = require('express');
var router = express.Router();
var FanLevels = require('../controllers/FanLevels');

router.get('/', FanLevels.get);
router.get('/index', FanLevels.getPage);
router.post('/', FanLevels.create);
router.put('/', FanLevels.update);
router.delete('/', FanLevels.remove);

module.exports = router;
