import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });

  app.get('/time', (req, res) => {
    const serverTime = {
      epoch: Math.floor(Date.now() / 1000),
    };
    res.json(serverTime);
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });