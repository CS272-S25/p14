const circle = document.getElementById("progress-ring");
const phase = document.getElementById("phase");
const quote = document.getElementById("quote");
const startBtn = document.getElementById("start-btn");

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

const breathingPhases = [
    { label: "Inhale", duration: 4000 },
    { label: "Hold", duration: 4000 },
    { label: "Exhale", duration: 4000 },
    { label: "Hold", duration: 4000 }
];

let quoteInterval, breathInterval;

function setProgress(percent) {
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = offset;
}

function updateQuote() {
    fetch("https://zenquotes.io/api/random")
        .then(res => res.json())
        .then(data => {
            quote.textContent = `"${data[0].q}" — ${data[0].a}`;
        })
        .catch(() => {
            quote.textContent = '\"Question yourself constantly: what is the essence of your mind. You will need nothing else\" - Nyogen Senzaki';
        });
}

function startBreathingCycle() {
    let totalTime = 60000; // 60 * 1000
    let elapsed = 0;
    let phaseIndex = 0;

    setProgress(0);
    phase.textContent = breathingPhases[phaseIndex].label;
    let phaseStart = Date.now();

    breathInterval = setInterval(() => {
        let now = Date.now();
        let timePassed = now - phaseStart;
        let phaseDuration = breathingPhases[phaseIndex].duration;

        if (timePassed >= phaseDuration) {
            phaseIndex = (phaseIndex + 1) % breathingPhases.length;
            phase.textContent = breathingPhases[phaseIndex].label;
            phaseStart = now;
        }

        let percent = elapsed / totalTime;
        setProgress(percent);

        elapsed += 200;
        if (elapsed >= totalTime) {
            clearInterval(breathInterval);
            clearInterval(quoteInterval);
            phase.textContent = "Done ✨";
            setProgress(1);
        }
    }, 200);

    updateQuote();
    quoteInterval = setInterval(updateQuote, 20000);
}

startBtn.addEventListener("click", () => {
    clearInterval(breathInterval);
    clearInterval(quoteInterval);
    startBreathingCycle();
});