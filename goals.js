// use localStorage to keep track of the goals list

document.addEventListener("DOMContentLoaded", function () {
    const savedGoals = JSON.parse(localStorage.getItem("goalsList")) || [];
    savedGoals.forEach(addGoalTile);
});

document.getElementById("goals-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const goal = document.getElementById("input-goal").value;
    const type = document.getElementById("input-goal-type").value;
    const description = document.getElementById("input-description").value;

    // Description not required
    if (!goal || type === "Goal Type") {
        alert("Please fill out all fields.");
        return;
    }

    const newGoal = {goal, type, description};
    const goalList = JSON.parse(localStorage.getItem("goalsList")) || [];

    // Check for duplicate goals
    const duplicateFound =
        goalList.find((val) => {
            if (val.goal === goal) {
                return true;
            }
        });
    if (duplicateFound) {
        alert("Can't have duplicate goals.")
        return;
    }

    goalList.push(newGoal);
    localStorage.setItem("goalsList", JSON.stringify(goalList));
    addGoalTile(newGoal);
    event.target.reset();
});

function addGoalTile(goalObj){
    let goalDivNode = "";
    if (goalObj.type === "Long Term"){
        goalDivNode = document.getElementById("long-term-list")
    } else {
        goalDivNode = document.getElementById("short-term-list")
    }

    const newColDivNode = document.createElement("div");
    newColDivNode.id = `goal-${goalObj.goal}`
    newColDivNode.className = "col-12 col-md-6 col-lg-4";

    const newCardDivNode = document.createElement("div");
    newCardDivNode.className = "card m-2 p-2";

    const newGoalNode = document.createElement("h2");
    newGoalNode.innerText = `${goalObj.goal}`;

    const descCharLimit = 50;

    const newDescNode = document.createElement("p");
    newDescNode.classList.add("mb-1")
    newDescNode.innerText = cleanDescription(goalObj.description, descCharLimit);

    const newReadMoreBtnNode = document.createElement("button");
    newReadMoreBtnNode.className = "btn btn-outline-secondary";
    newReadMoreBtnNode.innerText = "Read More";
    newReadMoreBtnNode.addEventListener("click", () => {
        if(newReadMoreBtnNode.innerText === "Read More") {
            newDescNode.innerText = goalObj.description;
            newReadMoreBtnNode.innerText = "Read Less";
        } else {
            newDescNode.innerText = cleanDescription(goalObj.description, descCharLimit);
            newReadMoreBtnNode.innerText = "Read More";
        }
    });
    if (goalObj.description.length < descCharLimit){
        newReadMoreBtnNode.disabled = true;
        newReadMoreBtnNode.style.opacity = ".3";
    }

    const actionCell = document.createElement("span");
    actionCell.classList.add("mx-auto", "mt-2");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("btn", "btn-outline-success", "btn-md", "me-4");
    completeBtn.addEventListener("click", function () {
        let completedGoalList = JSON.parse(localStorage.getItem("completedGoalList")) || [];
        if (!completedGoalList.includes(goalObj.goal)) {
            completeGoal(goalDivNode, newColDivNode);
            completedGoalList.push(goalObj.goal);
            localStorage.setItem("completedGoalList", JSON.stringify(completedGoalList));
        }
    });

    let completedGoalList = JSON.parse(localStorage.getItem("completedGoalList")) || [];
    if (completedGoalList.includes(goalObj.goal)) {
        completeGoal(goalDivNode, newColDivNode);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✘";
    deleteBtn.classList.add("btn", "btn-outline-danger", "btn-md");
    deleteBtn.addEventListener("click", function () {
        deleteGoal(goalObj, newColDivNode);
    });

    actionCell.appendChild(completeBtn);
    actionCell.appendChild(deleteBtn);

    newCardDivNode.appendChild(newGoalNode);
    newCardDivNode.appendChild(newDescNode);
    newCardDivNode.appendChild(newReadMoreBtnNode);
    newCardDivNode.appendChild(actionCell);
    newColDivNode.appendChild(newCardDivNode);

    goalDivNode.appendChild(newColDivNode)
}

function completeGoal(goalDivNode, colDivNode) {
    colDivNode.style.opacity = "0.4";
    goalDivNode.appendChild(colDivNode);
}

function deleteGoal(goalObj, colDivNode) {
    colDivNode.remove();
    let goalList = JSON.parse(localStorage.getItem("goalsList")) || [];
    let completedGoalList = JSON.parse(localStorage.getItem("completedGoalList")) || [];
    goalList = goalList.filter(t =>
        !(t.goal === goalObj.goal)
    );
    completedGoalList = completedGoalList.filter(t =>
        !(t === goalObj.goal)
    );
    localStorage.setItem("goalsList", JSON.stringify(goalList));
    localStorage.setItem("completedGoalList", JSON.stringify(completedGoalList));
}

function cleanDescription(description, charLimit){
    if (description.length >= charLimit){
        return description.substring(0,charLimit) + "...";
    } else {
        return description;
    }
}
