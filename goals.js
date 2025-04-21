// use localStorage to keep track of the goals list

document.addEventListener("DOMContentLoaded", function () {
    const savedGoals = JSON.parse(localStorage.getItem("goalsList")) || [];
    savedGoals.forEach(addGoalToTable);
});

document.getElementById("goals-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const goal = document.getElementById("input-goal").value;
    const type = document.getElementById("input-goal-type").value;

    if (!goal || type === "Goal Type") {
        alert("Please fill out all fields.");
        return;
    }

    const newGoal = {goal, type};
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

    const typeCell = document.createElement("td");
    typeCell.classList.add("align-middle");
    typeCell.textContent = goalObj.type;

    const actionCell = document.createElement("td");
    actionCell.classList.add("align-middle");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("btn", "btn-outline-success", "btn-sm", "me-2");

    completeBtn.addEventListener("click", function () {
        let completedGoalList = JSON.parse(localStorage.getItem("completedGoalList")) || [];
        if (!completedGoalList.includes(goalObj.goal)) {
            completeGoal(document.getElementById("goal-tbody"), newRow);
            completedGoalList.push(goalObj.goal);
            localStorage.setItem("completedGoalList", JSON.stringify(completedGoalList));
        }
    });

    let completedGoalList = JSON.parse(localStorage.getItem("completedGoalList")) || [];
    if (completedGoalList.includes(goalObj.goal)) {
        completeGoal(document.getElementById("goal-tbody"), newRow);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✘";
    deleteBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
    deleteBtn.addEventListener("click", function () {
        deleteGoal(goalObj, newRow);
    });

    actionCell.appendChild(completeBtn);
    actionCell.appendChild(deleteBtn);
    newRow.appendChild(goalCell);
    newRow.appendChild(typeCell);
    newRow.appendChild(actionCell);

    document.getElementById("goal-tbody").appendChild(newRow);
}

function completeGoal(tbody, row) {
    row.style.opacity = "0.4";
    tbody.appendChild(row);
}

function deleteGoal(goalObj, row) {
    row.remove();
    let goalList = JSON.parse(localStorage.getItem("goalsList")) || [];
    let completedGoalList = JSON.parse(localStorage.getItem("completedGoalList")) || [];
    goalList = goalList.filter(t =>
        !(t.goal === goalObj.goal &&
            t.type === goalObj.type &&
            t.time === goalObj.time &&
            t.importance === goalObj.importance &&
            t.urgency === goalObj.urgency)
    );
    completedGoalList = completedGoalList.filter(t =>
        !(t === goalObj.goal)
    );
    localStorage.setItem("goalsList", JSON.stringify(goalList));
    localStorage.setItem("completedGoalList", JSON.stringify(completedGoalList));
}
