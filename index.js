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
    playGame();
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
      if (countdownText !== "GO!") displayCountDown();
    });
};

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

const drawSnake = () => {
  console.log("Game should begin!");
  //draw snake and food
  //check if key is up/down/left/right

  // KEY CODES:
  // left = 37
  // up = 38
  // right = 39
  // down = 40
};

window.addEventListener("keypress", startGamePlay);

// want to add a score to the screen & highscore (local storage)
