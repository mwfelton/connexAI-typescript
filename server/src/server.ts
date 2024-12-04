import express from 'express';
import timeRoutes from './routes/timeRoutes';

const app = express();
const port = process.env.PORT || 3001;

app.use('/', timeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
