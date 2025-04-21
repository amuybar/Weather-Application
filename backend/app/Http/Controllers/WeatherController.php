<?php

namespace App\Http\Controllers;

// WeatherController handles fetching and formatting weather data from OpenWeatherMap API.

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherController extends Controller
{
    // Holds the OpenWeatherMap API key
    private $apiKey;

    /**
     * WeatherController constructor.
     * Loads the OpenWeatherMap API key from environment variables.
     */
    public function __construct()
    {
        $this->apiKey = env('OPENWEATHERMAP_API_KEY');
    }

    /**
     * Fetches current weather and 3-day forecast for a given city.
     * Uses caching to reduce API calls.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|array
     */
    public function getWeather(Request $request)
    {
        // Get city from query, default to Nairobi
        $city = $request->query('city', 'Nairobi');
        
        // Cache key based on city name
        $cacheKey = 'weather_' . strtolower($city);
        
        // Return cached data if available (cache for 30 minutes)
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }
        
        try {
            // Fetch current weather data from OpenWeatherMap
            $currentWeatherResponse = Http::get("https://api.openweathermap.org/data/2.5/weather", [
                'q' => $city,
                'appid' => $this->apiKey,
                'units' => 'metric',
            ]);
            
            if ($currentWeatherResponse->failed()) {
                return response()->json([
                    'error' => 'Failed to fetch weather data',
                ], 500);
            }
            
            $currentWeather = $currentWeatherResponse->json();
            
            // Fetch 5-day/3-hour forecast data from OpenWeatherMap
            $forecastResponse = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
                'q' => $city,
                'appid' => $this->apiKey,
                'units' => 'metric',
            ]);
            
            if ($forecastResponse->failed()) {
                return response()->json([
                    'error' => 'Failed to fetch forecast data',
                ], 500);
            }
            
            $forecast = $forecastResponse->json();
            
            // Format the response data for frontend
            $result = $this->formatWeatherData($currentWeather, $forecast);
            
            // Cache the result for 30 minutes
            Cache::put($cacheKey, $result, 1800);
            
            return $result;
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'error' => 'An error occurred while fetching weather data',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Formats the weather and forecast data for frontend consumption.
     *
     * @param array $currentWeather
     * @param array $forecast
     * @return array
     */
    private function formatWeatherData($currentWeather, $forecast)
    {
        // Get current date in readable format
        $date = now()->format('jS M Y');
        
        // Prepare forecast data for the next 3 days
        $forecastData = [];
        $processedDates = [];
        
        // The API returns 3-hour interval data; we pick one per day
        foreach ($forecast['list'] as $item) {
            $forecastDate = date('Y-m-d', $item['dt']);
            
            // Skip if already processed or if it's today
            if (in_array($forecastDate, $processedDates) || $forecastDate === date('Y-m-d')) {
                continue;
            }
            
            $processedDates[] = $forecastDate;
            
            $forecastData[] = [
                'day' => date('j M', $item['dt']),
                'temperature' => round($item['main']['temp']),
                'weatherIcon' => $this->mapWeatherIcon($item['weather'][0]['icon']),
            ];
            
            // Stop after 3 days
            if (count($forecastData) >= 3) {
                break;
            }
        }
        
        // Return formatted weather data
        return [
            'city' => $currentWeather['name'],
            'temperature' => round($currentWeather['main']['temp']),
            'weatherDescription' => ucfirst($currentWeather['weather'][0]['description']),
            'weatherIcon' => $this->mapWeatherIcon($currentWeather['weather'][0]['icon']),
            'forecast' => $forecastData,
            'wind' => [
                'speed' => round($currentWeather['wind']['speed']),
                'direction' => $this->getWindDirection($currentWeather['wind']['deg']),
            ],
            'humidity' => $currentWeather['main']['humidity'],
            'date' => $date,
            'location' => $currentWeather['name'] . ', ' . ($currentWeather['sys']['country'] ?? ''),
        ];
    }
    
    /**
     * Maps OpenWeatherMap icon codes to frontend icon codes.
     *
     * @param string $iconCode
     * @return string
     */
    private function mapWeatherIcon($iconCode)
    {
        // Map OpenWeatherMap icon codes to our frontend icon codes
        $iconMapping = [
            '01d' => 'sunny',
            '01n' => 'clear-night',
            '02d' => 'partly-cloudy',
            '02n' => 'partly-cloudy-night',
            '03d' => 'cloudy',
            '03n' => 'cloudy',
            '04d' => 'cloudy',
            '04n' => 'cloudy',
            '09d' => 'rainy',
            '09n' => 'rainy',
            '10d' => 'rainy',
            '10n' => 'rainy',
            '11d' => 'thunderstorm',
            '11n' => 'thunderstorm',
            '13d' => 'snowy',
            '13n' => 'snowy',
            '50d' => 'foggy',
            '50n' => 'foggy',
        ];
        
        // Default to 'cloudy' if icon code not found
        return $iconMapping[$iconCode] ?? 'cloudy';
    }
    
    /**
     * Converts wind degree to compass direction.
     *
     * @param int|float $degrees
     * @return string
     */
    private function getWindDirection($degrees)
    {
        $directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        return $directions[round($degrees / 45)];
    }
}