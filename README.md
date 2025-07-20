# Weather App

A responsive weather application that displays real-time weather information for cities worldwide. Built with vanilla HTML, CSS, and JavaScript.

## Features

- Country and city selection dropdowns
- Real-time weather data display including:
  - Current temperature
  - Weather condition
  - Humidity
  - Wind speed
  - Weather icon
- Mobile responsive design
- Loading indicators
- Error handling
- Direct city search functionality

## Setup

1. Clone this repository
2. Get an API key from [WeatherAPI](https://www.weatherapi.com/)
3. Create a `config.js` file in the root directory and add your API key:
   ```javascript
   const CONFIG = {
       API_KEY: 'your_api_key_here'
   };
   ```
4. Open `index.html` in your browser

## API Used

This project uses the [WeatherAPI](https://www.weatherapi.com/) for fetching weather data and location information.

## Note

Make sure to replace the API key in `config.js` with your own key from WeatherAPI. 