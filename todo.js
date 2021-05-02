const toDoForm = document.querySelector(".toDo-box__form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDo-box__list");
const toDoAllDelete = document.querySelector(".toDo-box__icon");

const TODOS_LS = "toDos";

let toDos = [];

function checkDB() {
  const db = loadedtoDos = localStorage.getItem(TODOS_LS);
  if(db != "[]" && db != null) {
    toDoAllDelete.removeAttribute("hidden");
  } else {
    toDoAllDelete.setAttribute("hidden", true);
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id != parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  checkDB();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delIcon = document.createElement("i");
  const span = document.createElement("span");
  const id = Date.now() + Math.floor(Math.random() * 100000);

  delIcon.classList.add("fas");
  delIcon.classList.add("fa-times");
  delIcon.addEventListener("click", deleteToDo);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delIcon);
  li.id = id;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: id,
  };

  toDos.push(toDoObj);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  saveToDos();
  toDoInput.value = "";
}

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos != "[]" && loadedtoDos != null) {
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  checkDB();
}

function handleAllDelete() {
  console.log(toDoList);
  toDos.forEach(function(toDo) {
    const li = document.getElementById(toDo.id);
    toDoList.removeChild(li);
  });
  localStorage.removeItem(TODOS_LS);
  toDos = [];
  saveToDos();
  checkDB();
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
  toDoAllDelete.addEventListener("click", handleAllDelete);
}
init();
