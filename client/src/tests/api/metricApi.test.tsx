import { getMetrics } from '../../api/metricsApi';
import { apiClient } from '../../api/apiClient';

jest.mock('../../api/apiClient'); // Mock the apiClient

describe('getMetrics API', () => {
  it('returns metrics data on success', async () => {
    const mockData = { users: 100, sessions: 250 };
    (apiClient as jest.Mock).mockResolvedValue({ success: true, data: mockData });

    const result = await getMetrics();
    expect(result).toEqual({ success: true, data: mockData });
    expect(apiClient).toHaveBeenCalledWith('/metrics', { method: 'GET' });
  });

  it('returns an error message on failure', async () => {
    (apiClient as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getMetrics();
    expect(result).toEqual({ success: false, error: 'Failed to fetch metrics' });
  });
});
