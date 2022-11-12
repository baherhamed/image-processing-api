import express from 'express';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const queryParm = async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  const mainDir = './src/assets';
  const imagePath = mainDir + '/images/';
  const outputPath = mainDir + '/thumb/';

  await fs.mkdir(outputPath, { recursive: true });
  const name = req.query.filename;
  let width = Number(req.query.width)
  let height = Number(req.query.height)

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
