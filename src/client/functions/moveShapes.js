import newShapes from '../functions/newShapes'

const checkLines = (board, endGame) => {
    for (let y = 0; y < 23; y++) {
        let fullLines = true
        for (let x = 0; x < 10; x++) {
            if (board[y][x] < 10) {
                fullLines = false
            } else if (board[y][x] > 10 && y === 0) {
                endGame();
                console.log('PERDU');
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

const freeze = (board, endGame) => {
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                if (board[y][x] < 0) {
                    board[y][x] = (board[y][x] * -1) + 10
                } else {
                    board[y][x] = board[y][x] + 10
                }
            }
        }
    }
    board = checkLines(board, endGame);
    const shapes = newShapes(Math.floor(Math.random() * 7))
    board[0] = shapes[0]
    board[1] = shapes[1]
    board[2] = shapes[2]
    board[3] = shapes[3]
    return board
}

export const moveShapesDown = (board, endGame) => {
    let canMove = true;
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > -10 && board[y][x] < 0 || board[y][x] > 0 &&  board[y][x] < 10) {
                if (y === 22 || board[y + 1][x] > 10) {
                    canMove = false;
                    board = freeze(board, endGame)
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
