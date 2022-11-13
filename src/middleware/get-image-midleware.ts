import { Request, Response } from 'express';
import { promises as fs } from 'fs';

const getImageMidleware = async (
  req: Request,
  res: Response,
  next: () => void
): Promise<void> => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (isNaN(width && height)) {
    res.status(400);
    res.send('Please set dimintion to numbers only');
    return;
  }

  const mainDir = './src/assets';
  await fs.mkdir(mainDir + '/thumb/', { recursive: true });
  const outputPath = mainDir + '/thumb/';
  const name = req.query.filename;
  const imageDir = await fs.readdir(outputPath);

  let imageName;
  let imageExtention;
  let imageWidth;
  let imageHeight;

  for await (const pic of imageDir) {
    if (pic && pic.split(',')[0] === name) {
      imageName = pic.split(',')[0];
      imageExtention = pic.split(',')[2].split('.')[1];
      imageWidth = pic.split(',')[1];
      imageHeight = pic.split(',')[2].split('.')[0];
    }
  }

  if (
    imageName &&
    Number(imageWidth) === width &&
    Number(imageHeight) === height
  ) {
    const readExisitImage = await fs.readFile(
      outputPath + imageName + ',' + width + ',' + height + '.' + imageExtention
    );
    res.contentType(`image/${imageExtention}`);
    res.send(readExisitImage);
  } else {
    next();
  }
};

export default getImageMidleware;
