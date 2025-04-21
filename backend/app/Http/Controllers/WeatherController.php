<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherController extends Controller
{
    private $apiKey;

public function __construct()
{
    $this->apiKey = env('OPENWEATHERMAP_API_KEY');
}
    // public function getWeather(Request $request)
    // {
    //     $city = $request->query('city', 'Nairobi');
        
    //     // Cache key based on city name
    //     $cacheKey = 'weather_' . strtolower($city);
        
    //     // Check if we have cached data (cache for 30 minutes)
    //     if (Cache::has($cacheKey)) {
    //         return Cache::get($cacheKey);
    //     }
        
    //     try {
    //         // Get current weather
    //         $currentWeatherResponse = Http::get("https://api.openweathermap.org/data/2.5/weather", [
    //             'q' => $city,
    //             'appid' => $this->apiKey,
    //             'units' => 'metric',
    //         ]);
            
    //         if ($currentWeatherResponse->failed()) {
    //             return response()->json([
    //                 'error' => 'Failed to fetch weather data',
    //             ], 500);
    //         }
            
    //         $currentWeather = $currentWeatherResponse->json();
            
    //         // Get forecast for next 3 days
    //         $forecastResponse = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
    //             'q' => $city,
    //             'appid' => $this->apiKey,
    //             'units' => 'metric',
    //         ]);
            
    //         if ($forecastResponse->failed()) {
    //             return response()->json([
    //                 'error' => 'Failed to fetch forecast data',
    //             ], 500);
    //         }
            
    //         $forecast = $forecastResponse->json();
            
    //         // Format the response data to match our frontend requirements
    //         $result = $this->formatWeatherData($currentWeather, $forecast);
            
    //         // Cache the result for 30 minutes
    //         Cache::put($cacheKey, $result, 1800);
            
    //         return $result;
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'error' => 'An error occurred while fetching weather data',
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }
    public function getWeather(Request $request)
{
    $city = $request->query('city', 'Nairobi');
    
    // For demo purposes, just return mock data
    return [
        'city' => $city,
        'temperature' => 13,
        'weatherDescription' => 'Sunny',
        'weatherIcon' => 'sunny',
        'forecast' => [
            [
                'day' => '21 May',
                'temperature' => 15,
                'weatherIcon' => 'sunny'
            ],
            [
                'day' => '22 May',
                'temperature' => 20,
                'weatherIcon' => 'cloudy'
            ],
            [
                'day' => '23 May',
                'temperature' => 18,
                'weatherIcon' => 'sunny'
            ]
        ],
        'wind' => [
            'speed' => 3,
            'direction' => 'NW'
        ],
        'humidity' => 80,
        'date' => '20th May 2027',
        'location' => $city . ', Kenya'
    ];
}
    private function formatWeatherData($currentWeather, $forecast)
    {
        // Extract current date
        $date = now()->format('jS M Y');
        
        // Format the forecast data for 3 days
        $forecastData = [];
        $processedDates = [];
        
        // We need daily forecasts, not the 3-hour ones that the API returns
        foreach ($forecast['list'] as $item) {
            $forecastDate = date('Y-m-d', $item['dt']);
            
            // Skip if we already have this date or if it's today
            if (in_array($forecastDate, $processedDates) || $forecastDate === date('Y-m-d')) {
                continue;
            }
            
            $processedDates[] = $forecastDate;
            
            $forecastData[] = [
                'day' => date('j M', $item['dt']),
                'temperature' => round($item['main']['temp']),
                'weatherIcon' => $this->mapWeatherIcon($item['weather'][0]['icon']),
            ];
            
            // Stop once we have 3 days
            if (count($forecastData) >= 3) {
                break;
            }
        }
        
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
        
        return $iconMapping[$iconCode] ?? 'cloudy'; // Default to cloudy if not found
    }
    
    private function getWindDirection($degrees)
    {
        $directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        return $directions[round($degrees / 45)];
    }
}