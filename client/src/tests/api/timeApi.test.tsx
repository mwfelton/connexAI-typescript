import { getTime } from '../../api/timeApi';

global.fetch = jest.fn();

describe('timeApi', () => {
    it('should return epoch time on a successful response', async () => {
        const mockEpoch = 1633036800000;
    
        // Mock a successful fetch response
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce({ epoch: mockEpoch }),
        });
    
        const result = await getTime();
        expect(result).toBe(mockEpoch);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/time', {
          method: 'GET',
          headers: {
            Authorization: 'mysecrettoken',
          },
        });
      });
      
    it('should return null on a failed response', async () => {
        // Mock a failed fetch response
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          statusText: 'Unauthorized',
        });
    
        const result = await getTime();
        expect(result).toBeNull();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/time', {
          method: 'GET',
          headers: {
            Authorization: 'mysecrettoken',
          },
        });
      });

    it('should return null on a network error', async () => {
    // Mock a network error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await getTime();
    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/time', {
      method: 'GET',
      headers: {
        Authorization: 'mysecrettoken',
      },
    });
  });
});