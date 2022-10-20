/* ToDo: Add function to get select day or night icons
function dayOrNight(sunrise, sunset) {
  const currentTime = new Date();
  if (currentTime > sunrise && currentTime <)
} */

const getUserPrefUnits = () => {
  let units;
  if (localStorage.getItem('userPref')) {
    // logic to get units
  } else {
    units = 'imperial';
  }
  return units;
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

  const temperature = document.querySelector('.temperature');
  const loHi = document.querySelector('.lohi');
  const graphic = document.querySelector('.graphic');
  const rain = document.querySelector('.rain');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const temp = Math.round(tempData.main.temp);
  const lowTemp = Math.round(tempData.main.temp_min);
  const hiTemp = Math.round(tempData.main.temp_max);
  const windSpeed = Math.round(tempData.wind.speed);
  const windDeg = tempData.wind.deg;
  const humidityPercentage = tempData.main.humidity;
  temperature.textContent = `${temp} \u00B0 ${tempUnit}`;
  loHi.textContent = `LO: ${lowTemp} \u00B0 ${tempUnit} || HI: ${hiTemp} \u00B0 ${tempUnit}`;
  rain.textContent = 'PLACEHOLDER FOR RAIN';
  wind.textContent = `${windSpeed} ${speedUnit} winds`;
  humidity.textContent = `${humidityPercentage} %`;

  // API conditions return a numerical value that corresponds to weather conditons
  // such as rain, snow, etc. see list at https://openweathermap.org/current#list
  const currentConditions = data.weather[0];
  const currentConditionsMain = currentConditions.main;
  graphic.textContent = currentConditionsMain;
};

export { updatePage, getUserPrefUnits };
