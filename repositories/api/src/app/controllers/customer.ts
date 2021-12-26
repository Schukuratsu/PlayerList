import { RequestHandler } from 'express';
import db from '../../database/db';

type Controllers = 'createCustomer';

export const customerControllers: Record<Controllers, RequestHandler> = {
  createCustomer: async (req, res, next) => {
    const user = await db.User.create(req.body);
    const customer = await db.Customer.create({
      ...req.body,
      UserId: user.id,
    });
    res.json({ id: customer.id });
  },
};
