const boardElement = document.getElementById("board");
const winnerElement = document.getElementById("winner");
let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (!board[index] && gameActive) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        checkWinner();
        createBoard();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winnerElement.textContent = `${board[a]} Wins!`;
            gameActive = false;
        }
    });

    if (!board.includes(null) && gameActive) {
        winnerElement.textContent = "It's a Draw!";
        gameActive = false;
    }
}

function resetBoard() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    winnerElement.textContent = "";
    createBoard();
}

createBoard();