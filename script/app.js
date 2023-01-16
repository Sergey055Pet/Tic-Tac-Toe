const board = document.querySelector(".borad");
const cells = document.querySelectorAll(".cell");
const tryAgain = document.querySelector(".tryAgain_btn");
const reset = document.querySelector(".reset_btn");
const PlayerXScore = document.querySelector("#playerOneSocore");
const PlayerOScore = document.querySelector("#playerTwoSocore");
let playersSequence = true;
let Oscore = 0;
let Xscore = 0;

const winningCombinations = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //intersecting
  [0, 4, 8],
  [2, 4, 6],
];
//Players
function playerX() {
  playersSequence = false;
  return "x";
}
function playerO() {
  playersSequence = true;
  return "o";
}
//Checker winning combination
function checkWin() {
  for (let condition of winningCombinations) {
    if (
      (cells[condition[0]].textContent === "x" &&
        cells[condition[1]].textContent === "x" &&
        cells[condition[2]].textContent === "x") ||
      (cells[condition[0]].textContent === "o" &&
        cells[condition[1]].textContent === "o" &&
        cells[condition[2]].textContent === "o")
    ) {
      if (playersSequence === true) {
        Oscore++;
        PlayerOScore.textContent = Oscore;
      } else {
        Xscore++;
        PlayerXScore.textContent = Xscore;
      }
      win();
      return true;
    }
  }
}
function win() {
  for (let cell of cells) {
    cell.classList.add("selected");
  }
  board.removeEventListener("click", play);
}

function play(event) {
  if (event.target.matches(".board")) return;
  if (event.target.textContent !== "") return;
  if (playersSequence) {
    event.target.textContent = playerX();
    event.target.style.color = "yellow";
  } else {
    event.target.textContent = playerO();
    event.target.style.color = "lime";
  }
  event.target.classList.add("selected");
  checkWin();
}
function resetAll() {
  playersSequence = true;
  Oscore = 0;
  PlayerOScore.textContent = Oscore;
  Xscore = 0;
  PlayerXScore.textContent = Xscore;

  for (let cell of cells) {
    cell.classList.remove("selected");
    cell.textContent = "";
  }
  board.addEventListener("click", play);
}
function tryAgainFn() {
  playersSequence = true;
  for (let cell of cells) {
    cell.classList.remove("selected");
    cell.textContent = "";
  }
  board.addEventListener("click", play);
}
board.addEventListener("click", play);
reset.addEventListener("click", resetAll);
tryAgain.addEventListener("click", tryAgainFn);
