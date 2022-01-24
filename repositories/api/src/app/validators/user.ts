import { body, header } from 'express-validator';
import environment from '../../config/environment';
import db from '../../database/db';
import { verifyAccessToken } from '../services/accessToken';
import { asyncCompare } from '../services/password';

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
            return Promise.reject('server Error');
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
              return Promise.reject('email does not exist');
            }
          } catch (error) {
            console.error(error);
            return Promise.reject('server Error');
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
            return Promise.reject('server Error');
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
  changePassword: () => {
    return [
      body('oldPassword')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .bail()
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,255}$/)
        .withMessage('invalid pasword')
        .bail()
        .custom(async (value, { req }) => {
          if (req.body.oldPassword === req.body.newPassword) {
            return Promise.reject('newPassword cannot be the same as oldPassword');
          }
        })
        .bail()
        .custom(async (value, { req }) => {
          try {
            const token = verifyAccessToken(req.headers['x-access-token'])
            const user = await db.User.findOne({
              where: { id: token.userId },
            });
            if (!Boolean(user)) {
              return Promise.reject('invalid credentials');
            }
            const passwordMatches = await asyncCompare(req.body.oldPassword, user.password);
            if (!passwordMatches) {
              return Promise.reject('invalid credentials');
            }
          } catch (err) {
            console.log(err)
            return Promise.reject('invalid credentials');
          }
          return Promise.resolve(true);
        }),
      body('newPassword')
        .not()
        .isEmpty()
        .withMessage('newPassword is required')
        .bail()
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,255}$/)
        .withMessage('Invalid pasword'),
    ];
  },
};
