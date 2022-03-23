// ------------ BOARD SETUP -------------

let gameStarted = false;
let isGameOver = false;
let countdownText = 4;
const countDownAudio = new Audio("countdown.wav"); // beep mp3
const foodEatenAudio = new Audio("eating.wav"); // munch mp3
const gameOverAudio = ""; // game over mp3

// establishing canvas on the page
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// setting canvas background
canvas.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// fillRect() paramaters = (x start, y start, width, height)

// display instructions to start
ctx.font = "20px monospace";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText(
  "Click enter to begin the game.",
  canvas.width / 2,
  canvas.height / 2 - 15
);
ctx.fillText(
  "Use the arrow keys to play!",
  canvas.width / 2,
  canvas.height / 2 + 15
);

// ------------ LOCAL STORAGE ------------

if (!localStorage.getItem("storedScore")) {
  localStorage.setItem("storedScore", "0");
}

let highscore = localStorage.getItem("storedScore");

// ------------ SCORE DISPLAY ------------

// displaying the score text on canvas
let score = 0;
let display = "000";

const displayScore = () => {
  //clear old text
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, 30);
  ctx.fillStyle = "black";
  ctx.fill();

  //format score for the display
  score < 10
    ? null
    : score < 100
    ? (display = "00")
    : score < 1000
    ? (display = "0")
    : score < 10000
    ? (display = "")
    : null;

  //write new score
  ctx.font = "16px monospace";
  ctx.fillStyle = "white";
  ctx.fillText(`score: ${display}${score}`, 390, 20);

  // write highscore
  ctx.font = "16px monospace";
  ctx.fillStyle = "white";
  ctx.fillText(`best: ${highscore}`, 50, 20);
};

// ------------ CLEAR BOARD FUNC -------------
//used throughtout all the sections

const clearBoard = () => {
  ctx.beginPath();
  ctx.rect(0, 30, canvas.width, canvas.height - 10);
  ctx.fillStyle = "black";
  ctx.fill();
};

// ------------ COUNTDOWN -------------

// function where the action starts! Called on keypress
const startGamePlay = (e) => {
  if (!gameStarted && e.keyCode === 13) {
    //Remove the instructions text
    clearBoard();
    gameStarted = true;

    //Play sound and call countdown func
    countDownAudio.play();
    displayCountDown();
  } else if (
    e.keyCode === 37 ||
    e.keyCode === 38 ||
    e.keyCode === 39 ||
    e.keyCode === 40
  ) {
    changeDirection(e.keyCode); //or move the snake
  }
};

// put settimout inside delay func to omit repetition
const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 800);
  });
};

// function to display countdown
const displayCountDown = () => {
  countdownText > 1 ? countdownText-- : (countdownText = "GO!");

  Promise.resolve()
    .then(() => {
      // display the curret countdown text
      ctx.font = "42px monospace";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(countdownText, canvas.height / 2, canvas.width / 2);
    })
    .then(() => delay()) // settimeout
    .then(() => {
      // clearBoard to get rid of old text
      clearBoard();
    })
    .then(() => {
      countdownText !== "GO!" ? displayCountDown() : playSnake();
    });
};

// ------------ PLAY SNAKE -------------

let snakeParts = [
  { x: 200, y: 220 },
  { x: 180, y: 220 },
  { x: 160, y: 220 },
];

let foodx;
let foody;

let speed = 250;

// The amount of the pixel the snake will move along x & y
// automatic direction is snake moving right
let xDirection = 20;
let yDirection = 0;

const playSnake = () => {
  if (isGameOver) return;
  setTimeout(() => {
    // wrapped in settimeout for smooth gameplay
    clearBoard();
    displayScore();
    moveSnake();
    drawSnake();
    playSnake();
  }, speed);
};

const generateFood = () => {
  let random1 = Math.random() * 420; //max board width
  foodx = random1 - (random1 % 20); // must be multiple of 20
  let random2 = Math.random() * (420 - 60) + 60; // not top 60px of board
  foody = random2 - (random2 % 20);
};

const drawSnake = () => {
  //draw the food first so it's beneth the snake
  ctx.fillStyle = "red";
  ctx.fillRect(foodx, foody, 20, 20);
  ctx.strokeRect(foodx, foody, 20, 20); // block outline
  //draw the snake
  snakeParts.forEach((part) => {
    ctx.fillStyle = "green";
    ctx.fillRect(part.x, part.y, 20, 20);
    ctx.strokeRect(part.x, part.y, 20, 20);
  });
  collisionDetect();
};

const moveSnake = () => {
  const newBlock = {
    x: snakeParts[0].x + xDirection,
    y: snakeParts[0].y + yDirection,
  };
  snakeParts.unshift(newBlock); // add newBlock to front of snake
  snakeParts.pop(); // remove last block
};

const changeDirection = (key) => {
  //each if() checks key pressed and doesn't allow snake to move backwards
  if (key === 37 && xDirection !== 20) {
    xDirection = -20;
    yDirection = 0;
  }
  if (key === 38 && yDirection !== 20) {
    yDirection = -20;
    xDirection = 0;
  }
  if (key === 39 && xDirection !== -20) {
    xDirection = 20;
    yDirection = 0;
  }
  if (key === 40 && yDirection !== -20) {
    yDirection = 20;
    xDirection = 0;
  }
};

const collisionDetect = () => {
  //if first block of snake and food have same position
  if (snakeParts[0].x === foodx && snakeParts[0].y === foody) {
    foodEatenAudio.play();
    score = score + 10;
    generateFood();
    const newBlock = {
      x: snakeParts[snakeParts.length - 1].x + xDirection,
      y: snakeParts[snakeParts.length - 1].y + yDirection,
    };
    snakeParts.push(newBlock); //add new block to end of snake
  }
  if (score === 50) speed = 150; //speed up game
  if (score === 100) speed = 100; //speed up game

  //check if front of snake touches edge of board
  if (
    snakeParts[0].x === 460 ||
    snakeParts[0].x === 0 ||
    snakeParts[0].y === 0 ||
    snakeParts[0].y === 460
  ) {
    gameOver();
  }
};

// ------------ GAME OVER -------------

const gameOver = () => {
  isGameOver = true;
  console.log("GAMEOVER"); //remove this later!
  //check this works!!!
  if (Number(score) > Number(highscore)) {
    localStorage.setItem("storedScore", score.toString());
  }
};

// eventListner on the page
window.addEventListener("keydown", startGamePlay);

generateFood(); //generate first food position on load
displayScore(); //display default score on load

// KEY CODES:
// left = 37
// up = 38
// right = 39
// down = 40

// ---- NEXT STEPS!! ----
// Collision detections...
// -if snake hits wall game over
// -if snake hits self game over
// want to add a score to the screen & highscore (local storage)
// add noise to game over
// add mute button??
