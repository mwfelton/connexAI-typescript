import express from 'express';
import { getTime } from '../controllers/timeController';

const timeRoute = express.Router();

timeRoute.get('/time', getTime);

export default timeRoute;
