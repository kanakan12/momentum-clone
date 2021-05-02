const form = document.querySelector(".greeting-box__form");
const span = form.querySelector("span");
const input = form.querySelector("input");
const title = document.querySelector(".greeting-box__title");
const icon = document.querySelector(".greeting-box__icon");

const USER_LS = "currentUser";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
  input.value = "";
}

function askForName() {
  span.removeAttribute("hidden");
  input.removeAttribute("hidden");
  title.setAttribute("hidden", true);
  icon.setAttribute("hidden", true);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  const date = new Date();
  const hour = date.getHours();
  span.setAttribute("hidden", true);
  input.setAttribute("hidden", true);
  icon.removeAttribute("hidden");
  title.removeAttribute("hidden");

  if(hour >= 6 && hour <= 11) {
    title.innerText = `Good morning, ${text}`;
  } else if(hour >= 12 && hour <= 17) {
    title.innerText = `Good afternoon, ${text}`;
  } else if(hour >= 18 && hour <= 22) {
    title.innerText = `Good evening, ${text}`;
  } else {
    title.innerText = `Good night, ${text}`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  console.log(currentUser);
  if (currentUser == null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function handleEdit() {
  localStorage.removeItem(USER_LS);
  loadName();
}

function init() {
  loadName();
  icon.addEventListener("click", handleEdit);
}

init();
