import { apiClient } from './apiClient';

export interface MetricsResponse {
  success: boolean;
  data?: string; // Raw text response
  error?: string;
}

export const getMetrics = async (): Promise<MetricsResponse> => {
  try {
    const response = await apiClient('/metrics', { method: 'GET' }, 'text'); // Specify responseType as 'text'
    if (response.success && typeof response.data === 'string') {
      return { success: true, data: response.data };
    }
    return { success: false, error: 'Invalid metrics response' };
  } catch (error) {
    return { success: false, error: 'Failed to fetch metrics' };
  }
};
