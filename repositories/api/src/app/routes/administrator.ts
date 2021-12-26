import express from 'express';
import { administratorControllers } from '../controllers/administrator';
import { administratorRules } from '../validators/administrator';
import { validate } from '../validators';

const route = '/administrator';
const router = express.Router();

router.post('/', administratorRules.createAdministrator(), validate, administratorControllers.createAdministrator);

router.post(
  '/login',
  administratorRules.loginAdministrator(),
  validate,
  administratorControllers.loginAdministrator,
);

export default { route, router };
