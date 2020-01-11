import React, {useState, useEffect, Fragment} from 'react'

import drawBoard from '../functions/drawBoard'
import useInterval from '../hook/useInterval'
import addShapes from '../functions/addShapes'
import createBoard from '../functions/createBoard'
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

const Tetris = ({ endGame, end, shapes, newShapes, color }) => {
  const [board, setBoard] = useState(addShapes(createBoard(), shapes))
  const [html, setHtml] = useState(drawBoard(board, color))
  const [delay, setDelay] = useState(1000)
  
  let htmlBoard = drawBoard(board, color)
  
  useInterval(() => {
    setBoard(moveShapesDown(board,endGame, newShapes))
    setHtml(drawBoard(board, color))
  }, end ? null : delay);


  useEffect(() => {
    board[0] = shapes[0]
    board[1] = shapes[1]
    board[2] = shapes[2]
    board[3] = shapes[3]
    const handlekeyupEvent = (event) => {
      if (!end) {
        if (event.keyCode === 37) {
          setBoard(moveShapesLeft(board))
        } else if (event.keyCode === 39) {
          setBoard(moveShapesRight(board))
        } else if (event.keyCode === 40) {
          setBoard(moveShapesDown(board, endGame, newShapes))
        } else if (event.keyCode === 32) {
          setBoard(rotationShape(board))
        }
        setHtml(drawBoard(board, color))
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