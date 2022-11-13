import express from 'express';
import getImageMidleware from '../middleware/get-image-midleware';
import processImageMiddleware from '../middleware/process-image-midleware';

const routes = express.Router();

routes.use('/images', [getImageMidleware, processImageMiddleware]);

export default routes;
