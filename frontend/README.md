# Weather Application Frontend

This is the frontend for the Weather Application, built with **Next.js** and **React**. It provides a modern, responsive UI for searching and viewing weather data by city, including current conditions, a multi-day forecast, wind status, and humidity.

## Features

- **City Search:** Enter a city name to fetch and display weather data.
- **Current Weather:** Shows temperature, weather description, and icon.
- **Forecast:** Displays a 3-day weather forecast with icons and temperatures.
- **Wind & Humidity:** Visual widgets for wind speed/direction and humidity.
- **Temperature Unit Toggle:** Switch between Celsius and Fahrenheit.
- **Loading & Error States:** User-friendly loading animations and error messages.
- **Responsive Design:** Works well on desktop and mobile devices.

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── weather/route.ts      # API route proxying to backend
│   └── page.tsx                  # Main page component
├── components/
│   ├── CurrentWeather.tsx        # Current weather display
│   ├── ForecastSection.tsx       # Forecast cards section
│   ├── HumidityStatus.tsx        # Humidity widget
│   ├── SearchBar.tsx             # City search bar
│   ├── WeatherCard.tsx           # Single forecast card
│   ├── WeatherIcon.tsx           # Weather icon SVGs
│   └── WindStatus.tsx            # Wind widget
├── types/
│   └── weather.ts                # TypeScript types for weather data
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- The backend PHP API running (see backend setup)

### Installation

1. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

2. **Configure API Proxy (if needed):**
   - The frontend expects the backend API to be available at `http://localhost:8000/api/weather`.

3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Usage

- Use the search bar to enter a city name and view its weather.
- Toggle between Celsius and Fahrenheit using the °C/°F button.
- View current weather, forecast, wind, and humidity in a clean dashboard.

## Customization

- **Weather Icons:** Edit `WeatherIcon.tsx` to add or change SVG icons.
- **API Endpoint:** Change the backend URL in `app/api/weather/route.ts` if your backend runs elsewhere.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

**Weather Application Frontend** &copy; 2025