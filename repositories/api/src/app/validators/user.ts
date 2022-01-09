import { body, header } from 'express-validator';
import environment from '../../config/environment';
import db from '../../database/db';
import { verifyAccessToken } from '../services/accessToken';

export const userRules = {
  validateUser: () => {
    return [
      header('x-access-token')
        .not()
        .isEmpty()
        .withMessage('unauthenticated')
        .bail()
        .custom(async (value, { req }) => {
          const token = req.headers['x-access-token'];
          try {
            verifyAccessToken(token, environment.JWT_SECRET_ACCOUNT_VALIDATION);
            return Promise.resolve(true);
          } catch (error) {
            console.error(error);
            return Promise.reject(new Error('server Error'));
          }
        }),
    ];
  },
  forgotPassword: () => {
    return [
      body('email')
        .not()
        .isEmpty()
        .withMessage('email is required')
        .bail()
        .isEmail()
        .withMessage('invalid email')
        .bail()
        .custom(async (value, { req }) => {
          try {
            const user = await db.User.findOne({ where: { email: req.body.email } });
            if (!Boolean(user)) {
              return Promise.reject(new Error('email does not exist'));
            }
          } catch (error) {
            console.error(error);
            return Promise.reject(new Error('server Error'));
          }
          return Promise.resolve(true);
        }),
    ];
  },
  newPassword: () => {
    return [
      header('x-access-token')
        .not()
        .isEmpty()
        .withMessage('unauthenticated')
        .bail()
        .custom(async (value, { req }) => {
          const token = req.headers['x-access-token'];
          try {
            verifyAccessToken(token, environment.JWT_SECRET_ACCOUNT_VALIDATION);
            return Promise.resolve(true);
          } catch (error) {
            console.error(error);
            return Promise.reject(new Error('server Error'));
          }
        }),
      body('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .bail()
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,255}$/)
        .withMessage('Invalid pasword'),
    ];
  },
};
