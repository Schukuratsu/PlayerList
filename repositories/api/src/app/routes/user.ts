import express from 'express';
import { userControllers } from '../controllers/user';
import { validate } from '../validators';
import { authenticationRules } from '../validators/authentication';
import { userRules } from '../validators/user';

const route = '/user';
const router = express.Router();

router.post('/validate', userRules.validateUser(), validate, userControllers.validateUser);

router.post('/forgot-password', userRules.forgotPassword(), validate, userControllers.forgotPassword);

router.post('/new-password', userRules.newPassword(), validate, userControllers.newPassword);

router.post(
  '/change-password',
  authenticationRules.authenticatedUser(),
  validate,
  userRules.changePassword(),
  validate,
  userControllers.changePassword,
);

export default { route, router };
