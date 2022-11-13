import express from 'express';
import routes from './routes/index';
import { Request, Response } from 'express';
const app = express();

const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server Working!!');
});

app.use('/api', routes);
const server = app.listen(port, () => {
  console.log(`
 -------------------------------
 | server listen to Port  ${port} |
 -------------------------------
  `);
});

export default server;
