import { useStore } from 'react-redux'

const vecteur = [
    [0, 1],
    [-1, 0]
]

const checkPoint = (board, y ,x) => {
    if (x < 10 && x > 0 && y < 23 && y > 3) {
        if (board[y][x] > 0 && board[y][x] < 10) {
            return true
        }
    }
    return false
}

const pointChange = (board, pointCenter) => {
    let tab = []
    for (let y = pointCenter[0] - 2; y < pointCenter[0] + 2; y++) {
        for (let x = pointCenter[1] - 2; x < pointCenter[1] + 2; x++) {
            console.log(board[y][x])
            if (checkPoint(board, y, x)) {
                console.log('shape,', board[y][x]);
                tab.push([[y], [x]])
            }
        }
    }
    return tab
}

const searchCenter = (board) => {
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] === 2) {
                return [
                    y, 
                    x
                ]
            }
        }
    }
    return null
}

export const shapesRotation = (board, shape) => {
    const pointCenter = searchCenter(board)
    if (shape.game.numberShapes!= 4 && pointCenter) {
        let tab = pointChange(board, pointCenter)
        console.log(tab);
        console.log(board);
    }
    return board
}
