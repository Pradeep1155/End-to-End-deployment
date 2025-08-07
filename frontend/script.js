const apiUrl = "http://localhost:3000/tasks";

async function fetchTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = async () => {
      await fetch(`${apiUrl}/${task._id}`, { method: "DELETE" });
      fetchTasks(); // Refresh task list
    };

    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
}

async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: taskText }),
  });

  taskInput.value = "";
  fetchTasks();
}

// Load tasks on page load
window.onload = fetchTasks;
