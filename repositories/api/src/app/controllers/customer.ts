import { RequestHandler } from 'express';
import db from '../../database/db';
import { createJwtToken } from '../services/accessToken';

type Controllers = 'createCustomer' | 'loginCustomer';

export const customerControllers: Record<Controllers, RequestHandler> = {
  createCustomer: async (req, res, next) => {
    const user = await db.User.create(req.body);
    const customer = await db.Customer.create({
      ...req.body,
      UserId: user.id,
    });
    res.json({ id: customer.id });
  },
  loginCustomer: async (req, res, next) => {
    try {
      const customer = await db.Customer.findOne({
        where: { '$User.email$': req.body.email },
        include: { model: db.User },
      });
      const accessToken = createJwtToken({
        customerId: customer.id,
        email: customer.User.email,
        firstName: customer.User.firstName,
        lastName: customer.User.lastName,
      });
      return res.json({ accessToken });
    } catch {
      return res.status(500).send('server error');
    }
  },
};
