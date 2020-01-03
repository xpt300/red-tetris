import React, {useState, useEffect, Fragment} from 'react'

import drawBoard from '../functions/drawBoard'
import useInterval from '../functions/useInterval'
import { moveShapesDown, moveShapesLeft, moveShapesRight } from '../functions/moveShapes'
import { rotationShape } from '../functions/rotationShapes'
import EndText from './EndText'


const containerTetris = {
  display: "flex",
  alignItems: 'stretch',
  flexWrap: 'wrap',
  alignContent: 'center',
  width: '40vh',
  height: '80vh',
  backgroundColor: 'grey',
}

const Tetris = ({ board, endGame, end, shapes, newShapes }) => {
  const [html, setHtml] = useState(drawBoard(board))
  const [delay, setDelay] = useState(1000)

  
  let htmlBoard = drawBoard(board)
  
  useInterval(() => {
    board = moveShapesDown(board,endGame, newShapes)
    setHtml(drawBoard(board))
  }, end ? null : delay);


  useEffect(() => {
    board[0] = shapes[0]
    board[1] = shapes[1]
    board[2] = shapes[2]
    board[3] = shapes[3]
    const handlekeyupEvent = (event) => {
      if (!end) {
        if (event.keyCode === 37) {
          board = moveShapesLeft(board)
        } else if (event.keyCode === 39) {
          board = moveShapesRight(board)
        } else if (event.keyCode === 40) {
          board = moveShapesDown(board, endGame, newShapes)
        } else if (event.keyCode === 32) {
          board = rotationShape(board)
        }
        setHtml(drawBoard(board))
      }
    }
    document.addEventListener('keydown', handlekeyupEvent)
    return () => {
      document.removeEventListener('keydown', handlekeyupEvent)
    }
  }, [end, shapes])

  return (
    <Fragment>
      <div style={containerTetris}>
        { htmlBoard }
      </div>
      {end ? <EndText text="Perdu" /> : null}
    </Fragment>
  )
}

export default Tetris