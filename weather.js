const temperature = document.querySelector(".weather-box__temp");
const city = document.querySelector(".weather-box__city");
const weather = document.querySelector(".weather-box__weather");

const API_KYE = "fc9fe0e75d49d984ba3cfce640d1e05f";
const COORDS = "coords";

const weatherIcon = {
  Rain: {
    className: "fa-cloud-rain"
  },
  Snow: {
    className: "fa-snowflake"
  },
  Mist: {
    className: "fa-smog"
  },
  Squall: {
    className: "fa-cloud-showers-heavy"
  },
  Clear: {
    className: "fa-sun"
  },
  Clouds: {
    className: "fa-cloud"
  }
}

function getIcon(state) {
  const i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add(weatherIcon[state].className);
  weather.appendChild(i);
}

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KYE}&units=metric`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const temp = Math.ceil(json.main.temp);
    const place = json.name;
    const state = json.weather[0].main;
    temperature.innerText = `${temp}°`;
    city.innerText = place;
    if(weatherIcon[state] != undefined) {
      getIcon(state);
    } else {
      weather.innerText = state;
    }
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

// kaka 수정 error
function handleGeoError(position) {}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
