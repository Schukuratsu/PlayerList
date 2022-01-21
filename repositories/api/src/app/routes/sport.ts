import express from 'express';
import { sportControllers } from '../controllers/sport';
import { sportRules, validate } from '../validators';
import { authenticationRules } from '../validators/authentication';

const route = '/sport';
const router = express.Router();

router.get(
  '/',
  authenticationRules.authenticatedUser(),
  validate,
  sportRules.findAllSports(),
  validate,
  sportControllers.findAllSports,
);

export default { route, router };
