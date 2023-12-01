// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const count = document.getElementById("count");

// Event listener for "Enter" key press on the input field
taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event listener for the "Add" button click
addBtn.addEventListener("click", addTask);

// Function to add a new task
function addTask() {
    // Trim and validate input
    const taskText = taskInput.value.trim();
    if (!taskText) return; // Input validation for empty tasks

    // Create a new task element
    const taskItem = createTaskElement(taskText);

    // Append the task element to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = "";

    // Update the task count
    updateTaskCount();
}

// Function to create a new task element
function createTaskElement(taskText) {
    const taskItem = document.createElement("li");
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.classList.add("task-checkbox");
    taskCheckbox.addEventListener("change", toggleTaskCompleted);

    const taskTextSpan = document.createElement("span");
    taskTextSpan.classList.add("task-text");
    taskTextSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTask);

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

// Function to delete a task
function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
    updateTaskCount();
}

// Function to toggle task completion status
function toggleTaskCompleted(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle("completed");
}

// Function to update the task count
function updateTaskCount() {
    const tasks = taskList.getElementsByTagName("li");
    count.textContent = tasks.length;
}

// Function to filter tasks based on completion status
function filterTasks(filterType) {
    const tasks = taskList.getElementsByTagName("li");

    for (const task of tasks) {
        switch (filterType) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'uncompleted':
                task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            default:
                break;
        }
    }
}

// Initial rendering
renderTodoList();

// Display all tasks by default
filterTasks('all');