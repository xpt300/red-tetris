import { brotliCompress } from "zlib";

const checkLines = (board) => {
    for (let y = 0; y < 20; y++) {
        let fullLines = true
        for (let x = 0; x < 10; x++) {
            if (board[y][x] < 10) {
                fullLines = false
            } else if (board[y][x] > 10 && y === 0) {
                console.log('PERDUUUUU');
            }
        }
        if (fullLines) {
            board.splice(y, 1);
            board.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
            y--;
        }
    }
    return board
}

const freeze = (board) => {
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > 0 && board[y][x] < 10) {
                board[y][x] = board[y][x] + 10
            }
        }
    }
    board = checkLines(board);
    board[0] = [0,0,0,0,1,1,0,0,0,0];
    board[1] = [0,0,0,0,1,1,0,0,0,0]
    return board
}

export const moveShapesDown = (board) => {
    let canMove = true;
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > 0 && board[y][x] < 10) {
                if (y === 19 || board[y + 1][x] > 10) {
                    canMove = false;
                    board = freeze(board)
                }
            }
        }
    }
    if (canMove) {
        for (let y=19; y >= 0; y--) {
            for (let x=0; x < 10; x++) {
                if (board[y][x] < 10 && board[y][x] > 0) {
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
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > 0 && board[y][x] < 10) {
                if (x === 0 || board[y][x - 1] > 10) {
                    canMove = false;
                }
            }
        }
    }
    if (canMove) {
        for (let y=19; y >= 0; y--) {
            for (let x=0; x < 10; x++) {
                if (board[y][x] < 10 && board[y][x] > 0) {
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
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > 0 && board[y][x] < 10) {
                if (x === 9 || board[y][x + 1] > 10) {
                    canMove = false;
                }
            }
        }
    }
    if (canMove) {
        for (let y=19; y >= 0; y--) {
            for (let x=10; x >= 0; x--) {
                if (board[y][x] < 10 && board[y][x] > 0) {
                    board[y][x + 1] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
    }
    return board
}
