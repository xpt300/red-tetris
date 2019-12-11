import { brotliCompress } from "zlib";

const beside = () => {

}

export const moveShapesDown = (board) => {
    let canMove = true;
    for (let y=0; y < 19; y++) {
        for (let x=0; x < 10; x++) {
            if (y === 19 || board[y+1][x] > 10) {
                canMove = false;
                console.log(x,y, board.length);
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
