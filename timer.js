let timer;
let time = 1500;
let running = false;
let currentMode = "pomodoro";

const display = document.getElementById("timer");
const modeButtons = document.querySelectorAll("[data-mode]");

function updateDisplay() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  display.textContent = `${minutes}:${seconds}`;
  
  document.title = `${minutes}:${seconds} | Pomodoro Timer`;
}

function setMode(mode) {
  currentMode = mode;
  
  if (mode === "pomodoro") time = 1500;  
  if (mode === "shortBreak") time = 300; 
  if (mode === "longBreak") time = 600;       

  updateDisplay();

  modeButtons.forEach(btn => btn.classList.remove("active"));

  const activeBtn = document.querySelector(`button[data-mode="${mode}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

function startTimer() {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      running = false;
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  setMode(currentMode);
}

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mode = button.getAttribute("data-mode");
    if (!running) setMode(mode);
  });
});

setMode("pomodoro");

