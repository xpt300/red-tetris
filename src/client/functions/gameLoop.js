import {moveShapesDown} from '../functions/moveShapes'
import drawBoard from '../functions/drawBoard'

const gameLoop = (board) => {
    console.log("Game Loop", board);
    board = moveShapesDown(board)
    setTimeout(gameLoop, 1000)
    return drawBoard(board)
}

export default gameLoop;