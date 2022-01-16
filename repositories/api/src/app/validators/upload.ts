import { body, header } from 'express-validator';
import environment from '../../config/environment';
import db from '../../database/db';
import { verifyAccessToken } from '../services/accessToken';
import { asyncCompare } from '../services/password';

export const uploadRules = {
  uploadImage: () => {
    return [
      body('file')
        .custom(async (values, { req }) => {
          const file = req.file;
          if(!file) return Promise.reject('file is required');
          const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!acceptedMimeTypes.includes(file?.mimetype)) {
            console.log(file);
            return Promise.reject('file should be a .jpg, .png or .gif');
          }
          return Promise.resolve();
        }),
      // test if is image file
      body('height').optional().isNumeric().withMessage('height should be a number'),
      body('width').optional().isNumeric().withMessage('width should be a number'),
      body('startX').optional().isNumeric().withMessage('startX should be a number'),
      body('startY').optional().isNumeric().withMessage('startY should be a number'),
      body('resultWidth').optional().isNumeric().withMessage('resultWidth should be a number'),
      body('resultHeight').optional().isNumeric().withMessage('resultHeight should be a number'),
    ];
  },
};
