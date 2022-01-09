import { header } from 'express-validator';
import { verifyAccessToken } from '../services/accessToken';

export const authenticationRules = {
  authenticatedUser: () => {
    return [
      header('x-access-token')
        .not()
        .isEmpty()
        .withMessage('unauthenticated')
        .bail()
        .custom(async (value, { req }) => {
          const token = req.headers['x-access-token'];
          try {
            await verifyAccessToken(token);
            return Promise.resolve(true);
          } catch {
            return Promise.reject(new Error('server Error'));
          }
        }),
    ];
  },
  authenticatedAdministrator: () => {
    return [
      header('x-access-token')
        .not()
        .isEmpty()
        .withMessage('unauthenticated')
        .bail()
        .custom(async (value, { req }) => {
          const token = req.headers['x-access-token'];
          try {
            const tokenData = await verifyAccessToken(token);
            if (tokenData.administratorId) {
              return Promise.resolve(true);
            }
            return Promise.reject(new Error('unauthorized'));
          } catch {
            return Promise.reject(new Error('server Error'));
          }
        }),
    ];
  },
  authenticatedCustomer: () => {
    return [
      header('x-access-token')
        .not()
        .isEmpty()
        .withMessage('unauthenticated')
        .bail()
        .custom(async (value, { req }) => {
          const token = req.headers['x-access-token'];
          try {
            const tokenData = await verifyAccessToken(token);
            if (tokenData.customerId) {
              return Promise.resolve(true);
            }
            return Promise.reject(new Error('unauthorized'));
          } catch {
            return Promise.reject(new Error('server Error'));
          }
        }),
    ];
  },
};
