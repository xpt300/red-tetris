import React, {useState, useEffect} from 'react'

import drawBoard from '../functions/drawBoard'
import gameLoop from '../functions/gameLoop'

const containerTetris = {
  display: "flex",
  alignItems: 'stretch',
  flexWrap: 'wrap',
  alignContent: 'center',
  width: '40vh',
  height: '80vh',
  padding: '10vh 35vw 10vh 35vw',
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
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ];

  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      if (e.charCode === 13) {
        setEnter(true)
      }
    })
  })

  return (
    <div style={containerTetris}>
      {
        drawBoard(board),
        gameLoop(board)
      }
    </div>
  )
}
