import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../src/middleware/authMiddleware';

// Mocking the Request, Response, and NextFunction
describe('authMiddleware', () => {
  it('should call next() if the authorization token is correct', () => {
    const req = {
      headers: {
        authorization: 'mysecrettoken',
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled(); // The next() function should be called if the token is correct
  });

  it('should return a 403 error if the authorization token is incorrect', () => {
    const req = {
      headers: {
        authorization: 'wrongtoken',
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403); // The status should be set to 403
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' }); // The response should be 'Forbidden'
  });

  it('should return a 403 error if no authorization token is provided', () => {
    const req = {
      headers: {},
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403); // The status should be set to 403
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' }); // The response should be 'Forbidden'
  });
});
