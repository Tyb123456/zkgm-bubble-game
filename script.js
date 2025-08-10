const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");

let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;

function playPopSound() {
    const pop = new Audio("pop.mp3");
    pop.play();
}

function createBubble() {
    const bubble = document.createElement("img");
    bubble.src = "logo.png";
    bubble.classList.add("bubble");

    const size = Math.random() * 40 + 40;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * (gameArea.clientWidth - size)}px`;
    bubble.style.top = `${Math.random() * (gameArea.clientHeight - size)}px`;

    bubble.addEventListener("click", () => {
        score++;
        scoreEl.textContent = score;
        playPopSound();
        bubble.remove();
    });

    gameArea.appendChild(bubble);

    setTimeout(() => {
        if (bubble.parentElement) bubble.remove();
    }, 1500);
}

function spawnBubbles() {
    const numBubbles = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numBubbles; i++) {
        createBubble();
    }
}

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    gameArea.innerHTML = "";
    endScreen.style.display = "none";
    startBtn.style.display = "none";

    timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);

    gameInterval = setInterval(spawnBubbles, 800);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameArea.innerHTML = "";
    finalScoreEl.textContent = score;
    endScreen.style.display = "block";
}

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
