// ------------ BOARD SETUP -------------

let gameStarted = false;
let countdownText = 4;
const countDownAudio = new Audio("countdown.wav"); // beep mp3
const foodEatenAudio = ""; // munch mp3
const gameOverAudio = ""; // game over mp3

// establishing canvas on the page
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// setting canvas background
canvas.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// fillRect() params = (x start, y start, width, height)

// displaying 'score' text on canvas
ctx.font = "16px monospace";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("score:", 370, 20);

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

// ------------ CLEAR BOARD FUNC -------------
//used throughtout all the sections

const clearBoard = () => {
  ctx.beginPath();
  ctx.rect(0, 30, canvas.width, canvas.height - 10);
  ctx.fillStyle = "grey"; // change to black later!! Only grey so I can see it atm
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

// The amount of the pixel the snake will move along x & y
// automatic direction is snake moving right
let xDirection = 20;
let yDirection = 0;

const playSnake = () => {
  setTimeout(() => {
    // wrapped in settimeout for smooth gameplay
    clearBoard();
    moveSnake();
    drawSnake();
    playSnake();
  }, 600);
};

const generateFood = () => {
  //draw the food first so it's beneth the snake
  let random1 = Math.random() * 420;
  foodx = random1 - (random1 % 20); // must be multiple of 20
  let random2 = Math.random() * (420 - 30) + 30; // not top 30px of board
  foody = random2 - (random2 % 20);
};

const drawSnake = () => {
  //draw the food first so its beneth the snake
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

const collisionDetect = () => {};

// eventListner on the page
window.addEventListener("keydown", startGamePlay);

generateFood(); //generate first food position on load

// KEY CODES:
// left = 37
// up = 38
// right = 39
// down = 40

// ---- NEXT STEPS!! ----
// draw food in random position (math random()) NOT top 30px
// Collision detections...
// -if snake hits food grow snake
// -if snake hits wall game over
// -if snake hits self game over
// want to add a score to the screen & highscore (local storage)
// add noise when snake eats food
// add noise to game over
