//Query Selectors
let gameBoard = document.querySelector(".game-board");
let gameStatus = document.querySelector(".game-status");
let cell = Array.from(document.querySelectorAll(".cell"));
let buttonReset = document.querySelector(".button-reset");
let scores = document.querySelector(".scores");

//event listeners

// constants/variables
let gameStart = true;
let currentPlayer = "X";
let board;
let win;
let [xScore, oScore] = [0, 0];

//init & render
function initGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  render();
}

initGame();

function render() {
  board.forEach((mark, index) => {
    console.log(board[index]);
    cell[index].textContent = mark;
  });
  playerTurnNotification();
}

function displayScore() {
  if (win === "X") {
    xScore++;
  }
  if (win === "O") {
    oScore++;
  }
  console.log(xScore, oScore);
  console.log(win);
}

function playerTurnNotification() {
  gameStatus.innerText = `It's ${currentPlayer}'s turn. Make a move!`;
}

//Event Listeners
gameBoard.addEventListener("click", handleTurn);
buttonReset.addEventListener("click", initGame);

function handleTurn(e) {
  let { target } = e;
  let idx = cell.findIndex((cell) => cell === target);
  board[idx] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  win = getWinner();
  render();
  displayScore(win);

  gameStatus.innerText =
    win === "T"
      ? `That's a tie!`
      : win
      ? `${win} wins the game!`
      : `It's ${currentPlayer}'s turn!`;
}

//win logic
//if each row is filled with X or O
//if each column is filled with X or O
//if the game board is filled diagonally with X or O
let winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner() {
  let winner = null;

  winningCombos.forEach((combo, idx) => {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
