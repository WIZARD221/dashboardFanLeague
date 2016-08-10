var express = require('express');
var router = express.Router();
var Achievements = require('../controllers/Achievements');

router.get('/', Achievements.get);
router.get('/index', Achievements.getPage);
router.post('/', Achievements.create);
router.put('/', Achievements.update);
router.delete('/', Achievements.remove);

module.exports = router;
