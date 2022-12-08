import { abrvStates, lowerCaseStates } from './data';
import { updatePrefUnits, updatePrefState } from './interface';

const loadPage = () => {
  const content = document.createElement('div');
  content.classList.add('content');

  const header = document.createElement('div');
  header.classList.add('header');
  header.textContent = 'Today\'s Weather Forecast';

  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container';
  const navBar = document.createElement('nav');
  const aboutContainer = document.createElement('div');
  aboutContainer.className = 'about-container';
  const about = document.createElement('a');
  about.className = 'about-button';
  about.href = 'https://konradstar.dev/';
  aboutContainer.appendChild(about);
  const searchBarContainer = document.createElement('div');
  searchBarContainer.className = 'search-bar-container';
  const searchBar = document.createElement('button');
  searchBar.type = 'button';
  searchBar.className = 'search-button';
  searchBarContainer.appendChild(searchBar);
  const menuButtonContainer = document.createElement('div');
  menuButtonContainer.className = 'menu-button-container';
  const menuButton = document.createElement('button');
  menuButton.className = 'menu-button';
  menuButtonContainer.appendChild(menuButton);

  const menu = document.createElement('div');
  menu.className = 'menu';

  const unitsForm = document.createElement('div');
  unitsForm.className = 'menu-form';
  const unitsFormHeader = document.createElement('h1');
  unitsFormHeader.textContent = 'Preferred Units';

  const labelContainer = document.createElement('div');
  labelContainer.className = 'label-container';
  const imperialLabel = document.createElement('label');
  imperialLabel.className = 'radio-container';
  imperialLabel.textContent = 'Fahrenheit || miles/hr';
  const imperialInput = document.createElement('input');
  imperialInput.type = 'radio';
  imperialInput.name = 'units';
  imperialInput.id = 'imperial';
  imperialInput.checked = 'checked';
  const imperialSpan = document.createElement('span');
  imperialSpan.className = 'checkmark';
  imperialLabel.append(imperialInput, imperialSpan);

  const metricLabel = document.createElement('label');
  metricLabel.className = 'radio-container';
  metricLabel.textContent = 'Celsius || meters/sec';
  const metricInput = document.createElement('input');
  metricInput.type = 'radio';
  metricInput.name = 'units';
  metricInput.id = 'metric';
  const metricSpan = document.createElement('span');
  metricSpan.className = 'checkmark';
  metricLabel.append(metricInput, metricSpan);

  imperialInput.addEventListener('change', updatePrefUnits);
  metricInput.addEventListener('change', updatePrefUnits);

  labelContainer.append(imperialLabel, metricLabel);

  unitsForm.append(unitsFormHeader, labelContainer);

  const homePageLink = document.createElement('a');
  homePageLink.textContent = 'Learn more about me!';
  homePageLink.href = 'https://konradstar.dev/';
  const gitHubLink = document.createElement('a');
  gitHubLink.textContent = 'Check out my GitHub';
  gitHubLink.href = 'https://github.com/kstarczak';

  menu.append(unitsForm, homePageLink, gitHubLink);
  navBar.append(aboutContainer, searchBarContainer, menu, menuButtonContainer);
  navContainer.appendChild(navBar);

  const searchModal = document.createElement('div');
  const searchModalHeader = document.createElement('h2');
  searchModalHeader.textContent = 'Enter a City and State';
  searchModal.className = 'search-modal';
  const locationContainer = document.createElement('div');
  locationContainer.className = 'location-container';
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
    let selectedState;
    if (localStorage.getItem('userPrefState')) {
      selectedState = localStorage.getItem('userPrefState');
    } else {
      selectedState = 'new hampshire';
    }
    if (stateOption.value === selectedState) {
      stateOption.selected = true;
    }
  });
  stateContainer.append(stateLabel, stateInput);
  locationContainer.append(cityContainer, stateContainer);
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  const submitButton = document.createElement('button');
  submitButton.className = 'submit-button';
  submitButton.type = 'button';
  submitButton.textContent = 'Get Weather';
  const cancelButton = document.createElement('button');
  cancelButton.className = 'cancel-button';
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';
  buttonContainer.append(submitButton, cancelButton);
  searchModal.append(searchModalHeader, locationContainer, buttonContainer);

  function toggleModal() {
    searchModal.classList.toggle('search-modal-open');
  }
  searchBar.addEventListener('click', toggleModal);
  submitButton.addEventListener('click', toggleModal);
  cancelButton.addEventListener('click', toggleModal);

  const errorDisplay = document.createElement('div');
  errorDisplay.className = 'error-display';

  const main = document.createElement('div');
  main.classList.add('main');

  const temperatureContainer = document.createElement('div');
  temperatureContainer.className = 'temperature-container';
  const temperature = document.createElement('div');
  temperature.classList.add('weather-data', 'temperature');
  const loHi = document.createElement('div');
  loHi.classList.add('weather-data', 'lohi');
  temperatureContainer.append(temperature, loHi);

  const graphic = document.createElement('div');
  graphic.classList.add('weather-data', 'graphic');
  const graphicIcon = document.createElement('div');
  graphicIcon.id = 'graphic-icon';
  const graphicDesc = document.createElement('div');
  graphicDesc.className = 'graphic-desc';
  graphic.append(graphicIcon, graphicDesc);

  const details = document.createElement('div');
  details.classList.add('weather-data', 'details');

  const humidity = document.createElement('div');
  humidity.classList.add('weather-data', 'humidity');

  const wind = document.createElement('div');
  wind.classList.add('weather-data', 'wind');
  const windArrow = document.createElement('div');
  windArrow.className = 'wind-arrow';
  const windDesc = document.createElement('div');
  windDesc.className = 'wind-desc';
  wind.append(windArrow, windDesc);

  main.append(temperatureContainer, graphic, details, humidity, wind);

  const locationAndDate = document.createElement('div');
  locationAndDate.className = 'location-date';
  const location = document.createElement('p');
  location.className = 'location';
  const date = document.createElement('p');
  date.className = 'date';
  locationAndDate.append(location, date);

  const footer = document.createElement('footer');
  const footerLink = document.createElement('a');
  footerLink.textContent = 'Copyright \u00A9 2022 Konrad Starczak';
  footerLink.href = 'https://konradstar.dev/';
  footer.appendChild(footerLink);

  document.querySelector('body').appendChild(content);
  content.append(header, navContainer, searchModal, errorDisplay, main, locationAndDate, footer);

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    menuButton.classList.toggle('menu-open');
  });
};

export default loadPage;
