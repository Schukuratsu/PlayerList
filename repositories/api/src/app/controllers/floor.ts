import { RequestHandler } from 'express';
import db from '../../database/db';

type Controllers = 'findAllFloors';

export const floorControllers: Record<Controllers, RequestHandler> = {
  findAllFloors: async (req, res, next) => {
    try {
      const floors = await db.Floor.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      return res.json(floors);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  },
};
