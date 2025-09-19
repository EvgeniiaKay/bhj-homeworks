const form = document.getElementById('tasks__form');
const input = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

function createTask(text) {
  const task = document.createElement('div');
  task.classList.add('task');

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task__title');
  taskTitle.textContent = text;

  const taskRemove = document.createElement('a');
  taskRemove.classList.add('task__remove');
  taskRemove.href = '#';
  taskRemove.innerHTML = '&times;';

  taskRemove.addEventListener('click', (e) => {
    e.preventDefault();
    task.remove();
    saveTasks();
  });

  task.appendChild(taskTitle);
  task.appendChild(taskRemove);
  tasksList.appendChild(task);
}

function saveTasks() {
  const tasks = Array.from(tasksList.querySelectorAll('.task__title')).map(title => title.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach(text => createTask(text));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text) {
    createTask(text);
    saveTasks();
    input.value = '';
  }
});

document.addEventListener('DOMContentLoaded', loadTasks);