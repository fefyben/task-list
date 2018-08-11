// Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Call function - Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task event
  form.addEventListener('submit', addTask);

  // Remove Task event
  taskList.addEventListener('click', removeTask);

  // Clear Tasks event
  clearBtn.addEventListener('click', clearTasks);

  // Filter Tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create Element <li>
    const li = document.createElement('li');
    // Add class on <li>
    li.className = 'collection-item';
    // Create text for <li>
    li.appendChild(document.createTextNode(task));

    // Create remove link
    const link = document.createElement('a');
    // Add materialize classes to <a>
    link.className = 'delete-item secondary-content';
    link.style.marginRight = '0';
    // Creat icon html inside <a>
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append link inside the <li>
    li.appendChild(link);

    // Append <li> to collection element
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e){

  // if(taskInput.value === '') {
  //   alert('Add a task');
  // }

  // Create Element <li>
  const li = document.createElement('li');
  // Add class on <li>
  li.className = 'collection-item';
  // Create text for <li>
  li.appendChild(document.createTextNode(taskInput.value));

  // Create remove link
  const link = document.createElement('a');
  // Add materialize classes to <a>
  link.className = 'delete-item secondary-content';
  link.style.marginRight = '0';
  // Creat icon html inside <a>
  link.innerHTML = '<i class="fas fa-times"></i>';
  // Append link inside the <li>
  li.appendChild(link);

  // Append <li> to collection element
  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove Task from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {

  // taskList.innerHTML = '';

  // Faster way to do that - https://jsperf.com/innerhtml-vs-removechild
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from LocalStorage
  clearTasksFromLocalStorage();
}

// Clear Tasks from LocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  // console.log('oi');
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}