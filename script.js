function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

const themes = {
  light: { background: "#ffffff", color: "#000000" },
  dark: { background: "#000000", color: "#ffffff" },
  neon: { background: "#000000", color: "#39ff14" }
};

document.querySelectorAll("[data-theme]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  });
});

function applyTheme(theme) {
  const { background, color } = themes[theme];
  document.body.style.backgroundColor = background;
  document.body.style.color = color;
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

const modeSections = {
  clock: document.getElementById("clock"),
  stopwatch: document.getElementById("stopwatch"),
  timer: document.getElementById("timer")
};
document.querySelectorAll("#modeButtons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    Object.values(modeSections).forEach(el => el.style.display = "none");
    modeSections[mode].style.display = "block";
  });
});

let stopwatchInterval, stopwatchTime = 0;
function updateStopwatch() {
  stopwatchTime++;
  let hrs = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
  let mins = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
  let secs = String(stopwatchTime % 60).padStart(2, '0');
  document.getElementById("stopwatch-display").textContent = `${hrs}:${mins}:${secs}`;
}
document.getElementById("startStopwatch").addEventListener("click", () => {
  if (stopwatchInterval) { clearInterval(stopwatchInterval); stopwatchInterval = null; }
  else { stopwatchInterval = setInterval(updateStopwatch, 1000); }
});
document.getElementById("resetStopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval); stopwatchTime = 0; stopwatchInterval = null; updateStopwatch();
});

let timerInterval, timerTime = 0;
function updateTimerDisplay() {
  let mins = String(Math.floor(timerTime / 60)).padStart(2, '0');
  let secs = String(timerTime % 60).padStart(2, '0');
  document.getElementById("timer-display").textContent = `${mins}:${secs}`;
}
document.getElementById("startTimer").addEventListener("click", () => {
  const inputMins = parseInt(document.getElementById("timerMinutes").value) || 0;
  timerTime = inputMins * 60;
  updateTimerDisplay();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timerTime > 0) { timerTime--; updateTimerDisplay(); }
    else { clearInterval(timerInterval); alert("⏰ Time’s up!"); }
  }, 1000);
});
document.getElementById("resetTimer").addEventListener("click", () => {
  clearInterval(timerInterval); timerTime = 0; updateTimerDisplay();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✅ Service Worker Registered"))
    .catch(err => console.error("⚠️ SW registration failed:", err));
}