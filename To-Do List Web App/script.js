let currentFilter = 'all';

function addTask() {
  const text = document.getElementById("taskText").value.trim();
  const time = document.getElementById("taskTime").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;

  if (!text) return;

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.status = "active";
  taskDiv.dataset.priority = priority;

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `
    <strong>${text}</strong>
    <small>${time || "No deadline"}</small><br>
    ${category ? `<span class="category-tag">${category}</span>` : ""}
  `;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.onclick = () => {
    info.classList.toggle("completed");
    taskDiv.dataset.status = info.classList.contains("completed") ? "completed" : "active";
    filterTasks(currentFilter);
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.onclick = () => {
    const newText = prompt("Edit task", text);
    if (newText) info.querySelector("strong").textContent = newText;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.onclick = () => taskDiv.remove();

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  taskDiv.appendChild(info);
  taskDiv.appendChild(actions);

  document.getElementById("taskList").appendChild(taskDiv);
  clearInputs();
  filterTasks(currentFilter);
}

function clearInputs() {
  document.getElementById("taskText").value = "";
  document.getElementById("taskTime").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("category").value = "";
}

function filterTasks(status) {
  currentFilter = status;
  const allTasks = document.querySelectorAll(".task");
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.filter-btn[onclick*="${status}"]`).classList.add("active");

  allTasks.forEach(task => {
    const isCompleted = task.dataset.status === "completed";
    if (
      status === "all" ||
      (status === "active" && !isCompleted) ||
      (status === "completed" && isCompleted)
    ) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".task").forEach(task => {
    const taskText = task.querySelector("strong").textContent.toLowerCase();
    task.style.display = taskText.includes(query) ? "flex" : "none";
  });
}