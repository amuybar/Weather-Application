
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles GET requests to fetch weather data for a specified city.
 * 
 * Expects a 'city' query parameter in the request URL.
 * Forwards the request to the PHP backend and returns the weather data as JSON.
 * 
 * @param request - The incoming Next.js API request object
 * @returns NextResponse containing weather data or an error message
 */
export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  // Validate that the 'city' parameter is provided
  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Construct the PHP backend URL with the city parameter
    const phpBackendUrl = `http://localhost:8000/api/weather?city=${encodeURIComponent(city)}`;

    // Forward the request to the PHP backend
    const response = await fetch(phpBackendUrl);

    // Check if the backend response is successful
    if (!response.ok) {
      // Log the error for debugging purposes
      console.error(`Backend responded with status: ${response.status}`);
      return NextResponse.json(
        { error: 'Failed to fetch weather data from backend' },
        { status: response.status }
      );
    }

    // Parse the backend response as JSON
    const data = await response.json();

    // Return the weather data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    // Log any unexpected errors
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
