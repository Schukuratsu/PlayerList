var express = require('express');

var router = express.Router();

/* POST cria jogo. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET consulta jogo. */
router.get('/:gameId', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
