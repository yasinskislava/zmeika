const canvas = document.querySelector("canvas"); 
const main = canvas.getContext("2d");

const scores = document.querySelectorAll(".score");
let currentScore = 0;
let bestScore = 0;
let zmeika = [
    {
        x: 250,
        y: 250,
    }
];

let directionMatrix = [];
for (let i = 0; i < 21; i++){
    directionMatrix[i] = [];
    for (let j = 0; j < 21; j++){
        directionMatrix[i][j] = "abc";
    }
}

const box = 25;
let start;
let isGameOn = false;
let key;
let foodX;
let foodY;
let isFood = false;

function dir(check) {
    if (check === "ArrowUp" && zmeika[0].mainDirection !== "Down") {
        zmeika[0].mainDirection = "Up";
    }
    else if (check === "ArrowDown" && zmeika[0].mainDirection !== "Up") {
        zmeika[0].mainDirection = "Down";
    }
    else if (check === "ArrowLeft" && zmeika[0].mainDirection !== "Right") {
        zmeika[0].mainDirection = "Left";
    }
    else if (check === "ArrowRight" && zmeika[0].mainDirection !== "Left") {
        zmeika[0].mainDirection = "Right";
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
scores[1].textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;

function gameOver() {
    if (zmeika[0].x < 0 || zmeika[0].x > 500 || zmeika[0].y < 0 || zmeika[0].y > 500 || isTouchedSelf() === true) {
        isGameOn = false;
        isFood = false;
        clearInterval(start);
        for (let i = 0; i <= 525; i += 25) {
            for (let j = 0; j <= 525; j += 25){
                main.clearRect(i, j, box, box);
            }
        }
        zmeika = [{
            x: 250,
            y: 250,
        }];
        startPosition();
        overlay.classList.remove("hide");
        currentScore = 0;
        scores[0].textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;
    }
}

function startGame() {
    if (isGameOn === false) {
        zmeika[0].mainDirection = "Right";
        isGameOn = true;
        start = setInterval(game, 150);
    }
}

function startPosition() {
    main.fillRect(zmeika[0].x, zmeika[0].y, box, box);
}

function changeCoordinates(part) {
    if (part.mainDirection === "Up") {
        part.y -= box;
    }
    else if (part.mainDirection === "Down") {
        part.y += box;
    }
    else if (part.mainDirection === "Right") {
        part.x += box;
    }
    else if (part.mainDirection === "Left") {
        part.x -= box;
    }
}

function move() {
    for (let i = 0; i < zmeika.length; i++) {
        main.clearRect(zmeika[i].x, zmeika[i].y, box, box);
        if (i === 0) {
            directionMatrix[zmeika[i].x / box][zmeika[i].y / box] = zmeika[i].mainDirection;
        }
        changeCoordinates(zmeika[i]);
        gameOver();
        
        if (i !== 0) {
            zmeika[i].mainDirection = directionMatrix[zmeika[i].x / box][zmeika[i].y / box];
        }
        main.fillRect(zmeika[i].x, zmeika[i].y, box, box);
        // console.log(zmeika[i].x, zmeika[i].y, i, zmeika[i].mainDirection);
    }
    // console.log("-----------------------------");
}

function createFood() {
    const createFoodX = Math.floor(Math.random() * 21) * box;
    const createFoodY = Math.floor(Math.random() * 21) * box;
    if (isFood === false && isFoodCanSpawn(createFoodX, createFoodY) === true) {
      foodX = createFoodX;
      foodY = createFoodY;
      main.fillRect(foodX, foodY, box, box);
      isFood = true;
    }
    else if (isFood === false && isFoodCanSpawn(createFoodX, createFoodY) === false) {
        createFood();
    }
}

function isEat() {
    if (zmeika[0].x === foodX && zmeika[0].y === foodY) {
        currentScore++;
        if (currentScore > bestScore) {
            bestScore = currentScore;
        }
        isFood = false;
        for (const score of scores) {
            score.textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;
        } 
        addNewElementZmeika();
    }
}

function addNewElementZmeika() {
    if (zmeika[zmeika.length-1].mainDirection === "Up") {
        zmeika.push({
            x: zmeika[zmeika.length-1].x,
            y: zmeika[zmeika.length - 1].y + box,
            mainDirection: zmeika[zmeika.length-1].mainDirection,
        });
    }
    else if (zmeika[zmeika.length-1].mainDirection === "Down") {
        zmeika.push({
            x: zmeika[zmeika.length-1].x,
            y: zmeika[zmeika.length - 1].y - box,
            mainDirection: zmeika[zmeika.length-1].mainDirection,
        });
    }
    else if (zmeika[zmeika.length-1].mainDirection === "Right") {
        zmeika.push({
            x: zmeika[zmeika.length-1].x - box,
            y: zmeika[zmeika.length - 1].y,
            mainDirection: zmeika[zmeika.length-1].mainDirection,
        });
    }
    else if (zmeika[zmeika.length-1].mainDirection === "Left") {
        zmeika.push({
            x: zmeika[zmeika.length-1].x + box,
            y: zmeika[zmeika.length - 1].y,
            mainDirection: zmeika[zmeika.length-1].mainDirection,
        });
    }
}

function isTouchedSelf() {
    let res = false;
    for (let i = 1; i < zmeika.length; i++) {
        if (zmeika[0].x === zmeika[i].x && zmeika[0].y === zmeika[i].y) {
            res = true;
        }
    }
    return res;
}

function isFoodCanSpawn(createFoodX, createFoodY) {
    let res = true;
    for (let i = 0; i < zmeika.length; i++) {
        if (createFoodX === zmeika[i].x && createFoodY === zmeika[i].y) {
            res = false;
        }
    }
    return res;
}