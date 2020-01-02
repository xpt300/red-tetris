import { checkLines } from './checkLines'

export const freeze = (board, endGame, shapes, newShapes) => {
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
    console.log('moveShapes', shapes);
    board[0] = shapes[0]
    board[1] = shapes[1]
    board[2] = shapes[2]
    board[3] = shapes[3]
    newShapes()
    return board
}