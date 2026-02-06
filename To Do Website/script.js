function showAddWidget() {
    document.getElementById("overlay").style.display = "flex";
}

function hideAddWidget() {
    document.getElementById("overlay").style.display = "none";
}

document.getElementById('date').valueAsDate = new Date();

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';
        document.getElementById("overlay").style.display = "none";
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addTask(e);
        }
    })
})