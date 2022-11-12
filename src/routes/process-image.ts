import express from 'express';
import processImageMidleware from '../middleware/process-image-midleware';

const images = express.Router();

images.get('/', processImageMidleware);

export default images;
