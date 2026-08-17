import createTask from "./tasks.js";
import "./styles.css";

const mainContainer = document.querySelector("#content");
const addBtn = document.querySelector("#addTask");
const form = document.querySelector("#taskForm");
const cardDisplay = document.querySelector("#card-section")
const dateInput = document.querySelector('input[type="date"]');
const currentDay = new Date().toISOString().split("T")[0];

const modal = document.querySelector("#formModal");
const modalBtn = document.querySelector("#modalBtn");
const closeModal = document.querySelector("#resetBtn");
dateInput.setAttribute("min",currentDay);

function createCard(task) {
    const cardContainer = document.createElement("div");
    const deleteBtn = document.createElement("span");
    const cardTitle = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardName = document.createElement("h3");
    const cardDescription = document.createElement("p");
    const cardDueDate = document.createElement("p");
    const cardMainBody = document.createElement("div");
    const cardDeleteBody = document.createElement("div");
    cardContainer.dataset.id = task.taskId;
    deleteBtn.classList.add("material-symbols-outlined")
    deleteBtn.textContent = "delete";
    cardDeleteBody.classList.add("delete-button")
    cardDeleteBody.append(deleteBtn);
    cardName.textContent = task.taskName;
    cardDueDate.textContent = task.taskDate;
    cardDescription.textContent = task.taskDescription;
    cardDescription.classList.add("card-description")
    cardName.textContent = task.taskName;
    cardTitle.appendChild(cardName);
    cardBody.append(cardDescription, cardDueDate);
    cardMainBody.append(cardTitle,cardBody);
    cardContainer.append(cardMainBody, cardDeleteBody);
    cardContainer.classList.add(task.taskPriority, "card");
    deleteBtn.addEventListener("click", () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
         var deleteItem = tasks.filter(obj => {
             return obj.taskId === cardContainer.dataset.id
         })
         var idToDelete = deleteItem[0].taskId;
         const updatedTasks = tasksItem.filter(task => task.taskId !== idToDelete);
         localStorage.setItem("tasks", JSON.stringify(updatedTasks));
         cardContainer.remove();
         console.log(localStorage.getItem("tasks"))
     })
    return cardContainer;
}

const tasksItem = JSON.parse(localStorage.getItem("tasks")) || []; //displays the "saved" tasks
for(let i = tasksItem.length-1; i >= 0; i--) {
    cardDisplay.append(createCard(tasksItem[i]))
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const createdTask = createTask(form);
    const currentTask = createdTask[createdTask.length - 1];
    cardDisplay.prepend(createCard(currentTask));
    console.log(createdTask);
    modal.style.display = "none";
    form.reset();
})

modalBtn.addEventListener("click", () => {
    modal.style.display = "block";
})

closeModal.addEventListener("click", () => {
    form.reset();
    modal.style.display = "none";
})