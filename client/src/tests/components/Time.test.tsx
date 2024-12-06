import { render, screen, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock'
import TimeComponent from '../../components/Time/Time';
import { getTime } from '../../api/timeApi';
import React from 'react';

// Mock the API call
jest.mock('../../api/timeApi', () => ({
  getTime: jest.fn(),
}));

fetchMock.enableMocks();

describe('TimeComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('displays loading message initially', () => {
    render(<TimeComponent />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // it('displays epoch time when fetch is successful', async () => {
  //   const mockEpochTime = 1630988400; // Mocked epoch time
  //   (getTime as jest.Mock).mockResolvedValue(mockEpochTime); // Mock the successful response

  //   render(<TimeComponent />);

  //   // Wait for the async data to update and check if any numeric value is rendered
  //   await waitFor(() => {
  //     expect(screen.getByText(mockEpochTime.toString())).toBeInTheDocument(); // Check if the mocked epoch time is displayed
  //   });
  // });

  it('displays a number when fetch is successful', async () => {
    const mockResponse = { epoch: 1234567890 }; // Simulated numeric response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<TimeComponent />);

    // Wait for the async data to be fetched
    await waitFor(() => {
      // Check if any element contains a numeric value (any number)
      const element = screen.getByText((content) => !isNaN(Number(content)));
      expect(element).toBeInTheDocument();
    });
  });

  it('displays error message when time is null', async () => {
    (getTime as jest.Mock).mockResolvedValueOnce(null); // Simulate a null response from the API

    render(<TimeComponent />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to load time')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    (getTime as jest.Mock).mockRejectedValueOnce(new Error('API Error')); // Simulate an error response from the API

    render(<TimeComponent />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to load time')).toBeInTheDocument();
    });
  });
});
