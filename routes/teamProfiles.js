var express = require('express');
var router = express.Router();
var TeamProfile = require('../controllers/TeamProfile');

router.get('/', TeamProfile.getAll);
router.post('/', TeamProfile.resolveAction);

module.exports = router;
