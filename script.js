const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);

// Add Task
function addTask() {
  if (taskInput.value === "") return;

  let task = {
    text: taskInput.value,
    deadline: deadlineInput.value,
    completed: false
  };

  saveTask(task);
  renderTasks();

  taskInput.value = "";
  deadlineInput.value = "";
}

// Save task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <span class="deadline">${task.deadline ? "⏰ " + task.deadline : ""}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// Toggle completed
function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Filter tasks
function filterTasks() {
  let filterValue = filter.value;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let filtered = tasks.filter(task => {
    if (filterValue === "completed") return task.completed;
    if (filterValue === "pending") return !task.completed;
    return true;
  });
  displayFiltered(filtered);
}

function displayFiltered(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <span class="deadline">${task.deadline ? "⏰ " + task.deadline : ""}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// Search tasks
function searchTask() {
  let searchValue = document.getElementById("searchInput").value.toLowerCase();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let searched = tasks.filter(task => task.text.toLowerCase().includes(searchValue));
  displayFiltered(searched);
}
