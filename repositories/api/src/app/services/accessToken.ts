import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import environment from '../../config/environment';

export type JsonData = {
  customerId?: number;
  administratorId?: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
};

export const createAccessToken = (jsonData: JsonData, secret = environment.JWT_SECRET, expiresIn = 3000) => {
  return jwt.sign(jsonData, secret, { expiresIn });
};

export const verifyAccessToken = (token: string, secret = environment.JWT_SECRET): JsonData => {
  try {
    return jwt.verify(token, secret) as JsonData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
