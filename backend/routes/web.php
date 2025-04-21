<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

// Root route: returns the default welcome view
Route::get('/', function () {
    return view('welcome');
});

// Test route: simple endpoint to verify API is working
Route::get('/test', function() {
    return response()->json(['message' => 'API is working']);
});

// Weather API route: fetches current weather and 3-day forecast for a city
// Example usage: /api/weather?city=Kisumu
Route::get('/api/weather', [WeatherController::class, 'getWeather']);