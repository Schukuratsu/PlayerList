import { body } from 'express-validator';
import { isValidCityId } from '../services/location';

export const gymRules = {
  createGym: () => {
    return [
      body('name').not().isEmpty().withMessage('name is required').bail().isString().withMessage('invalid name'),
      body('description').optional().isString().withMessage('invalid description'),
      body('cityId')
        .not()
        .isEmpty()
        .withMessage('cityId is required')
        .bail()
        .isNumeric()
        .withMessage('invalid cityId')
        .bail()
        .custom(async (value, { req }) => {
          try {
            const validCity = await isValidCityId(req.body.cityId);
            if (!validCity) {
              return Promise.reject(new Error('invalid cityId'));
            }
          } catch (error) {
            console.error(error);
            return Promise.reject(new Error('server Error'));
          }
          return Promise.resolve(true);
        }),
      body('address')
        .not()
        .isEmpty()
        .withMessage('address is required')
        .bail()
        .isString()
        .withMessage('invalid address'),
      body('addressNumber')
        .not()
        .isEmpty()
        .withMessage('addressNumber is required')
        .bail()
        .isNumeric()
        .withMessage('invalid addressNumber'),
      body('additionalAddressDetails').optional().isString().withMessage('invalid additionalAddressDetails'),
      body('phoneNumber')
        .not()
        .isEmpty()
        .withMessage('phoneNumber is required')
        .bail()
        .isMobilePhone('pt-BR')
        .withMessage('invalid phoneNumber'),
      body('pictureId').optional().isNumeric().withMessage('invalid pictureId'),
    ];
  },
};
