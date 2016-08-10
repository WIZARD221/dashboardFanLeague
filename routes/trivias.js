var express = require('express');
var router = express.Router();
var Trivias = require('../controllers/Trivias');

router.get('/', Trivias.get);
router.get('/index', Trivias.getPage);
router.post('/', Trivias.create);
router.put('/', Trivias.update);
router.delete('/', Trivias.remove);

module.exports = router;
