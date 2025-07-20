// DOM Elements
const countrySelect = document.getElementById('countrySelect');
const citySelect = document.getElementById('citySelect');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');
const weatherInfo = document.getElementById('weatherInfo');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Common country codes for quick access
const commonCountries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'IN', name: 'India' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'JP', name: 'Japan' }
];

// Major cities by country
const majorCities = {
    'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    'GB': ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
    'CA': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'IN': ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'],
    'DE': ['Berlin', 'Hamburg', 'Munich', 'Frankfurt', 'Cologne'],
    'FR': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
    'IT': ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
    'JP': ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo']
};

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
countrySelect.addEventListener('change', handleCountryChange);
citySelect.addEventListener('change', handleCitySelect);
searchButton.addEventListener('click', handleDirectSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleDirectSearch();
});

// Initialize the app
async function initializeApp() {
    try {
        showLoader();
        populateCountryDropdown();
        hideLoader();
    } catch (error) {
        showError('Failed to initialize the app. Please try again later.');
        hideLoader();
    }
}

// Populate country dropdown with common countries
function populateCountryDropdown() {
    countrySelect.innerHTML = '<option value="">Select Country</option>';
    commonCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}

// Handle country selection
async function handleCountryChange() {
    const selectedCountry = countrySelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;

    if (!selectedCountry) return;

    try {
        showLoader();
        populateCityDropdown(selectedCountry);
        citySelect.disabled = false;
        hideLoader();
    } catch (error) {
        showError('Failed to load cities. Please try again.');
        hideLoader();
    }
}

// Populate city dropdown
function populateCityDropdown(countryCode) {
    citySelect.innerHTML = '<option value="">Select City</option>';
    const cities = majorCities[countryCode] || [];
    cities.forEach(cityName => {
        const option = document.createElement('option');
        option.value = `${cityName},${countryCode}`;
        option.textContent = cityName;
        citySelect.appendChild(option);
    });
}

// Handle city selection
async function handleCitySelect() {
    const selectedCity = citySelect.value;
    if (!selectedCity) return;
    await fetchWeather(selectedCity);
}

// Handle direct city search
async function handleDirectSearch() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        showError('Please enter a city name');
        return;
    }
    await fetchWeather(searchTerm);
}

// Fetch weather data
async function fetchWeather(city) {
    try {
        showLoader();
        hideError();
        hideWeatherInfo();

        const response = await fetch(`${CONFIG.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        displayWeather(data);
        hideLoader();
    } catch (error) {
        showError('City not found. Please try again.');
        hideLoader();
    }
}

// Display weather information
function displayWeather(data) {
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}% Humidity`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h Wind`; // Convert m/s to km/h
    showWeatherInfo();
}

// Utility functions
function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showWeatherInfo() {
    weatherInfo.classList.remove('hidden');
}

function hideWeatherInfo() {
    weatherInfo.classList.add('hidden');
} 