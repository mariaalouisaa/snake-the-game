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

// ------------ COUNTDOWN -------------

// function where the action starts! Called on keypress
const startGamePlay = (e) => {
  if (!gameStarted && e.keyCode === 13) {
    //Remove the instructions text
    ctx.beginPath();
    ctx.rect(0, canvas.height / 2 - 30, canvas.width, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    gameStarted = true;

    //Play sound and call countdown func
    countDownAudio.play();
    displayCountDown();
  } else {
    null;
    // if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) changeDirection(e.keyCode);
    // this function should move the snake depending what arrow is clicked...
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
      // fill the text area (to get rid of old text)
      ctx.beginPath();
      ctx.rect(0, canvas.height / 2 - 30, canvas.width, 50);
      ctx.fillStyle = "black";
      ctx.fill();
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

// The amount of the pixel the snake will move along x & y
// automatic direction is snake moving right
let xDirection = 20;
let yDirection = 0;

const playSnake = () => {
  setTimeout(() => {
    // wrapped in settimeout for smooth gameplay
    // func to clear the board to go here
    // func to move the snake to go here
    drawSnake();
  }, 200);
};

const drawSnake = () => {
  snakeParts.forEach((part) => {
    ctx.fillStyle = "green";
    ctx.fillRect(part.x, part.y, 20, 20);
    ctx.strokeRect(part.x, part.y, 20, 20); // gives outline to each part
  });
};

const moveSnake = () => {
  const newBlock = { x: snake[0].x + xDirection, y: snake[0].y };
  snake.unshift(firstBlock); // add newBlock to front of snake
  snake.pop(); // remove last block
};

// eventListner on the page
window.addEventListener("keypress", startGamePlay);

// KEY CODES:
// left = 37
// up = 38
// right = 39
// down = 40

//draw snake and food
//check if key is up/down/left/right
// want to add a score to the screen & highscore (local storage)
