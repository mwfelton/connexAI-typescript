import express from 'express';
import timeRoutes from './routes/timeRoutes';

const cors = require('cors');

const prometheus = require('express-prometheus-middleware');
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.use(prometheus({
  metricPath: '/metrics',
  collectDefaultMetrics: true,
}));

app.use('/', timeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
