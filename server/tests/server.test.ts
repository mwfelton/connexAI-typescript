import request from 'supertest';
import express from 'express';
import timeRoutes from '../src/routes/timeRoutes'; // Adjust path as necessary

const prometheus = require('express-prometheus-middleware');

const app = express();
const port = process.env.PORT || 3001;

// Add Prometheus middleware and routes to app
app.use(prometheus({
  metricPath: '/metrics',
  collectDefaultMetrics: true,
}));
app.use('/', timeRoutes);

describe('Server tests', () => {
  it('should respond to /metrics with Prometheus metrics', async () => {
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    expect(response.text).toContain('http_requests_total');
  });

  it('should respond with a 404 for an undefined route', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
  });

  it('should start the server and listen on the correct port', (done) => {
    const server = app.listen(port, () => {
      expect(server.address()).toBeDefined();
      server.close(done); // Close server after test
    });
  });
});
