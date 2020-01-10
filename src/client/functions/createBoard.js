export const WIDTH = 10
export const HEIGHT = 19 

const createBoard = () => {
    let board = Array.from(Array(HEIGHT), () => {
      return new Array(WIDTH).fill(0)
    })
    return board 
}

export default createBoard