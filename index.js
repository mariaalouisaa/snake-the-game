let gameStarted = false;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// setting canvas background
canvas.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// fillRect() params = (x start, y start, width, height)

// displaying score on canvas
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

//to be called on enter key click
const gameCountdown = (e) => {
  if (!gameStarted && e.keyCode === 13) {
    //Remove the instructions text
    ctx.beginPath();
    ctx.rect(0, canvas.height / 2 - 30, canvas.width, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    gameStarted = true;
    //then display countdown
    //code to go insied this if statement!
  } else {
    playGame();
  }
};

const playGame = () => {
  console.log("Game should begin!");
  //draw snake and food
  //check if key is up/down/left/right
};

window.addEventListener("keypress", gameCountdown);

// function for game play...
// want to add a score to the screen & highscore (local storage)
