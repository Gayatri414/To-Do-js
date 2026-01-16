const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');
const modalCenter = document.querySelector('.modal-center');
const toggleModalBtn = document.querySelector('#toggle-modal');
const addTaskBtn = document.querySelector('#add-task-btn');

let draggedTask = null;

/* DRAG LOGIC */
function makeTaskDraggable(task) {
  task.addEventListener('dragstart', () => {
    draggedTask = task;
    task.classList.add('dragging');
  });

  task.addEventListener('dragend', () => {
    draggedTask = null;
    task.classList.remove('dragging');
  });
}

document.querySelectorAll('.task').forEach(makeTaskDraggable);

/* COLUMN DROP */
[todo, progress, done].forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault();
    column.classList.add('hover-over');
  });

  column.addEventListener('dragleave', () => {
    column.classList.remove('hover-over');
  });

  column.addEventListener('drop', () => {
    column.classList.remove('hover-over');
    if (draggedTask) column.appendChild(draggedTask);
  });
});

/* MODAL OPEN */
toggleModalBtn.addEventListener('click', () => {
  modal.classList.add('active');
});

/* MODAL CLOSE */
modalBg.addEventListener('click', () => {
  modal.classList.remove('active');
});

/* PREVENT CLOSE WHEN CLICKING INSIDE */
modalCenter.addEventListener('click', e => {
  e.stopPropagation();
});

/* ADD TASK */
// ... existing code ...

/* ADD TASK */
addTaskBtn.addEventListener('click', () => {
  const titleInput = document.querySelector('#task-title-input');
  const descInput = document.querySelector('#task-desc-input');
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title) return alert("Title required");

  const task = document.createElement('div');
  task.className = 'task';
  task.setAttribute('draggable', true);
  task.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button class="delete-btn">Delete</button>
  `;

  todo.appendChild(task);
  makeTaskDraggable(task);
  
  // Add delete functionality to the new task
  const deleteBtn = task.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    task.remove();
    updateTaskCounts();
  });

  // Clear inputs
  titleInput.value = '';
  descInput.value = '';

  // Update task counts
  updateTaskCounts();

  modal.classList.remove('active');
});

/* UPDATE TASK COUNTS */
function updateTaskCounts() {
  document.querySelector('#todo .heading div:last-child').textContent = 
    document.querySelectorAll('#todo .task').length;
  document.querySelector('#progress .heading div:last-child').textContent = 
    document.querySelectorAll('#progress .task').length;
  document.querySelector('#done .heading div:last-child').textContent = 
    document.querySelectorAll('#done .task').length;
}

/* DELETE BUTTON FUNCTIONALITY FOR EXISTING TASKS */
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.task').remove();
    updateTaskCounts();
  });
});

// Update counts on drag and drop
[todo, progress, done].forEach(column => {
  column.addEventListener('drop', () => {
    column.classList.remove('hover-over');
    if (draggedTask) {
      column.appendChild(draggedTask);
      updateTaskCounts();
    }
  });
});
