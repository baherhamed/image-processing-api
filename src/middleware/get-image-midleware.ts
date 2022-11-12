import { Request, Response } from 'express'
import { promises as fs } from 'fs';
import sharp from 'sharp';
import { query } from 'express-validator';

sharp()
const getImageMidleware = async (
  req: Request,
  res: Response,
  next: () => void
): Promise<void> => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  if (!query('width' && 'height').isNumeric()) {
    console.log('error query');
    res.status(400);
    res.send('Please set dimintion to numbers only');
    
  }


  const mainDir = './src/assets';
  const outputPath = mainDir + '/thumb/';

  const name = req.query.filename;
  const imageDir = await fs.readdir(outputPath);

  let imageName;
  let imageExtention;

  for await (const pic of imageDir) {
    if (pic && pic.split('_thumb.')[0] === name) {
      imageName = pic.split('_thumb.')[0];
      imageExtention = pic.split('.')[1];
    }
  }

  const readNewImage = await fs.readFile(
    outputPath + imageName + '_thumb' + '.' + imageExtention
  );

  const selectedImage = sharp(readNewImage);

  const imageDimintion = await selectedImage.metadata();
  if (imageDimintion.width === width && imageDimintion.height === height) {
    res.contentType(`image/${imageExtention}`);
    res.send(readNewImage);

  } else {
    next()
  }


};

export default getImageMidleware;
