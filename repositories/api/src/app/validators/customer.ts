import { body } from 'express-validator';
import db from '../../database/db';
export const createCustomerRules = () => {
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
          if (Boolean(user)) {
            return Promise.reject(new Error('email already in use'));
          }
          return Promise.resolve(true);
        } catch {
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
    body('firstName')
      .not()
      .isEmpty()
      .withMessage('firstName is required')
      .bail()
      .isString()
      .withMessage('invalid firstName'),
    body('lastName')
      .not()
      .isEmpty()
      .withMessage('lastName is required')
      .bail()
      .isString()
      .withMessage('invalid lastName'),
    body('phoneNumber')
      .not()
      .isEmpty()
      .withMessage('phoneNumber is required')
      .bail()
      .isMobilePhone('pt-BR')
      .withMessage('invalid phoneNumber'),
  ];
};
