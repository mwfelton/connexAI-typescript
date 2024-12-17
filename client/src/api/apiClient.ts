export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
  responseType: 'json' | 'text' = 'json' // Default responseType is 'json'
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = responseType === 'json' ? await response.json() : await response.text();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
