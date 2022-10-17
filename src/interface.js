import { abrvStates, lowerCaseStates, weatherConditions } from './data';

const loadPage = () => {
  const content = document.createElement('div');
  content.classList.add('content');

  const header = document.createElement('div');
  header.classList.add('header');
  header.textContent = 'Konrad\'s Weather App';

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');

  const cityContainer = document.createElement('div');

  const cityLabel = document.createElement('label');
  cityLabel.for = 'city-input';
  cityLabel.textContent = 'City';

  const cityInput = document.createElement('input');
  cityInput.type = 'text';
  cityInput.id = 'city-input';

  cityContainer.append(cityLabel, cityInput);

  const stateContainer = document.createElement('div');

  const stateLabel = document.createElement('label');
  stateLabel.for = 'state-input';
  stateLabel.textContent = 'State';

  const stateInput = document.createElement('select');
  stateInput.id = 'state-input';
  abrvStates.forEach((state, i) => {
    const stateOption = document.createElement('option');
    stateOption.textContent = state;
    stateOption.value = lowerCaseStates[i];
    stateInput.appendChild(stateOption);
  });

  stateContainer.append(stateLabel, stateInput);

  const submitButton = document.createElement('button');
  submitButton.className = 'submit-button';
  submitButton.type = 'button';
  submitButton.textContent = 'Get Weather';

  searchContainer.append(cityContainer, stateContainer, submitButton);

  const main = document.createElement('div');
  main.classList.add('main');

  const temperature = document.createElement('div');
  temperature.classList.add('weather-data', 'temperature');

  const humidity = document.createElement('div');
  humidity.classList.add('weather-data', 'humidity');

  const wind = document.createElement('div');
  wind.classList.add('weather-data', 'wind');

  main.append(temperature, humidity, wind);

  const footer = document.createElement('footer');
  footer.textContent = ''

  document.querySelector('body').appendChild(content);
  content.append(header, searchContainer, main, footer);
};

const updatePage = (data) => {
  const tempData = data;

  const temperature = document.querySelector('.temperature');
  const currentTemp = Math.round((tempData.main.temp - 273) * (9 / 5) + 32);
  const lowTemp = Math.round((tempData.main.temp_min - 273) * (9 / 5) + 32);
  const hiTemp = Math.round((tempData.main.temp_max - 273) * (9 / 5) + 32);
  temperature.textContent = `${currentTemp} \u00B0 F (low of ${lowTemp} \u00B0 F, high of ${hiTemp} \u00B0 F)`;

  const currentConditions = data.weather[0];
  const currentConditionsMain = currentConditions.main;
  const currentConditionsDesc = currentConditions.description;
  let outputConditions;
  switch (currentConditionsMain) {
    case 'Thunderstorm':
      outputConditions = 'Thunderstorms';
      break;
    case 'Drizzle':
      outputConditions = 'Light Rain';
      break;
    default:
      outputConditions = currentConditionsDesc;
  };

  // assign textContent with output conditions;

  const wind = document.querySelector('.wind');
  const currentWind = data.wind.speed;
  // add logic to make and arrow correlate to ...const currentWindDir = data.wind.deg;
  wind.textContent = `Wind: ${currentWind} kph`;

  const humidity = document.querySelector('.humidity');
  const currentHumidity = data.main.humidity;
  humidity.textContent = `Humidity: ${currentHumidity}`;
};

export { loadPage, updatePage };
