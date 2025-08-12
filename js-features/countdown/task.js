const timer = document.getElementById("timer");
const statusS = document.getElementById("status");
let seconds = Number(timer.textContent);

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;

    const formatedHours = String(hours).padStart(2, 0);
    const formatedMinutes = String(minutes).padStart(2, 0);
    const formatedSeconds = String(sec).padStart(2, 0);

    return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
}

function updateTimer() {
    if (seconds <= 0) {
        clearInterval(timerInterval);
        statusS.textContent = alert("Вы победили в конкурсе!");
    } else { 
        seconds--;
        timer.textContent = formatTime(seconds);
    }
}

const timerInterval = setInterval(updateTimer, 1000);
timer.textContent = formatTime(seconds);