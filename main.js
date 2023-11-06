function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function createButton(type, classNames, text) {
  const button = document.createElement("button");
  button.setAttribute("data-type", type);
  button.classList.add(...classNames);
  button.textContent = text;
  return button;
}

const container = document.createElement("div");
container.classList.add("container");

const goalInput = document.createElement("input");
goalInput.classList.add("input__item");
goalInput.placeholder = "Задача";
goalInput.type = "text";

const createGoalButton = createButton(
  "goal",
  ["button", "btn__main"],
  "Создать задачу"
);

const goalsContainer = document.createElement("div");
goalsContainer.classList.add("container__goals");

const goals = getItemFromLocalStorage("goals") || []; // Получить сохраненные цели из localStorage

document.body.append(container);
document.body.append(goalInput);
document.body.append(createGoalButton);
document.body.append(goalsContainer);

// Функция для получения целей из визуальных блоков
function getGoals() {
  const goalItems = goalsContainer.querySelectorAll(".goal__item > span");
  return [...goalItems].map((goalItem) => goalItem.textContent);
}

function saveGoals() {
  setItemToLocalStorage("goals", getGoals());
}

function createGoalElement(text) {
  const goalItem = document.createElement("div");
  goalItem.classList.add("goal__item");

  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  const doneButton = createButton("done", ["button", "btn__goal"], "Выполнено");
  const changeButton = createButton(
    "change",
    ["button", "btn__change"],
    "Изменить"
  );
  const deleteButton = createButton(
    "delete",
    ["button", "btn__delete"],
    "Удалить"
  );

  goalItem.append(textSpan);
  goalItem.append(doneButton);
  goalItem.append(changeButton);
  goalItem.append(deleteButton);

  goalsContainer.append(goalItem);
}

function pressDoneBtn(event) {
  const goalItem = event.target.parentElement;
  goalItem.classList.add("goal__item_done");

  const doneButton = event.target;
  doneButton.classList.add(["hidden"]);
  
  const changeButton = event.target.nextSibling;
  changeButton.classList.add(["hidden"]);

  saveGoals(); // Сохранить обновленный массив целей в localStorage
}

// console.log(pressDoneBtn(event));

function pressChangeBtn(event) {
  const goalItem = event.target.parentElement;
  const textSpan = goalItem.firstChild;

  // eslint-disable-next-line no-alert
  const newName = prompt("Переименуйте задачу", textSpan.textContent);
  if (newName) {
    textSpan.textContent = newName;
    saveGoals(); // Сохранить обновленный массив целей в localStorage
  }
}

function pressDeleteBtn(event) {
  const goalItem = event.target.parentElement;
  goalItem.remove();
  saveGoals(); // Сохранить обновленный массив целей в localStorage
}

goalsContainer.addEventListener("click", (event) => {
  const { type } = event.target.dataset;

  if (type === "done") {
    pressDoneBtn(event);
  }

  if (type === "change") {
    pressChangeBtn(event);
  }

  if (type === "delete") {
    pressDeleteBtn(event);
  }
});

// Отобразить ранее сохраненные цели
goals.forEach((goal) => {
  createGoalElement(goal);
});

function getNewGoal() {
  if (goalInput.value !== "") {
    const newGoal = goalInput.value;
    createGoalElement(newGoal);
    goals.push(newGoal); // Добавить новую цель в массив целей
    saveGoals(); // Сохранить обновленный массив целей в localStorage
  }
  goalInput.value = "";
}

createGoalButton.onclick = getNewGoal;

function onKeyPress(e) {
  if (e.key === "Enter") {
    getNewGoal();
  }
}

goalInput.addEventListener("keypress", onKeyPress);
