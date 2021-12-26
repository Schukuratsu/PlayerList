import express from 'express';
import { administratorControllers } from '../controllers/administrator';
import { createAdministratorRules, loginAdministratorRules } from '../validators/administrator';
import { validate } from '../validators';

const route = '/administrator';
const router = express.Router();

router.post('/', createAdministratorRules(), validate, administratorControllers.createAdministrator);
router.post('/login', loginAdministratorRules(), validate, administratorControllers.loginAdministrator);

export default { route, router };
