const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const startButton = document.getElementById("startButton");
const board = document.getElementById("board");

let currentPlayer = "X";
let gameActive = false;
let winner = null;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.id.split("-")[1]);

  if (clickedCell.textContent !== "" || !gameActive) {
    return;
  }

  // Update cell text content
  clickedCell.textContent = currentPlayer;

  // Check for winner
  checkWinner();

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Check for draw
  if (!winner && Array.from(cells).every((cell) => cell.textContent !== "")) {
    gameActive = false;
    message.textContent = "¡Empate!";
  }
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    const cellA = cells[a].textContent;
    const cellB = cells[b].textContent;
    const cellC = cells[c].textContent;

    if (cellA !== "" && cellA === cellB && cellB === cellC) {
      gameActive = false;
      winner = cellA;
      highlightWinningCells(combination);
      message.textContent = `¡${winner} gana!`;
      return;
    }
  }
}

function highlightWinningCells(combination) {
  for (let index of combination) {
    cells[index].classList.add("winner");
  }
}

function handleRestartGame() {
  currentPlayer = "X";
  gameActive = true;
  winner = null;
  message.textContent = "";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}

startButton.addEventListener("click", () => {
  gameActive = true;
  message.textContent = "";
  handleRestartGame();
});

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
