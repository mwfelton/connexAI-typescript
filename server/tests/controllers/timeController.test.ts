import { Request, Response } from 'express';
import { getTime } from '../../src/controllers/timeController';

describe('getTime Controller', () => {
  it('should return the current server time in epoch format', () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    getTime(req, res);

    const mockJson = res.json as jest.Mock;

    expect(mockJson).toHaveBeenCalledTimes(1); 
    const epochValue = mockJson.mock.calls[0][0].epoch; 
    expect(typeof epochValue).toBe('number'); 
  });
});
