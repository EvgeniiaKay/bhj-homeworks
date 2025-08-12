const deadCounter = document.getElementById("dead");
const lostCounter = document.getElementById("lost");

function getHole(index) {
    return document.getElementById(`hole${index}`);
}

let dead = 0;
let lost = 0;

function updateCounters() {
    deadCounter.textContent = dead;
    lostCounter.textContent = lost;
}

function resetGame(message) {
    alert(message);
    dead = 0;
    lost = 0;
    updateCounters();
}

function handleClick(hole) {
    if (hole.classList.contains("hole_has-mole")) {
        dead++;
        if (dead === 10) {
            resetGame("Победа! Вы убили 10 кротов!");
        }
    } else {
        lost++;
        if (lost === 5) {
            resetGame("Поражение! Вы промахнулись 5 раз.");
        }
    }
    updateCounters();
}

for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.onclick = () => handleClick(hole);
}

updateCounters();