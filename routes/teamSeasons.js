var express = require('express');
var router = express.Router();
var TeamSeasons = require('../controllers/teamSeasons');

router.get('/', TeamSeasons.get);
router.get('/index', TeamSeasons.getPage);
router.post('/', TeamSeasons.create);
router.put('/', TeamSeasons.update);
router.delete('/', TeamSeasons.remove);

module.exports = router;
