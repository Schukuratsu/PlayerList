import { RequestHandler } from 'express';
import db from '../../database/db';
import { asyncEncrypt } from '../utils/password';

export const administratorControllers: { [key: string]: RequestHandler } = {
  createAdministrator: async (req, res, next) => {
    const password = await asyncEncrypt(req.body.password);
    const user = await db.User.create({ ...req.body, password });
    const administrator = await db.Administrator.create({
      ...req.body,
      userId: user.id,
    });
    res.json({ id: administrator.id });
  },
};
