import express from 'express';
import { courtControllers } from '../controllers/court';
import { courtRules, validate } from '../validators';
import { authenticationRules } from '../validators/authentication';

const route = '/court';
const router = express.Router();

router.post(
  '/',
  authenticationRules.authenticatedAdministrator(),
  validate,
  courtRules.createCourt(),
  validate,
  courtControllers.createCourt,
);

export default { route, router };
