function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveGoals(goals) {
  setItemToLocalStorage("goals", goals);
}

function getButton(className1, className2, text) {
  const button = document.createElement("button");
  button.classList.add(className1);
  button.classList.add(className2);
  button.textContent = text;
  return button;
}

const divElement = document.createElement("div");
divElement.classList.add("container");

const inputElement = document.createElement("input");
inputElement.classList.add("input__item");
inputElement.placeholder = "Задача";
inputElement.type = "text";

const btnCreateGoal = getButton("button", "btn__main", "Создать задачу");

const goalsContainer = document.createElement("div");
goalsContainer.classList.add("container__goals");

const goals = getItemFromLocalStorage("goals") || []; // Получить сохраненные цели из localStorage

document.body.append(divElement);
document.body.append(inputElement);
document.body.append(btnCreateGoal);
document.body.append(goalsContainer);

// Функция для получения целей из визуальных блоков
function getGoals() {
  const goalItems = goalsContainer.querySelectorAll(".goal__item");
  const goalList = [];
  goalItems.forEach((goalItem) => {
    const textSpan = goalItem.querySelector("span");
    goalList.push(textSpan.textContent);
  });
  return goalList;
}

function createGoalElement(text) {
  const goalItem = document.createElement("div");
  goalItem.classList.add("goal__item");

  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  const btnDone = getButton("button", "btn__goal", "Выполнено");
  const btnChange = getButton("button", "btn__change", "Изменить");
  const btnDelete = getButton("button", "btn__change", "Удалить");

  goalsContainer.append(goalItem);
  goalItem.append(textSpan);
  goalItem.append(btnDone);
  goalItem.append(btnChange);
  goalItem.append(btnDelete);

  btnDone.onclick = () => {
    goalItem.classList.add("goal__item_done");
    btnDone.classList.add("hidden");
    btnChange.classList.add("hidden");
    saveGoals(getGoals()); // Сохранить обновленный массив целей в localStorage
  };

  btnChange.onclick = () => {
    // eslint-disable-next-line no-alert
    const newName = prompt("Переименуйте задачу", textSpan.textContent);
    textSpan.textContent = newName;
    saveGoals(getGoals()); // Сохранить обновленный массив целей в localStorage
  };

  btnDelete.onclick = () => {
    goalItem.remove();
    saveGoals(getGoals()); // Сохранить обновленный массив целей в localStorage
  };
}

// Отобразить ранее сохраненные цели
goals.forEach((goal) => {
  createGoalElement(goal);
});

function getNewGoal() {
  if (inputElement.value !== "") {
    const newGoal = inputElement.value;
    createGoalElement(newGoal);
    goals.push(newGoal); // Добавить новую цель в массив целей
    saveGoals(getGoals()); // Сохранить обновленный массив целей в localStorage
  }
  inputElement.value = "";
}

btnCreateGoal.onclick = getNewGoal;

function onKeyPress(e) {
  if (e.key === "Enter") {
    getNewGoal();
  }
}

inputElement.addEventListener("keypress", onKeyPress);
