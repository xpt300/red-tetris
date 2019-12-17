import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import drawBoard from '../functions/drawBoard'
import useInterval from '../functions/useInterval'
import checkFirstLine from '../functions/checkFirstLine'
import { moveShapesDown, moveShapesLeft, moveShapesRight} from '../functions/moveShapes'


const containerTetris = {
  display: "flex",
  alignItems: 'stretch',
  flexWrap: 'wrap',
  alignContent: 'center',
  width: '40vh',
  height: '80vh',
  border: '2px solid black',
  backgroundColor: 'grey',
}

const Tetris = ({ board, endGame, end }) => {
  // const end = useSelector(state => state.game.end)
  const [html, setHtml] = useState(drawBoard(board))
  const [delay, setDelay] = useState(1000)

  
  let htmlBoard = drawBoard(board)
  
  useInterval(() => {
    board = moveShapesDown(board,endGame)
    setHtml(drawBoard(board))
  }, end ? null : delay);

  useEffect(() => {
    function handlekeyupEvent (event) {
      if (!end) {
        if (event.keyCode === 37) {
          board = moveShapesLeft(board)
          setHtml(drawBoard(board))
        } else if (event.keyCode === 39) {
          board = moveShapesRight(board)
          setHtml(drawBoard(board))
        } else if (event.keyCode === 40) {
          board = moveShapesDown(board, endGame)
          setHtml(drawBoard(board))
        }
      }
    }
    document.addEventListener('keydown', handlekeyupEvent)
    return () => {
      document.removeEventListener('keydown', handlekeyupEvent)
    }
  }, [])

  return (
    <div style={containerTetris}>
      { htmlBoard }
    </div>
  )
}

export default Tetris