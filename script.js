
let score = 0;
let timeLeft = 60;
let timer;
let gameInterval;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('play-again').addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score').innerText = score;
    document.getElementById('time').innerText = timeLeft;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-area').innerHTML = '';
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    gameInterval = setInterval(createBubble, 800);
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.top = Math.random() * 450 + 'px';
    bubble.style.left = Math.random() * 350 + 'px';
    bubble.addEventListener('click', () => {
        score++;
        document.getElementById('score').innerText = score;
        bubble.remove();
    });
    document.getElementById('game-area').appendChild(bubble);
    setTimeout(() => bubble.remove(), 2000);
}

function endGame() {
    clearInterval(timer);
    clearInterval(gameInterval);
    document.getElementById('final-score').innerText = score;
    document.getElementById('end-screen').style.display = 'block';
}
