import { RequestHandler } from 'express';
import environment from '../../config/environment';
import db from '../../database/db';
import { welcomeEmail } from '../constants/emails';
import { createAccessToken, verifyAccessToken } from '../services/accessToken';
import { sendMail } from '../services/mailer';

type Controllers = 'createCustomer' | 'loginCustomer' | 'validateCustomer';

export const customerControllers: Record<Controllers, RequestHandler> = {
  createCustomer: async (req, res, next) => {
    const user = await db.User.create(req.body);
    const customer = await db.Customer.create({
      ...req.body,
      UserId: user.id,
    });
    try {
      const token = createAccessToken(
        {
          customerId: customer.id,
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        environment.JWT_SECRET_ACCOUNT_VALIDATION,
        365 * 24 * 3600,
      );
      sendMail(req.body.email, welcomeEmail(token));
    } catch {
      user.destroy();
      customer.destroy();
      return res.status(400).send('server error, check if given email is valid');
    }
    res.json({ id: customer.id });
  },
  loginCustomer: async (req, res, next) => {
    try {
      const customer = await db.Customer.findOne({
        where: { '$User.email$': req.body.email },
        include: { model: db.User },
      });
      const accessToken = createAccessToken({
        customerId: customer.id,
        userId: customer.User.id,
        email: customer.User.email,
        firstName: customer.User.firstName,
        lastName: customer.User.lastName,
      });
      return res.json({ accessToken });
    } catch {
      return res.status(500).send('server error');
    }
  },
  validateCustomer: async (req, res, next) => {
    const token = req.headers['x-access-token'] as string;
    const tokenData = await verifyAccessToken(token);
    const customer = await db.Customer.findOne({
      where: { id: tokenData.customerId },
      include: { model: db.User },
    });
    const accessToken = createAccessToken({
      customerId: customer.id,
      userId: customer.User.id,
      email: customer.User.email,
      firstName: customer.User.firstName,
      lastName: customer.User.lastName,
    });
    return res.json({ accessToken });
  },
};
