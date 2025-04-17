// use localStorage to keep track of the to-do list

document.addEventListener("DOMContentLoaded", function () {
    const savedTasks = JSON.parse(localStorage.getItem("todoList")) || [];
    savedTasks.forEach(addTaskToTable);
  });
  
document.getElementById("todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const task = document.getElementById("input-todo-item").value;
    const deadline = document.getElementById("input-todo-deadline").value;
    const time = document.getElementById("input-todo-estimated-time").value;
    const importance = document.getElementById("input-todo-importance").value;
    const urgency = document.getElementById("input-todo-urgency").value;
  
    if (!task || !deadline || !time || !importance || !urgency) {
      alert("Please fill out all fields.");
      return;
    }
  
    const newTask = { task, deadline, time, importance, urgency };
    const taskList = JSON.parse(localStorage.getItem("todoList")) || [];
    taskList.push(newTask);
    localStorage.setItem("todoList", JSON.stringify(taskList));
    addTaskToTable(newTask);
    event.target.reset();
  });
  
function addTaskToTable(taskObj) {
    const newRow = document.createElement("tr");
    
    const taskCell = document.createElement("th");
    taskCell.textContent = taskObj.task;
  
    const deadlineCell = document.createElement("td");
    deadlineCell.classList.add("align-middle");
    deadlineCell.textContent = taskObj.deadline;
  
    const timeCell = document.createElement("td");
    timeCell.classList.add("align-middle");
    timeCell.textContent = taskObj.time;
  
    const importanceCell = document.createElement("td");
    importanceCell.classList.add("align-middle");
    
    if (taskObj.importance === "Low") {
      const star1 = document.createElement("i");
      star1.classList.add("bi", "bi-star-fill");
      const star2 = document.createElement("i");
      star2.classList.add("bi", "bi-star");
      const star3 = document.createElement("i");
      star3.classList.add("bi", "bi-star");
    
      importanceCell.appendChild(star1);
      importanceCell.appendChild(star2);
      importanceCell.appendChild(star3);
    }
    
    if (taskObj.importance === "Medium") {
      const star1 = document.createElement("i");
      star1.classList.add("bi", "bi-star-fill");
      const star2 = document.createElement("i");
      star2.classList.add("bi", "bi-star-fill");
      const star3 = document.createElement("i");
      star3.classList.add("bi", "bi-star");
    
      importanceCell.appendChild(star1);
      importanceCell.appendChild(star2);
      importanceCell.appendChild(star3);
    }
    
    if (taskObj.importance === "High") {
      const star1 = document.createElement("i");
      star1.classList.add("bi", "bi-star-fill");
      const star2 = document.createElement("i");
      star2.classList.add("bi", "bi-star-fill");
      const star3 = document.createElement("i");
      star3.classList.add("bi", "bi-star-fill");
    
      importanceCell.appendChild(star1);
      importanceCell.appendChild(star2);
      importanceCell.appendChild(star3);
    }
    
    const urgencyCell = document.createElement("td");
    urgencyCell.classList.add("align-middle");  
    const urgencyBadge = document.createElement("span");
    urgencyBadge.classList.add("badge");
    
    if (taskObj.urgency === "Low") {
      urgencyBadge.classList.add("bg-success");
      urgencyBadge.textContent = "Low priority";
    } else if (taskObj.urgency === "Medium") {
      urgencyBadge.classList.add("bg-warning", "text-dark");
      urgencyBadge.textContent = "Medium priority";
    } else if (taskObj.urgency === "High") {
      urgencyBadge.classList.add("bg-danger");
      urgencyBadge.textContent = "High priority";
    }
    
    urgencyCell.appendChild(urgencyBadge);
     
    const actionCell = document.createElement("td");
    actionCell.classList.add("align-middle");
  
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("btn", "btn-outline-success", "btn-sm", "me-2");

    completeBtn.addEventListener("click", function () {
        let completedTaskList = JSON.parse(localStorage.getItem("completedTaskList")) || [];
        if (!completedTaskList.includes(taskObj.task)) {
            completeTask(document.getElementById("todo-tbody"), newRow);
            completedTaskList.push(taskObj.task);
            localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList));
        }
    });

    let completedTaskList = JSON.parse(localStorage.getItem("completedTaskList")) || [];
    if (completedTaskList.includes(taskObj.task)) {
        completeTask(document.getElementById("todo-tbody"), newRow);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✘";
    deleteBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
    deleteBtn.addEventListener("click", function () {
      deleteTask(taskObj, newRow);
    });
  
    actionCell.appendChild(completeBtn);
    actionCell.appendChild(deleteBtn);

    newRow.appendChild(taskCell);
    newRow.appendChild(deadlineCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(importanceCell);
    newRow.appendChild(urgencyCell);
    newRow.appendChild(actionCell);
  
    document.getElementById("todo-tbody").appendChild(newRow);
  }

function completeTask(tbody, row) {
    row.style.opacity = "0.4";
    tbody.appendChild(row);
}
  
function deleteTask(taskObj, row) {
    row.remove();
    let taskList = JSON.parse(localStorage.getItem("todoList")) || [];
    let completedTaskList = JSON.parse(localStorage.getItem("completedTaskList")) || [];
    taskList = taskList.filter(t =>
      !(t.task === taskObj.task &&
        t.deadline === taskObj.deadline &&
        t.time === taskObj.time &&
        t.importance === taskObj.importance &&
        t.urgency === taskObj.urgency)
    );
    completedTaskList = completedTaskList.filter(t =>
        !(t === taskObj.task)
      );
    localStorage.setItem("todoList", JSON.stringify(taskList));
    localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList));
  }
