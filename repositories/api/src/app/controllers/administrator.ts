import { RequestHandler } from 'express';
import db from '../../database/db';
import { createJwtToken } from '../utils/accessToken';

type Controllers = 'createAdministrator' | 'loginAdministrator';

export const administratorControllers: Record<Controllers, RequestHandler> = {
  createAdministrator: async (req, res, next) => {
    const user = await db.User.create(req.body);
    const administrator = await db.Administrator.create({
      ...req.body,
      UserId: user.id,
    });
    res.json({ id: administrator.id });
  },
  loginAdministrator: async (req, res, next) => {
    try {
      const administrator = await db.Administrator.findOne({
        where: { '$User.email$': req.body.email },
        include: { model: db.User },
      });
      const accessToken = createJwtToken({
        administratorId: administrator.id,
        email: administrator.User.email,
        firstName: administrator.User.firstName,
        lastName: administrator.User.lastName,
      });
      return res.json({ accessToken });
    } catch {
      return res.status(500).send('server error');
    }
  },
};
