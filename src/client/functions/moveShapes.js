import { freeze } from './freeze'

export const moveShapesDown = (board, endGame, shapes, newShapes) => {
    let canMove = true;
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                if (y === 22 || board[y + 1][x] > 10) {
                    canMove = false;
                    board = freeze(board, endGame, shapes, newShapes)
                }
            }
        }
    }
    if (canMove) {
        for (let y=22; y >= 0; y--) {
            for (let x=0; x < 10; x++) {
                if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                    board[y + 1][x] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
    }
    return board
}

export const moveShapesLeft = (board) => {
    let canMove = true;
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                if (x === 0 || board[y][x - 1] > 10) {
                    canMove = false;
                }
            }
        }
    }
    if (canMove) {
        for (let y=22; y >= 0; y--) {
            for (let x=0; x < 10; x++) {
                if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                    board[y][x - 1] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
    }
    return board
}

export const moveShapesRight = (board) => {
    let canMove = true;
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                if (x === 9 || board[y][x + 1] > 10) {
                    canMove = false;
                }
            }
        }
    }
    if (canMove) {
        for (let y=22; y >= 0; y--) {
            for (let x=10; x >= 0; x--) {
                if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                    board[y][x + 1] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
    }
    return board
}
