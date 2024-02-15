document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.classList.add('task-item');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function () {
                toggleTaskCompletion(index);
            });

            const span = document.createElement('span');
            span.textContent = task.name;
            if (task.completed) {
                span.classList.add('completed');
            }

            const editButton = document.createElement('button');
            editButton.textContent = '✎';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', function () {
                editTask(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function () {
                deleteTask(index);
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    // Add new task
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    // Edit task
    function editTask(index) {
        const newName = prompt('Edit task:', tasks[index].name);
        if (newName !== null) {
            tasks[index].name = newName.trim();
            saveTasks();
            renderTasks();
        }
    }

    // Toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
