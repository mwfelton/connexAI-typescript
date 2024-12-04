import { Request, Response } from 'express';

export const getTime = (req: Request, res: Response) => {
  const serverTime = {
    epoch: Math.floor(Date.now() / 1000),
  };
  res.json(serverTime);
};