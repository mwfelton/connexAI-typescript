import request from 'supertest';
import express from 'express';
import timeRoute from '../../src/routes/timeRoutes'

const app = express();
app.use(timeRoute);

describe('GET /time', () => {
  it('should return server time if the correct authorization token is provided', async () => {
    const response = await request(app)
      .get('/time')
      .set('Authorization', 'mysecrettoken');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('epoch');
  });

  it('should return 403 if the wrong authorization token is provided', async () => {
    const response = await request(app)
      .get('/time')
      .set('Authorization', 'wrongtoken');

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden');
  });

  it('should return 403 if no authorization token is provided', async () => {
    const response = await request(app).get('/time');

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden');
  });
});