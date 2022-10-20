import { abrvStates, lowerCaseStates } from './data';

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
  const menuList = document.createElement('ul');
  const switchUnitsList = document.createElement('li');
  const switchUnitsLink = document.createElement('a');
  switchUnitsLink.textContent = 'Change Units';
  switchUnitsList.append(switchUnitsLink);
  const aboutList = document.createElement('li');
  const aboutLink = document.createElement('a');
  aboutLink.textContent = 'About';
  aboutList.append(aboutLink);
  menuList.append(switchUnitsList, aboutList);
  menu.append(menuList);
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
    if (localStorage.getItem('userPref')) {
      // logic to get pref state and set default vselected to true
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

  const rain = document.createElement('div');
  rain.classList.add('weather-data', 'rain');

  const wind = document.createElement('div');
  wind.classList.add('weather-data', 'wind');

  const humidity = document.createElement('div');
  humidity.classList.add('weather-data', 'humidity');

  main.append(temperatureContainer, graphic, rain, wind, humidity);

  const footer = document.createElement('footer');
  footer.textContent = 'Copyright \u00A9 2022 Konrad Starczak';

  document.querySelector('body').appendChild(content);
  content.append(header, navContainer, searchModal, main, footer);

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    menuButton.classList.toggle('menu-open');
  });
};

export default loadPage;
