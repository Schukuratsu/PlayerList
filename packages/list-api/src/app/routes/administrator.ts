import express from 'express';

const route = '/administrator';
const router = express.Router();

/* POST adiciona jogador em um jogo. */
router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* DELETE remove jogador de um jogo. */
router.delete('/:playerId', function (req, res, next) {
  res.send('respond with a resource');
});

/* PATCH edita jogador em um jogo. */
router.post('/:playerId', function (req, res, next) {
  res.send('respond with a resource');
});

export default { route, router };
