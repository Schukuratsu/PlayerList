import express from 'express';
import { gymControllers } from '../controllers/gym';
import { gymRules, validate } from '../validators';
import { authenticationRules } from '../validators/authentication';

const route = '/gym';
const router = express.Router();

router.post(
  '/',
  authenticationRules.authenticatedAdministrator(),
  validate,
  gymRules.createGym(),
  validate,
  gymControllers.createGym,
);

export default { route, router };
