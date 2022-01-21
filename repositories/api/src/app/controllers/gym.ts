import { RequestHandler } from 'express';
import db from '../../database/db';
import { verifyAccessToken } from '../services/accessToken';

type Controllers = 'createGym';

export const gymControllers: Record<Controllers, RequestHandler> = {
  createGym: async (req, res, next) => {
    const token = req.headers['x-access-token'] as string;
    const tokenData = verifyAccessToken(token);
    try {
      const gym = await db.Gym.create({
        ...req.body,
        administratorId: tokenData.administratorId,
      });
      if (req.body.pictureId) {
        const picture = await db.Picture.findOne({
          where: {
            id: req.body.pictureId
          }
        })
        await gym.addPicture(picture);
      }
      return res.json({ id: gym.id });
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  },
};
