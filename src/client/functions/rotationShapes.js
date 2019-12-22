const checkPoint = (board, y ,x) => {
    if (x < 10 && x >= 0 && y < 23 && y >= 0) {
        if (board[y][x] > 0 && board[y][x] < 10) {
            return true
        }
    }
    return false
}

const pointChange = (board, pointCenter) => {
    let tab = []
    for (let y = pointCenter[0] - 3; y < pointCenter[0] + 3; y++) {
        for (let x = pointCenter[1] - 3; x < pointCenter[1] + 3; x++) {
            if (checkPoint(board, y, x)) {
                tab.push([[y], [x]])
            }
        }
    }
    return tab
}

const searchCenter = (board) => {
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] < 0) {
                return [
                    y, 
                    x
                ]
            }
        }
    }
    return null
}

const alreadyTurnOn = (changePoint, ) => {

}

const rotationPoint = (board, tab, pointCenter) => {
    let diffCoor = [] 
    let vecteur = []
    let changePoint = []
    let negatif = false
    tab.map(point => {
        diffCoor = [
            point[0] - pointCenter[0],
            point[1] - pointCenter[1]
        ],
        vecteur = [
            0 * (diffCoor[0]) + 1 * (diffCoor[1]) ,
            (-1) * (diffCoor[0]) + 0 * (diffCoor[1]) 
        ]
        if (pointCenter[0] + vecteur[0] < 0 || pointCenter[1] + vecteur[1] < 0) {
            negatif = true
        }
        changePoint.push([pointCenter[0] + vecteur[0], pointCenter[1] + vecteur[1]])
    })
    if (!negatif) {
        changePoint.map((arrayPoint, index) => {
            board[arrayPoint[0]][arrayPoint[1]] = 1
            il faut regarder si on ne sors pas du jeu et si il y n'y pas de doublons quand on eneleve les points avec zero
            // if (alreadyTurnOn(arrayPoint, changePoint)) {
            //     console.log(true);
            // }
        })
    }
    return board
}

export const rotationShape = (board) => {
    const pointCenter = searchCenter(board)
    if (pointCenter) {
        let tab = pointChange(board, pointCenter)
        console.log('tab', tab);
        board = rotationPoint(board, tab, pointCenter)
    }
    return board
}
