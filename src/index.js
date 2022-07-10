import './style.css';
import { loadPage, updatePage } from './interface';

loadPage();

function showError(message) {
  const allWeatherData = document.querySelectorAll('.weather-data');
  allWeatherData.forEach((element) => { element.textContent = ''; });
  document.querySelector('.temperature').textContent = message;
}

async function getWeather(city, state) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=5c0006f10b54133c3a28d5e8e80c8dd9`);
  if (response.status !== 200) {
    throw new Error(`City: '${city}' not found: try another city.`);
  }
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}
function submitWeatherRequest() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.toLowerCase();
  if (city.length < 1) {
    showError('Please enter a city name');
  } else {
    const stateInput = document.getElementById('state-input');
    const state = stateInput.value;
    getWeather(city, state).then((data) => updatePage(data)).catch((err) => showError(err.message));
  }
}

document.querySelector('.submit-button').addEventListener('click', submitWeatherRequest);

// get weather icons
// add img import command to index.js
