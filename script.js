// Select Elements
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');

// Game Variables
let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;

// Winning Patterns
const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Handle Cell Click
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for Winner
function checkWinner() {
    return winningPatterns.some(pattern =>
        pattern.every(index => gameState[index] === currentPlayer)
    );
}

// Reset Game
function resetGame() {
    gameState.fill('');
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;
    cells.forEach(cell => (cell.textContent = ''));
}

// Add Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
