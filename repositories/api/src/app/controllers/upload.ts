import { RequestHandler } from 'express';
import sharp from 'sharp';
import { uploadFile } from '../services/storage';

type Controllers = 'uploadImage';

export const uploadControllers: Record<Controllers, RequestHandler> = {
  uploadImage: async (req, res, next) => {
    const file = req.file;
    const resultHeight = parseInt(req.body.resultHeight) || undefined;
    const resultWidth = parseInt(req.body.resultWidth) || undefined;
    const height = parseInt(req.body.height) || undefined;
    const width = parseInt(req.body.width) || undefined;
    const startX = parseInt(req.body.startX) || undefined;
    const startY = parseInt(req.body.startY) || undefined;

    try {
      let transform = sharp(file.buffer);

      if (height !== undefined && width !== undefined && startX !== undefined && startY !== undefined) {
        transform = transform.extract({
          left: startX,
          top: startY,
          width: width,
          height: height,
        });
      }

      if (resultHeight !== undefined || resultWidth !== undefined) {
        transform.resize({
          height: resultHeight,
          width: resultWidth,
          withoutEnlargement: true,
        });
      }

      const resultBuffer = await transform.toBuffer();

      const fileUrl = await uploadFile(file.originalname, resultBuffer);

      res.json({
        fileUrl,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
    return res.send();
  },
};
