const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const endScreen = document.getElementById("end-screen");
const finalScoreDisplay = document.getElementById("final-score");
let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;
let popSound = new Audio("pop.mp3");

function showStartScreen() {
    gameArea.innerHTML = `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;">
            <img src="logo.png" alt="Union Logo" style="width:150px;margin-bottom:20px;">
            <button id="start-btn" style="padding:10px 20px;font-size:16px;">Start Game</button>
        </div>
    `;
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("scoreboard").style.display = "none";
}

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    document.getElementById("scoreboard").style.display = "block";
    gameArea.innerHTML = "";
    endScreen.style.display = "none";
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    timerInterval = setInterval(updateTime, 1000);
    gameInterval = setInterval(spawnBubbles, 800);
}

function updateTime() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function spawnBubbles() {
    const bubbleCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
        bubble.style.top = Math.random() * (gameArea.clientHeight - 50) + "px";
        bubble.style.backgroundImage = "url('logo.png')";
        bubble.style.backgroundSize = "cover";
        bubble.addEventListener("click", () => {
            score++;
            scoreDisplay.textContent = score;
            popSound.currentTime = 0;
            popSound.play();
            bubble.remove();
        });
        gameArea.appendChild(bubble);
        setTimeout(() => bubble.remove(), 2000);
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameArea.innerHTML = `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;">
            <h2>Time's Up!</h2>
            <p>Your Score: ${score}</p>
            <button id="play-again" style="padding:10px 20px;font-size:16px;">Play Again</button>
        </div>
    `;
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("play-again").addEventListener("click", startGame);
}

showStartScreen();
