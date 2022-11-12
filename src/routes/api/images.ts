import express from 'express';
import queryParm from './../../middleware/images-midleware';

const images = express.Router();

images.get('/', queryParm);

export default images;
