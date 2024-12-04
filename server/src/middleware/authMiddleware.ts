import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (token !== 'mysecrettoken') {
    res.status(403).json({ message: 'Forbidden' });
    return
  }

  next();
};