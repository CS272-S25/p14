// use localStorage to keep track of the goals list

document.addEventListener("DOMContentLoaded", function () {
    const savedGoals = JSON.parse(localStorage.getItem("goalsList")) || [];
    savedGoals.forEach(addGoalToTable);
});

document.getElementById("goals-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const goal = document.getElementById("input-goal").value;
    const type = document.getElementById("input-goal-type").value;

    if (!goal || !type) {
        alert("Please fill out all fields.");
        return;
    }

    const newGoal = { goal, type};
    const goalList = JSON.parse(localStorage.getItem("goalsList")) || [];
    goalList.push(newGoal);
    localStorage.setItem("goalsList", JSON.stringify(goalList));
    addGoalToTable(newGoal);
    event.target.reset();
});

function addGoalToTable(goalObj) {
    const newRow = document.createElement("tr");

    const goalCell = document.createElement("th");
    goalCell.textContent = goalObj.goal;

    const deadlineCell = document.createElement("td");
    deadlineCell.classList.add("align-middle");
    deadlineCell.textContent = goalObj.deadline;

    const actionCell = document.createElement("td");
    actionCell.classList.add("align-middle");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("btn", "btn-outline-success", "btn-sm", "me-2");

    completeBtn.addEventListener("click", function () {
        let completedTaskList = JSON.parse(localStorage.getItem("completedTaskList")) || [];
        if (!completedTaskList.includes(goalObj.goal)) {
            completeTask(document.getElementById("goal-tbody"), newRow);
            completedTaskList.push(goalObj.goal);
            localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList));
        }
    });

    let completedTaskList = JSON.parse(localStorage.getItem("completedTaskList")) || [];
    if (completedTaskList.includes(goalObj.goal)) {
        completeTask(document.getElementById("goal-tbody"), newRow);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✘";
    deleteBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
    deleteBtn.addEventListener("click", function () {
        deleteGoal(goalObj, newRow);
    });

    actionCell.appendChild(completeBtn);
    actionCell.appendChild(deleteBtn);

    newRow.appendChild(goalCell);
    newRow.appendChild(deadlineCell);
    newRow.appendChild(actionCell);

    document.getElementById("goal-tbody").appendChild(newRow);
}

function completeTask(tbody, row) {
    row.style.opacity = "0.4";
    tbody.appendChild(row);
}

function deleteGoal(taskObj, row) {
    row.remove();
    let taskList = JSON.parse(localStorage.getItem("goalsList")) || [];
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
    localStorage.setItem("goalsList", JSON.stringify(taskList));
    localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList));
}
