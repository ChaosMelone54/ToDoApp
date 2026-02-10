//Set date combobox to current date
document.getElementById("date").valueAsDate = new Date();

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const priorityInput = document.getElementById("priority");
    const dateInput = document.getElementById("date");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById("progress");
    const progressNumbers = document.getElementById("numbers");
    const listoverlay = document.getElementById("list");
    const addListBtn = document.getElementById("addListBtn");
    const listInput = document.getElementById("list-input");
    const listContainer = document.getElementById("list-container");
    const toggleDarkModeBtn = document.getElementById("ToogleDarkMode");
    const forwardBtn = document.getElementById("Forwardbtn");
    const backwardBtn = document.getElementById("backwardbtn");

    forwardBtn.addEventListener("click", function() {
        event.preventDefault();
        var ul = document.getElementById("task-list");
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    });

    backwardBtn.addEventListener("click", function() {
        event.preventDefault();
        var ul = document.getElementById("task-list");
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    });

    toggleDarkModeBtn.addEventListener("click", function() {
        event.preventDefault();
        document.body.classList.toggle("dark-mode");
    });

    const addList = (event) => {
        const listName = listInput.value.trim();
        if(!listName) {
            return;
        }
        const li = document.createElement("li");
        li.textContent = listName;
        listContainer.appendChild(li);
        listInput.value = "";
    }

    addListBtn.addEventListener("click", addList);
    listInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter")
        {
            event.preventDefault();
            addList(e);
        }
    })

    listoverlay.addEventListener("click", function(e) {
        if(e.target === this) {
            this.style.display = "none";
        }
    })

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '25%';
    };

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll(".checkbox:checked").length;
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) *100}%` : "0%";
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
            Confetti();
        };
    };

    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll("li")).map(li => ({
            text: li.querySelector("span").textContent,
            completed: li.querySelector(".checkbox").checked,
            
    }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(({ text, completed}) => addTask(text, completed, false));
        document.getElementById("morelist").textContent = savedTasks.JSON.key;
        toggleEmptyState();
        updateProgress();
    }

    const addTask = (text, completed = false) => {
        const taskText = text || taskInput.value.trim();
        const prioText = priorityInput.value.trim();
        const dateText = dateInput.value.trim();
        if(!taskText)
        {
            return;
        };

        const li = document.createElement("li")
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span>${taskText}</span>
        <p>${prioText}</p>
        <p>${dateText}</p>
        <div class="task-buttons">
            <button class="edit-btn"><img src="edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"></button>
            <button class="delete-btn"><img src="delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox')
        const editBtn = li.querySelector('.edit-btn');

        if(completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
            saveTaskToLocalStorage();
        });

        editBtn.addEventListener("click", () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
                saveTaskToLocalStorage();
            }
        })

        li.querySelector('.delete-btn').addEventListener("click", () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
            saveTaskToLocalStorage();
        });

        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
        updateProgress();
        saveTaskToLocalStorage();
    };

    addTaskBtn.addEventListener("click", () => {
        event.preventDefault();
        addTask()
    });
    taskInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            addTask();
        }
    });

    loadTasksFromLocalStorage();
})

const Confetti = () => {
    const count = 200,
  defaults = {origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

function showAddList() {
    document.getElementById("list").style.display = "flex";
}

function HideAddList() {
    document.getElementById("list").style.display = "none";
}