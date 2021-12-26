import { RequestHandler } from 'express';
import db from '../../database/db';

export const customerControllers: { [key: string]: RequestHandler } = {
  createCustomer: async (req, res, next) => {
    console.log(req.body);
    const user = await db.User.create(req.body);
    const customer = await db.Customer.create({
      ...req.body,
      userId: user.id,
    });
    res.json({ id: customer.id });
  },
};
