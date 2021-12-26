import express from 'express';
import { administratorControllers } from '../controllers/administrator';
import { createAdministratorRules } from '../validators/adminstrator';
import { validate } from '../validators';

const route = '/administrator';
const router = express.Router();

/* POST adiciona jogador em um jogo. */
router.post('/', createAdministratorRules(), validate, administratorControllers.createAdministrator);

export default { route, router };
