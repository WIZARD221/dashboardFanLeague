var express = require('express');
var router = express.Router();
var TeamProfiles = require('../controllers/TeamProfiles');

router.get('/', TeamProfiles.get);
router.get('/index', TeamProfiles.getPage);
router.post('/', TeamProfiles.create);
router.put('/', TeamProfiles.update);
router.delete('/', TeamProfiles.remove);

module.exports = router;
