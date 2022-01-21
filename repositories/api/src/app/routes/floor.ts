import express from 'express';
import { floorControllers } from '../controllers/floor';
import { floorRules, validate } from '../validators';
import { authenticationRules } from '../validators/authentication';

const route = '/floor';
const router = express.Router();

router.get(
  '/',
  authenticationRules.authenticatedUser(),
  validate,
  floorRules.findAllFloors(),
  validate,
  floorControllers.findAllFloors,
);

export default { route, router };
