# WeatherApp Backend

This is the **Laravel API backend** for the WeatherApp project. It fetches weather data from OpenWeatherMap and serves it to the frontend.

## Features

- Fetches current weather and 3-day forecast for any city.
- Caches results for 30 minutes to reduce API calls.
- Simple REST API endpoint.

## Setup

1. **Clone the repository** and navigate to the backend folder:
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   composer install
   ```

3. **Copy the environment file and set your API key:**
   ```sh
   cp .env.example .env
   ```
   Edit `.env` and set your `OPENWEATHERMAP_API_KEY`.

4. **Generate application key:**
   ```sh
   php artisan key:generate
   ```

5. **Run database migrations (if needed):**
   ```sh
   php artisan migrate
   ```

6. **Start the development server:**
   ```sh
   php artisan serve
   ```

## API Endpoints

- **GET /**  
  Returns the default Laravel welcome page.

- **GET /test**  
  Returns a simple JSON message to verify the API is working.

- **GET /api/weather?city=CityName**  
  Returns current weather and a 3-day forecast for the specified city.

  **Example:**
  ```
  /api/weather?city=Nairobi
  ```

## File Reference

- Main controller: [`App\Http\Controllers\WeatherController`](app/Http/Controllers/WeatherController.php)
- Routes: [`routes/web.php`](routes/web.php)

---

For the frontend and full-stack setup, see the main [README.md](../README.md).