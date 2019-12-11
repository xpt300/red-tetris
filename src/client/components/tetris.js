import React, {useState, useEffect} from 'react'

import drawBoard from '../functions/drawBoard'
import useInterval from '../functions/useInterval'
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

const containerText = {
  textAlign: 'center',
  width: '100%',
  heigth: '100%',
}

export const Tetris = () => {
  return (
    <Board/>
  )
}

const text = () => {
  return (
    <div style={containerText}>
      Press 'Enter' for start
    </div>
  )
}

let board = [
  [0,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,11,11,0,0,0,0],
  [0,0,0,0,11,11,0,0,0,0]
];


export const Board = () => {
  const [enter, setEnter] = useState(false)
  const [html, setHtml] = useState(drawBoard(board))

  
  let htmlBoard = drawBoard(board)

  useInterval(() => {
    board = moveShapesDown(board)
    setHtml(drawBoard(board))
    console.log(board);
  }, 1000);

  useEffect(() => {
    function handlekeyupEvent (event) {
      if (event.keyCode === 37) {
        board = moveShapesLeft(board)
        setHtml(drawBoard(board))
      } else if (event.keyCode === 39) {
        board = moveShapesRight(board)
        setHtml(drawBoard(board))
      } else if (event.keyCode === 40) {
        board = moveShapesDown(board)
        setHtml(drawBoard(board))
      }
    }
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.addEventListener('keyup', handlekeyupEvent)
    }
  }, [])

  return (
    <div style={containerTetris}>
      {
        htmlBoard
      }
    </div>
  )
}
