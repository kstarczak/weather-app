/* ToDo: Add function to get select day or night icons
function dayOrNight(sunrise, sunset) {
  const currentTime = new Date();
  if (currentTime > sunrise && currentTime <)
} */

const getUserPrefUnits = () => {
  let units;
  if (localStorage.getItem('userPrefUnits')) {
    units = localStorage.getItem('userPrefUnits');
  } else {
    units = 'imperial';
  }
  return units;
};

const updatePrefUnits = (e) => {
  const prefUnits = e.target.id;
  localStorage.setItem('userPrefUnits', prefUnits);
  console.log(prefUnits);
};

const updatePrefState = (prefState) => {
  localStorage.setItem('userPrefState', prefState);
};

const updatePage = (data) => {
  const tempData = data;
  const units = getUserPrefUnits();
  let tempUnit;
  let speedUnit;
  if (units === 'metric') {
    tempUnit = 'C';
    speedUnit = 'm/sec';
  } else {
    tempUnit = 'F';
    speedUnit = 'mph';
  }

  const temperatureContainer = document.querySelector('.temperature-container');
  const temperature = document.querySelector('.temperature');
  const loHi = document.querySelector('.lohi');
  const graphicIcon = document.querySelector('#graphic-icon');
  const graphicDesc = document.querySelector('.graphic-desc');
  const details = document.querySelector('.details');
  const windDesc = document.querySelector('.wind-desc');
  const windArrow = document.querySelector('.wind-arrow');
  const humidity = document.querySelector('.humidity');
  const temp = Math.round(tempData.main.temp);
  const lowTemp = Math.round(tempData.main.temp_min);
  const hiTemp = Math.round(tempData.main.temp_max);
  const windSpeed = Math.round(tempData.wind.speed);
  const windDeg = tempData.wind.deg;
  const humidityPercentage = tempData.main.humidity;

  // API conditions return a numerical value that corresponds to weather conditons
  // such as rain, snow, etc. see list at https://openweathermap.org/current#list
  function getGraphicClass(conditionCode) {
    let graphicClass;
    if (conditionCode < 300) {
      graphicClass = 'thunderstorm'
    } else if (conditionCode < 600) {
      graphicClass = 'raining';
    } else if (conditionCode < 700) {
      graphicClass = 'snow';
    } else if (conditionCode < 800) {
      graphicClass = 'atmosphere';
    } else if (conditionCode === 800) {
      graphicClass = 'clear';
    } else {
      graphicClass = 'clouds';
    }
    return graphicClass;
  }

  function getTempColor(tempInput, unitsInput) {
    let currentTemp;
    let colorCode;
    if (unitsInput === 'C') {
      currentTemp = Math.round((tempInput * (9 / 5)) + 32);
    } else {
      currentTemp = tempInput;
    }
    if (currentTemp > 84) {
      // red
      colorCode = '#c42115';
    } else if (currentTemp > 74) {
      // orange
      colorCode = '#f88429';
    } else if (currentTemp > 64) {
      // yellow
      colorCode = '#ffe935';
    } else if (currentTemp > 49) {
      // green
      colorCode = '#30c320';
    } else if (currentTemp > 34) {
      // blue
      colorCode = '#2053b1';
    } else {
      // purple
      colorCode = '#7631af';
    }
    return colorCode;
  }

  const currentConditions = data.weather[0];
  const currentConditionsMain = currentConditions.main;
  const currentConditionsId = currentConditions.id;
  const currentConditionsDetailed = currentConditions.description;
  const graphicClass = getGraphicClass(currentConditionsId);
  const tempColor = getTempColor(temp, tempUnit);
  const corrrectedArrowRotatation = windDeg - 45;

  temperatureContainer.style.backgroundColor = tempColor;
  temperature.textContent = `${temp} \u00B0 ${tempUnit}`;
  loHi.textContent = `LO: ${lowTemp} \u00B0 ${tempUnit} || HI: ${hiTemp} \u00B0 ${tempUnit}`;
  graphicIcon.className = graphicClass;
  graphicDesc.textContent = currentConditionsMain;
  details.textContent = currentConditionsDetailed;
  windDesc.textContent = `${windSpeed} ${speedUnit} winds`;
  windArrow.style.transform = `rotate(${corrrectedArrowRotatation}deg)`;
  humidity.textContent = `${humidityPercentage}% humidity`;
};

const hideWeatherData = () => {
  const weatherData = document.querySelector('.main');
  weatherData.style.display = 'none';
};

const displayWeatherData = () => {
  const weatherData = document.querySelector('.main');
  weatherData.style.display = 'grid';
};

export {
  updatePage, hideWeatherData, displayWeatherData,
  getUserPrefUnits, updatePrefState, updatePrefUnits,
};
