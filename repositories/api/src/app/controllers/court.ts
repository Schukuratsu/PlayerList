import { RequestHandler } from 'express';
import db from '../../database/db';
import { verifyAccessToken } from '../services/accessToken';

type Controllers = 'createCourt';

export const courtControllers: Record<Controllers, RequestHandler> = {
  createCourt: async (req, res, next) => {
    try {
      const court = await db.Court.create({
        ...req.body,
      });
      await Promise.all([
        ...req.body.pictureIds.map(async (pictureId: number) => {
          const picture = await db.Picture.findOne({
            where: {
              id: pictureId,
            },
          });
          return await court.addPicture(picture);
        }),
        ...req.body.sportIds.map(async (sportId: number) => {
          const sport = await db.Sport.findOne({
            where: {
              id: sportId,
            },
          });
          return await court.addSport(sport);
        }),
      ]);
      return res.json({ id: court.id });
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  },
};
