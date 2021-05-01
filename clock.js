const clockContainer = document.querySelector(".js-clock");
const clockTile = clockContainer.querySelector(".js-title");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  clockTile.innerText = `${ hours < 10 ? `0${hours}` : hours }:${ minutes < 10 ? `0${minutes}` : minutes }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
