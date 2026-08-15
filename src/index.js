import createTask from "./tasks.js";
const mainContainer = document.querySelector("#content");
const addBtn = document.querySelector("#addTask");
const form = document.querySelector("#taskForm");
const cardDisplay = document.querySelector("#card-section")
const dateInput = document.querySelector('input[type="date"]');
const currentDay = new Date().toISOString().split("T")[0];
const tasksItem = JSON.parse(localStorage.getItem("tasks")) || [];
dateInput.setAttribute("min",currentDay);

function createCard(task) {
    const cardContainer = document.createElement("div");
    const cardTitle = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardName = document.createElement("h3");
    const cardDescription = document.createElement("p");
    const cardDueDate = document.createElement("p");
    const cardPriority = document.createElement("p");
    cardName.textContent = task.taskName;
    cardPriority.textContent = task.taskPrio;
    cardDueDate.textContent = task.taskDate;
    cardDescription.textContent = task.taskDescription;
    cardName.textContent = task.taskName;
    cardTitle.appendChild(cardName);
    cardBody.append(cardDescription, cardDueDate, cardPriority);
    cardContainer.append(cardTitle, cardBody);
    cardContainer.classList.add(task.taskPrio, "card");
    return cardContainer;
}

for(let i = tasksItem.length-1; i > 0; i--) {
    cardDisplay.append(createCard(tasksItem[i]))
}

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const createdTask = createTask(form);
    const currentTask = createdTask[createdTask.length - 1];
    cardDisplay.prepend(createCard(currentTask));
    console.log(createdTask);
    form.reset();
})