import sharp from 'sharp';
import { Request, Response } from 'express';
import { promises as fs } from 'fs';

const processImageMiddleware = async (
  req: Request,
  res: Response,
  next: () => void
): Promise<void> => {
  const width = Number(req.query.width) || 700;
  const height = Number(req.query.height) || 700;

  if (isNaN(width && height)) {
    res.status(400);
    res.send('Please set dimintion to numbers only');
    return;
  }

  const mainDir = './src/assets';
  await fs.mkdir(mainDir + '/thumb/', { recursive: true });
  const imagePath = mainDir + '/images/';
  const outputPath = mainDir + '/thumb/';

  const name = req.query.filename;

  const imageDir = await fs.readdir(imagePath);
  const thumbDir = await fs.readdir(outputPath);

  for await (const img of thumbDir) {
    if (img && img.split(',')[0] === name) {
      await fs.unlink(outputPath + img);
    }
  }

  let imageName;
  let imageExtention;

  for await (const pic of imageDir) {
    if (pic && pic.split('.')[0] === name) {
      imageName = pic.split('.')[0];
      imageExtention = pic.split('.')[1];
    }
  }

  if (!imageName) {
    res.status(400);
    res.send('Image not found');
    next();
    return;
  }

  const fullImageName = imageName + '.' + imageExtention;

  const readImage = await fs.readFile(imagePath + fullImageName);

  const newSize = sharp(readImage);
  newSize.resize(width, height);

  await newSize.toFile(
    outputPath + imageName + ',' + width + ',' + height + '.' + imageExtention
  );
  const readNewImage = await fs.readFile(
    outputPath + imageName + ',' + width + ',' + height + '.' + imageExtention
  );
  res.contentType(`image/${imageExtention}`);
  res.send(readNewImage);
  next();
};

export default processImageMiddleware;
