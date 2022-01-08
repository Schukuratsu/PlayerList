import { RequestHandler } from 'express';
import environment from '../../config/environment';
import db from '../../database/db';
import { accountValidationEmail, forgotPasswordEmail } from '../constants/emails';
import { createAccessToken, verifyAccessToken } from '../services/accessToken';
import { sendMail } from '../services/mailer';

type Controllers = 'validateUser' | 'forgotPassword';

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
  forgotPassword: async (req, res, next) => {
    try {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      const token = createAccessToken(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.id,
        },
        environment.JWT_SECRET_ACCOUNT_VALIDATION,
        30 * 60,
      );
      sendMail(user.email, forgotPasswordEmail(token));
    } catch (error) {
      console.log(error);
      return res.status(500).send('server error');
    }
    return res.send();
  },
};
