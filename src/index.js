import './style.css';
import loadPage from './loadPage';
import {
  updatePage, getUserPrefUnits, hideWeatherData, displayWeatherData,
} from './interface';

loadPage();

function clearError() {
  const errorDisplay = document.querySelector('.error-display');
  errorDisplay.textContent = '';
  errorDisplay.style.display = 'none';
}

function showError(message) {
  hideWeatherData();
  const errorDisplay = document.querySelector('.error-display');
  errorDisplay.textContent = message;
  errorDisplay.style.display = 'block';
}

async function getWeather(city, state) {
  const units = getUserPrefUnits();
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=5c0006f10b54133c3a28d5e8e80c8dd9&units=${units}`);
  if (response.status !== 200) {
    throw new Error(`City: '${city}' not found: try another city.`);
  }
  const weatherData = await response.json();
  displayWeatherData();
  return weatherData;
}

function submitWeatherRequest() {
  clearError();
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.toLowerCase();
  if (city.length < 1) {
    showError('Please enter a valid city name');
  } else {
    const stateInput = document.getElementById('state-input');
    const state = stateInput.value;
    getWeather(city, state).then((data) => updatePage(data)).catch((err) => showError(err.message));
  }
}

document.querySelector('.submit-button').addEventListener('click', submitWeatherRequest);

// get weather icons
// add img import command to index.js
