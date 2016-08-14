var express = require('express');
var router = express.Router();
var FanProfiles = require('../controllers/FanProfiles');

router.get('/', FanProfiles.get);
router.get('/index', FanProfiles.getPage);
router.post('/', FanProfiles.create);
router.put('/', FanProfiles.update);
router.delete('/', FanProfiles.remove);

module.exports = router;
