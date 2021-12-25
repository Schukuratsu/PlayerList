import { body } from 'express-validator';
export const createAdministratorRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,255}$/),
    body('firstName').isString(),
    body('lastName').isString(),
    body('phoneNumber').isMobilePhone('pt-BR'),
    body('registration').isNumeric().isLength({ min: 11, max: 14 }),
    body('registrationType').isIn(['cpf', 'cnpj']),
  ];
};
