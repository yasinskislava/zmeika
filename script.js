const canvas = document.querySelector("canvas"); 
const main = canvas.getContext("2d");

const scores = document.querySelectorAll(".score");
let currentScore = 0;
let bestScore = 0;
let x = 250;
let y = 250;
const box = 25;
let mainDirection;
let start;
let isGameOn = false;
let key;
let foodX;
let foodY;
let isFood = false;

function dir(check) {
    if (check === "ArrowUp" && mainDirection !== "Down") {
        mainDirection = "Up";
    }
    else if (check === "ArrowDown" && mainDirection !== "Up") {
        mainDirection = "Down";
    }
    else if (check === "ArrowLeft" && mainDirection !== "Right") {
        mainDirection = "Left";
    }
    else if (check === "ArrowRight" && mainDirection !== "Left") {
        mainDirection = "Right";
    }
}

document.addEventListener("keydown", (event) => key = event.code);
startPosition(); 

const btn = document.querySelector("#on");
btn.addEventListener("click", startGame);

function game() {
    dir(key);
    createFood();
    isEat();
    move();
    gameOver();
}
scores[0].textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;

function gameOver() {
    if (x < 0 || x > 500 || y < 0 || y > 500) {
        isGameOn = false;
        isFood = false;
        clearInterval(start);
        for (let i = 0; i <= 525; i += 25){
            for (let j = 0; j <= 525; j += 25){
                main.clearRect(i, j, box, box);
            }
        }
        x = 250;
        y = 250;
        startPosition();
        overlay.classList.remove("hide");
        currentScore = 0;
        scores[0].textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;
    }
}

function startGame() {
    if (isGameOn === false) {
        mainDirection = "Right";
        isGameOn = true;
        start = setInterval(game, 150);
    }
}

function startPosition() {
    main.fillRect(x, y, box, box);
}

function changeCoordinates() {
    if (mainDirection === "Up") {
        y -= box;
    }
    else if (mainDirection === "Down") {
        y += box;
    }
    else if (mainDirection === "Right") {
        x += box;
    }
    else if (mainDirection === "Left") {
        x -= box;
    }
}

function move() {
    main.clearRect(x, y, box, box);
    changeCoordinates();
    main.fillRect(x, y, box, box);
}

function createFood() {
    const createFoodX = Math.floor(Math.random() * 21) * box;
    const createFoodY = Math.floor(Math.random() * 21) * box;
    if (isFood === false && createFoodX !== x && createFoodY !== y) {
        foodX = createFoodX;
        foodY = createFoodY;
        main.fillRect(foodX, foodY, box, box);
        isFood = true;
    }
}

function isEat() {
    if (x === foodX && y === foodY) {
        currentScore++;
        if (currentScore > bestScore) {
            bestScore = currentScore;
        }
        isFood = false;
        for (const score of scores) {
            score.textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;
        } 
        
    }
}

