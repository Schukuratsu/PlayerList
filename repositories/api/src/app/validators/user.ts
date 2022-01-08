import { header } from 'express-validator';
import environment from '../../config/environment';
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
};
