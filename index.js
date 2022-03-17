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

// want to add a score to the screen & highscore (local storage)

const gameCountdown = () => {
  //have a 3 2 1 count down with beeps!
  //the call the function to start the game
};

//function for game play...
