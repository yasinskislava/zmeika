const canvas = document.querySelector("canvas"); 
const main = canvas.getContext("2d");

const scores = document.querySelectorAll(".score");
let currentScore = 0;
let bestScore = 0;
let zmeika = [
    {
        x: 250,
        y: 250,
    },
    {
        x: 225,
        y: 250,
    },
    {
        x: 200,
        y: 250,
    },
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
    isGameFinished();
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
        zmeika = [
          {
            x: 250,
            y: 250,
          },
          {
            x: 225,
            y: 250,
          },
          {
            x: 200,
            y: 250,
          },
        ];
        startPosition();
        overlay.classList.remove("hide");
        currentScore = 0;
        scores[0].textContent = `Score: ${currentScore}   Best Score: ${bestScore}`;
    }
}

function startGame() {
    if (isGameOn === false) {
        for (const part of zmeika) {
            part.mainDirection = "Right";
        }
        directionMatrix[zmeika[0].x / box][zmeika[0].y / box] = "Right";
        directionMatrix[zmeika[1].x / box][zmeika[1].y / box] = "Right";
        directionMatrix[zmeika[2].x / box][zmeika[2].y / box] = "Right";
        isGameOn = true;
        start = setInterval(game, 150);
    }
}

function startPosition() {
    main.drawImage(snakeHeadRight, zmeika[0].x, zmeika[0].y, box, box);
    main.drawImage(snakePartHorizontal, zmeika[1].x, zmeika[1].y, box, box);
    main.drawImage(snakeTailRight, zmeika[2].x, zmeika[2].y, box, box);
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

        zmeika[i].previousDirection = zmeika[i].mainDirection;
        if (i !== 0) {
            zmeika[i].mainDirection = directionMatrix[zmeika[i].x / box][zmeika[i].y / box];
        }

        let snakeImg = mushroom;
        if (i === 0) {
            if (zmeika[i].mainDirection === "Up") {
                snakeImg = snakeHeadUp;
            }
            else if (zmeika[i].mainDirection === "Down") {
                snakeImg = snakeHeadDown;
            }
            else if (zmeika[i].mainDirection === "Right") {
                snakeImg = snakeHeadRight;
            }
            else if (zmeika[i].mainDirection === "Left") {
                snakeImg = snakeHeadLeft;
            }
        }
        else if (i > 0 && i < zmeika.length - 1) {
            if (zmeika[i].mainDirection === "Up" && zmeika[i].previousDirection === "Up" || zmeika[i].mainDirection === "Down" && zmeika[i].previousDirection === "Down") {
                snakeImg = snakePartVertical;
            }
            else if (zmeika[i].mainDirection === "Right" && zmeika[i].previousDirection === "Right" || zmeika[i].mainDirection === "Left" && zmeika[i].previousDirection === "Left") {
                snakeImg = snakePartHorizontal;
            }
                
                
            
            else if (zmeika[i].mainDirection === "Right" && zmeika[i].previousDirection === "Up" || zmeika[i].mainDirection === "Down" && zmeika[i].previousDirection === "Left") {
                snakeImg = snakeDownRight;
            }
            else if (zmeika[i].mainDirection === "Left" && zmeika[i].previousDirection === "Up" || zmeika[i].mainDirection === "Down" && zmeika[i].previousDirection === "Right") {
                snakeImg = snakeDownLeft;
            }
            else if (zmeika[i].mainDirection === "Up" && zmeika[i].previousDirection === "Right" || zmeika[i].mainDirection === "Left" && zmeika[i].previousDirection === "Down") {
                snakeImg = snakeUpLeft;
            }
            else if (zmeika[i].mainDirection === "Up" && zmeika[i].previousDirection === "Left" || zmeika[i].mainDirection === "Right" && zmeika[i].previousDirection === "Down") {
                snakeImg = snakeUpRight;
            }
            // console.log(zmeika[i].mainDirection);
            // console.log(zmeika[i - 1].mainDirection);
            // console.log(snakeImg);
            // console.log(zmeika.length);
            // console.table(directionMatrix);
            // console.log("-----------------------------");
        }
        else if (i === zmeika.length - 1) {
            if (zmeika[i].mainDirection === "Up") {
                snakeImg = snakeTailUp;
            }
            else if (zmeika[i].mainDirection === "Down") {
                snakeImg = snakeTailDown;
            }
            else if (zmeika[i].mainDirection === "Right") {
                snakeImg = snakeTailRight;
            }
            else if (zmeika[i].mainDirection === "Left") {
                snakeImg = snakeTailLeft;
            }  
        }
        console.log(snakeImg);
        main.drawImage(snakeImg, zmeika[i].x, zmeika[i].y, box, box);
        
        
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
        // main.fillRect(foodX, foodY, box, box);
        main.drawImage(mushroom, foodX, foodY, box, box);
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
function isGameFinished() {
    if (zmeika.length === 441) {
        isGameOn = false;
        isFood = false;
        clearInterval(start);
        for (let i = 0; i <= 525; i += 25) {
          for (let j = 0; j <= 525; j += 25) {
            main.clearRect(i, j, box, box);
          }
        }
        zmeika = [
          {
            x: 250,
            y: 250,
          },
        ];
        startPosition();
        overlay2.classList.remove("hide");
        currentScore = 0;
    }
}