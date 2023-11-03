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

const createGoalButton = createButton(["button", "btn__main"], "Создать задачу");

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
  const changeButton = createButton("change", ["button", "btn__change"], "Изменить");
  const deleteButton = createButton("delete", ["button", "btn__change"], "Удалить");

  goalsContainer.append(goalItem);
  goalItem.append(textSpan);
  goalItem.append(doneButton);
  goalItem.append(changeButton);
  goalItem.append(deleteButton);

  container.addEventListener("click", function (event) {
    const { type } = event.target.dataset;
    if (type === "done") {
      goalItem.classList.add("goal__item_done");
      doneButton.classList.add("hidden");
      changeButton.classList.add("hidden");
      saveGoals(); // Сохранить обновленный массив целей в localStorage
    }

    if (type === "change") {
      // eslint-disable-next-line no-alert
      const newName = prompt("Переименуйте задачу", textSpan.textContent);
      textSpan.textContent = newName;
      saveGoals(); // Сохранить обновленный массив целей в localStorage
    }

    if (type === "delete") {
      goalItem.remove();
      saveGoals(); // Сохранить обновленный массив целей в localStorage
    }
  });
}

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
