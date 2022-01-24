import { body } from 'express-validator';
import { isValidCityId } from '../services/location';

export const courtRules = {
  createCourt: () => {
    return [
      body('GymId').not().isEmpty().withMessage('GymId is required').bail().isNumeric().withMessage('invalid GymId'),
      body('FloorId').not().isEmpty().withMessage('FloorId is required').bail().isNumeric().withMessage('invalid FloorId'),
      body('identifier').not().isEmpty().withMessage('identifier is required').bail().isString().withMessage('invalid identifier'),
      body('description').optional().isString().withMessage('invalid description'),
      body('sportIds').custom(async (value)=>{
        if(!value) return Promise.reject('sportIds is required')
        if(!Array.isArray(value) || !value.every(Number.isInteger)) return Promise.reject('invalid sportIds')
      }),
      body('pictureIds').custom(async (value)=>{
        if(!value) return Promise.reject('pictureIds is required')
        if(!Array.isArray(value) || !value.every(Number.isInteger)) return Promise.reject('invalid pictureIds')
      }),
    ];
  },
};
