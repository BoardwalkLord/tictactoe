const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let board = ['', '', '', '', '', '', '', '', ''];
let playerTurn = true;
let gameOver = false;

function checkWin(player, board) {
    for (let combo of winningCombinations) {
        if (board[combo[0]] == player && board[combo[1]] == player && board[combo[2]] == player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return board.every(cell => cell != '');
}

function computerMove() {
    let emptyCells = board.map((cell, index) => index).filter(index => board[index] == '');
    for (let cell of emptyCells) {
        let tempBoard = [...board];
        tempBoard[cell] = 'O';
        if (checkWin('O', tempBoard)) {
            board[cell] = 'O';
            return cell;
        }
    }
    for (let cell of emptyCells) {
        let tempBoard = [...board];
        tempBoard[cell] = 'X';
        if (checkWin('X', tempBoard)) {
            board[cell] = 'O';
            return cell;
        }
    }
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = 'O';
    return randomCell;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    playerTurn = true;
    gameOver = false;
    document.getElementById('message').textContent = '';
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).textContent = '';
    }
}

for (let i = 0; i < 9; i++) {
    document.getElementById(i).addEventListener('click', function(event) {
        let index = event.target.id;
        if (!gameOver && playerTurn && board[index] == '') {
            board[index] = 'X';
            event.target.textContent = 'X';
            if (checkWin('X', board)) {
                document.getElementById('message').textContent = 'Player wins!';
                gameOver = true;
            } else if (isBoardFull()) {
                document.getElementById('message').textContent = 'Draw!';
                gameOver = true;
            } else {
                playerTurn = false;
                let computerIndex = computerMove();
                document.getElementById(computerIndex).textContent = 'O';
                if (checkWin('O', board)) {
                    document.getElementById('message').textContent = 'Computer wins!';
                    gameOver = true;
                } else if (isBoardFull()) {
                    document.getElementById('message').textContent = 'Draw!';
                    gameOver = true;
                } else {
                    playerTurn = true;
                }
            }
        }
    });
}

document.getElementById('reset').addEventListener('click', resetGame);
