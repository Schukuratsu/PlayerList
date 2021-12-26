import { RequestHandler } from 'express';
import db from '../../database/db';

export const administratorControllers: { [key: string]: RequestHandler } = {
  createAdministrator: async (req, res, next) => {
    const user = await db.User.create(req.body);
    const administrator = await db.Administrator.create({
      ...req.body,
      userId: user.id,
    });
    res.json({ id: administrator.id });
  },
};
