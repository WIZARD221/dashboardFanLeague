var express = require('express');
var router = express.Router();
var FanMotos = require('../controllers/FanMotos');

router.get('/', FanMotos.get);
router.get('/index', FanMotos.getPage);
router.post('/', FanMotos.create);
router.put('/', FanMotos.update);
router.delete('/', FanMotos.remove);

module.exports = router;
