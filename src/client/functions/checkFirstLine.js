const checkFirstLine = (board, endGame) => {
    for (let y = 0; y < 1; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] > 10 && y === 0) {
                endGame();
            }
        }
    }
}

export default checkFirstLine