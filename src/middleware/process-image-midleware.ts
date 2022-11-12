import sharp from 'sharp';
import { Request, Response } from 'express'
import { promises as fs } from 'fs';
import { query } from 'express-validator';
sharp()
const queryParm = async (
  req: Request,
  res: Response,
  next: () => void
): Promise<void> => {
    if (!query('width' && 'height').isNumeric()) {
    console.log('error query');
    res.status(400);
    res.send('Please set dimintion to numbers only');
    
  }
  const mainDir = './src/assets';
  const imagePath = mainDir + '/images/';
  const outputPath = mainDir + '/thumb/';

  await fs.mkdir(outputPath, { recursive: true });
  const name = req.query.filename;
  let width = Number(req.query.width);
  let height = Number(req.query.height);

  const imageDir = await fs.readdir(imagePath);

  let imageName;
  let imageExtention;

  for await (const pic of imageDir) {
    if (pic && pic.split('.')[0] === name) {
      imageName = pic.split('.')[0];
      imageExtention = pic.split('.')[1];
    }
  }

  if (!imageName) {
    imageName = 'default';
    imageExtention = 'png';
    width = 700;
    height = 700;
  }
  const fullImageName = imageName + '.' + imageExtention;

  const readImage = await fs.readFile(imagePath + fullImageName);

  const newSize = sharp(readImage);
  newSize.resize(width, height);

  await newSize.toFile(
    outputPath + imageName + '_thumb' + '.' + imageExtention
  );
  const readNewImage = await fs.readFile(
    outputPath + imageName + '_thumb' + '.' + imageExtention
  );
  res.contentType(`image/${imageExtention}`);
  res.send(readNewImage);
  next();
};

export default queryParm;
