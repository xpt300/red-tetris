import React from 'react'

const hiddenBox = {
    width: '10%',
    height: '5%',
    flexShrink: '0',
    backgroundColor: 'black',
    outline: '1px solid black'
}

const redBox = {
    width: '10%',
    height: '5%',
    flexShrink: '0',
    backgroundColor: 'red',
    outline: '1px solid black'
}

const drawBoard = (board) => {
    let htmlBoard = [];
    board.map((line, index) => {
      if (index > 2) {
        line.map(cell => {
          if (cell === 0) {
            htmlBoard.push(<div style={hiddenBox} key={htmlBoard.length}/>)
          } else {
            htmlBoard.push(<div style={redBox} key={htmlBoard.length}/>)
          }
        })
      }
    })
    return htmlBoard
}

export default drawBoard