import { apiClient } from './apiClient';

// Define the structure of the metrics response
export interface MetricsResponse {
  success: boolean;
  data?: { [key: string]: number }; // Example: { users: 100, sessions: 250 }
  error?: string;
}

// Function to fetch metrics data
export const getMetrics = async (): Promise<MetricsResponse> => {
  try {
    // Explicitly specify the expected data type
    const response = await apiClient<{ [key: string]: number }>('/metrics', { method: 'GET' });
    return response;
  } catch (error) {
    return { success: false, error: 'Failed to fetch metrics' };
  }
};

