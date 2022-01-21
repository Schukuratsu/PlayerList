import { RequestHandler } from 'express';
import db from '../../database/db';

type Controllers = 'findAllSports';

export const sportControllers: Record<Controllers, RequestHandler> = {
  findAllSports: async (req, res, next) => {
    try {
      const sports = await db.Sport.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      return res.json(sports);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  },
};
