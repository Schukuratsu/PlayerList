import { RequestHandler } from 'express';
import sharp from 'sharp';
import uuid from 'uuid';
import slugify from 'slugify';
import { uploadFile } from '../services/storage';
import db from '../../database/db';

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

    let buffer = file.buffer;

    try {
      let transform;

      if (height !== undefined && width !== undefined && startX !== undefined && startY !== undefined) {
        transform = sharp(buffer);
        transform = transform.extract({
          left: startX,
          top: startY,
          width: width,
          height: height,
        });
      }

      if (resultHeight !== undefined || resultWidth !== undefined) {
        if (!transform) transform = sharp(buffer);
        transform.resize({
          height: resultHeight,
          width: resultWidth,
          withoutEnlargement: true,
        });
      }

      if(transform) buffer = await transform.toBuffer();

      const serverFilename = `${uuid.v4()}-${slugify(file.originalname)}`;

      const fileUrl = await uploadFile(serverFilename, buffer);

      const picture = await db.Picture.create({
        url: serverFilename,
        originalFilename: file.originalname,
        mimeType: file.mimetype,
        size: buffer.byteLength,
      });

      res.json({
        fileUrl,
        id: picture.id
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  },
};
