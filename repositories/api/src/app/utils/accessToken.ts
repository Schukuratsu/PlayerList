import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../../config/env';

export type JsonData = {
  customerId?: number;
  administratorId?: number;
  email: string;
  firstName: string;
  lastName: string;
};

export const createJwtToken = (jsonData: JsonData) => {
  return jwt.sign(jsonData, env.JWT_SECRET, {
    expiresIn: 3000,
  });
};

export const verifyJwtToken = async (
  req: Request,
  res: Response,
): Promise<{ isAdministrator: boolean; id: number } | void> => {
  const token = req.headers['x-access-token'];
  if (Array.isArray(token)) res.status(401).json({ auth: false, message: 'Multiple tokens provided.' });
  else if (!token) res.status(401).json({ auth: false, message: 'No token provided.' });
  else
    try {
      const decodedJwt = (await jwt.verify(token, env.JWT_SECRET)) as JsonData;
      return {
        isAdministrator: !!decodedJwt.administratorId,
        id: decodedJwt.administratorId ?? decodedJwt.customerId,
      };
    } catch {
      res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
};
