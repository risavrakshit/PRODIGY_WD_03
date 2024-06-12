document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (gameBoard[index] || !isGameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            isGameActive = false;
        } else if (gameBoard.every(cell => cell)) {
            alert('Draw!');
            isGameActive = false;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            return condition.every(index => gameBoard[index] === currentPlayer);
        });
    }

    function resetGame() {
        gameBoard = Array(9).fill(null);
        isGameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
