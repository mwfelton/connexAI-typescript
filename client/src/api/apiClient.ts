interface ApiClientOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  const BASE_URL = 'http://localhost:3001';

//    * @param endpoint - API endpoint (e.g., '/metrics')
//    * @param options - Request options (method, headers, body, etc.)
//    * @returns A standardized response object with success, data, and error fields.
 
  export const apiClient = async <T>(
    endpoint: string,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      const data: T = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`API Client Error: ${error}`);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };
  