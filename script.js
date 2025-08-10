const gameArea = document.getElementById("game-area");
const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");

let score = 0;
let timeLeft = 60;
let timer;
let gameActive = false;


const endLogo = document.createElement("img");
endLogo.src = "logo.png";
endLogo.alt = "Union Logo";
endLogo.style.width = "100px";
endLogo.style.display = "block";
endLogo.style.margin = "0 auto 10px auto";
endScreen.insertBefore(endLogo, endScreen.firstChild);

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreSpan.textContent = score;
    timeSpan.textContent = timeLeft;
    endScreen.style.display = "none";
    gameArea.style.display = "block";
    gameActive = true;
    spawnBubbles();
    timer = setInterval(updateTime, 1000);
}

function endGame() {
    clearInterval(timer);
    gameActive = false;
    finalScore.textContent = score;
    endScreen.style.display = "block";
    gameArea.innerHTML = "";
}

function updateTime() {
    timeLeft--;
    timeSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function spawnBubbles() {
    if (!gameActive) return;
    gameArea.innerHTML = "";
    const bubbleCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("img");
        bubble.src = "logo.png";
        bubble.classList.add("bubble");
        bubble.style.top = Math.random() * 80 + "%";
        bubble.style.left = Math.random() * 80 + "%";
        bubble.addEventListener("click", popBubble);
        gameArea.appendChild(bubble);
    }
    setTimeout(spawnBubbles, 800);
}

function popBubble(e) {
    score++;
    scoreSpan.textContent = score;
    const popSound = new Audio("pop.mp3");
    popSound.play();
    e.target.remove();
}

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
