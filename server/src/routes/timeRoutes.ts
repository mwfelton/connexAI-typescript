import express from 'express';
import { getTime } from '../controllers/timeController';
import { authMiddleware } from '../middleware/authMiddleware';

const timeRoute = express.Router();

timeRoute.get('/time', authMiddleware, getTime);

export default timeRoute;
