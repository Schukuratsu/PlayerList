import { RequestHandler } from 'express';
import environment from '../../config/environment';
import db from '../../database/db';
import { welcomeEmail } from '../constants/emails';
import { createAccessToken, verifyAccessToken } from '../services/accessToken';
import { sendMail } from '../services/mailer';

type Controllers = 'createAdministrator' | 'loginAdministrator' | 'validateAdministrator';

export const administratorControllers: Record<Controllers, RequestHandler> = {
  createAdministrator: async (req, res, next) => {
    const user = await db.User.create(req.body);
    const administrator = await db.Administrator.create({
      ...req.body,
      UserId: user.id,
    });
    try {
      const token = createAccessToken(
        {
          administratorId: administrator.id,
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        environment.JWT_SECRET_ACCOUNT_VALIDATION,
        365 * 24 * 3600,
      );
      await sendMail(req.body.email, welcomeEmail(token));
    } catch (error) {
      console.error(error);
      user.destroy();
      administrator.destroy();
      return res.status(400).send('server error, check if given email is valid');
    }
    return res.json({ id: administrator.id });
  },
  loginAdministrator: async (req, res, next) => {
    try {
      const administrator = await db.Administrator.findOne({
        where: { '$User.email$': req.body.email },
        include: { model: db.User },
      });
      const accessToken = createAccessToken({
        administratorId: administrator.id,
        userId: administrator.User.id,
        email: administrator.User.email,
        firstName: administrator.User.firstName,
        lastName: administrator.User.lastName,
      });
      return res.json({ accessToken });
    } catch {
      return res.status(500).send('server error');
    }
  },
  validateAdministrator: async (req, res, next) => {
    const token = req.headers['x-access-token'] as string;
    const tokenData = await verifyAccessToken(token);
    const administrator = await db.Administrator.findOne({
      where: { id: tokenData.administratorId },
      include: { model: db.User },
    });
    const accessToken = createAccessToken({
      administratorId: administrator.id,
      userId: administrator.User.id,
      email: administrator.User.email,
      firstName: administrator.User.firstName,
      lastName: administrator.User.lastName,
    });
    return res.json({ accessToken });
  },
};
