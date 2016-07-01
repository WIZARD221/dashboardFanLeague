var express = require('express');
var router = express.Router();
var TeamProfile = require('../controllers/TeamProfile');

router.get('/', TeamProfile.get);
router.get('/index', TeamProfile.getPage);
router.post('/', TeamProfile.create);
router.put('/', TeamProfile.update);
router.delete('/', TeamProfile.remove);

module.exports = router;
