import { RequestHandler } from 'express';
import db from '../../database/db';
import { asyncEncrypt } from '../utils/password';

export const customerControllers: { [key: string]: RequestHandler } = {
  createCustomer: async (req, res, next) => {
    const password = await asyncEncrypt(req.body.password);
    const user = await db.User.create({ ...req.body, password });
    const customer = await db.Customer.create({
      ...req.body,
      userId: user.id,
    });
    res.json({ id: customer.id });
  },
};
