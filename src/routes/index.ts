import express from 'express';
import { Request, Response } from 'express';
import getImageMidleware from '../middleware/get-image-midleware';
import processImageMiddleware from '../middleware/process-image-midleware';

const routes = express.Router();

routes.use(
  '/images',
  [getImageMidleware, processImageMiddleware],
  async (req: Request, res: Response, next: () => void) => {
    next();
  }
);

export default routes;
