import { body } from 'express-validator';
import db from '../../database/db';
import { asyncCompare } from '../utils/password';

export const createAdministratorRules = () => {
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
        } catch {
          return Promise.reject(new Error('server Error'));
        }
        return Promise.resolve(true);
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
    body('registration')
      .not()
      .isEmpty()
      .withMessage('registration is required')
      .bail()
      .isNumeric()
      .isLength({ min: 11, max: 14 })
      .withMessage('invalid registration'),
    body('registrationType')
      .not()
      .isEmpty()
      .withMessage('registrationType is required')
      .bail()
      .isIn(['cpf', 'cnpj'])
      .withMessage('invalid registrationType'),
  ];
};

export const loginAdministratorRules = () => {
  return [
    body('email').not().isEmpty().withMessage('email is required').bail().isEmail().withMessage('invalid email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('password is required')
      .bail()
      .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,255}$/)
      .withMessage('invalid pasword')
      .custom(async (value, { req }) => {
        try {
          const administrator = await db.Administrator.findOne({
            where: { '$User.email$': req.body.email },
            include: db.User,
          });
          if (!Boolean(administrator.User)) {
            return Promise.reject(new Error('invalid credentials'));
          }
          const passwordMatches = await asyncCompare(req.body.password, administrator.User.password);
          if (!passwordMatches) {
            return Promise.reject(new Error('invalid credentials'));
          }
        } catch(err) {
          return Promise.reject(new Error('invalid credentials'));
        }
        return Promise.resolve(true);
      }),
  ];
};
