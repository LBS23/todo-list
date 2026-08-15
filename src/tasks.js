class Task {
    constructor(taskName, taskDescription, taskDate, taskPriority) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskDate = taskDate;
        this.taskPriority = taskPriority;
        this.taskId = crypto.randomUUID();
    };
}
export default function createTask(form) {
    const task = new Task(form.taskName.value, form.taskDescription.value, form.taskDate.value, form.taskPrio.value)
    const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    return tasksArray;
}

