import React, {useState, useEffect} from 'react'

import drawBoard from '../functions/drawBoard'
import useInterval from '../functions/useInterval'
import {moveShapesDown} from '../functions/moveShapes'

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


export const Board = () => {
  const [enter, setEnter] = useState(false)

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

  useInterval(() => {
    board = moveShapesDown(board)
    console.log(board);
    // drawBoard(board)
  }, 1000);

  return (
    <div style={containerTetris}>
      {
        drawBoard(board)
      }
    </div>
  )
}
