import { RequestHandler } from 'express';
import environment from '../../config/environment';
import db from '../../database/db';
import { accountValidationEmail } from '../constants/emails';
import { verifyAccessToken } from '../services/accessToken';
import { sendMail } from '../services/mailer';

type Controllers = 'validateUser';

export const userControllers: Record<Controllers, RequestHandler> = {
  validateUser: async (req, res, next) => {
    const token = req.headers['x-access-token'] as string;
    try {
      const tokenData = verifyAccessToken(token, environment.JWT_SECRET_ACCOUNT_VALIDATION);
      const user = await db.User.findOne({
        where: {
          id: tokenData.userId,
        },
      });
      await user.update({ validated: true });
      await sendMail(user.email, accountValidationEmail);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
    return res.send();
  },
};
