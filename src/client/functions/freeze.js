import { checkLines } from './checkLines'

export const freeze = (board, endGame, newShapes) => {
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
    board = checkLines(board, endGame, newShapes);
    return board
}