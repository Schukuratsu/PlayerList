import express from 'express';
import { uploadControllers } from '../controllers/upload';
import { upload } from '../middlewares/multer';
import { uploadRules, validate } from '../validators';
import { authenticationRules } from '../validators/authentication';

const route = '/upload';
const router = express.Router();

router.post(
  '/image',
  authenticationRules.authenticatedAdministrator(),
  validate,
  upload.single('file'),
  uploadRules.uploadImage(),
  validate,
  uploadControllers.uploadImage,
);

export default { route, router };
