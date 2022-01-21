import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export * from './authentication';
export * from './user';
export * from './administrator';
export * from './customer';
export * from './upload';
export * from './gym';
export * from './floor';
