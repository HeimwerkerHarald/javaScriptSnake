const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 5;
let tileCount = 20;
let tileBlock = canvas.width / tileCount;
let tileSize = tileBlock - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 1;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let restartButton = document.getElementById("restartGame");
restartButton.style.visibility = "hidden";

//game loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }
  if (gameOver) {
    restartButton.style.visibility = "visible";
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}


function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);

}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "grey";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileBlock, part.y * tileBlock, tileSize, tileSize);
  }
  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); //remove furthers item from snake parts if more then tail size
  }

  ctx.fillStyle = "darkOrange";
  ctx.fillRect(headX * tileBlock, headY * tileBlock, tileSize, tileSize);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  //up
  if (event.keyCode === 38 || event.keyCode === 87) {
    if (inputsYVelocity === 1)
      return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }  //down
  if (event.keyCode === 40 || event.keyCode ===83) {
    if (inputsYVelocity === -1)
      return;
      inputsYVelocity = 1;
    inputsXVelocity = 0;
  }  //left
  if (event.keyCode === 37 || event.keyCode ===65) {
    if (inputsXVelocity === 1)
      return;
   inputsYVelocity= 0;
    inputsXVelocity = -1;
  }
  //right
  if (event.keyCode === 39 ||event.keyCode ===68) {
    if (inputsXVelocity === -1)
      return;
    inputsYVelocity = 0;
   inputsXVelocity = 1;
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileBlock, appleY * tileBlock, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX  = Math.floor(Math.random() * tileBlock);
    appleY = Math.floor(Math.random() * tileBlock);
    tailLength++;
    score++;
    speed += 0.5;
    if (appleX === SnakePart || appleY === SnakePart){
    appleX  = Math.floor(Math.random() * tileBlock);
    appleY = Math.floor(Math.random() * tileBlock);
    tailLength++;
    score++;
}}}
drawGame();
