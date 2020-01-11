import React from 'react'

import styled from 'styled-components'

const Shapes = styled.div`
    width: 10%;
    height: 5%;
    flex-shrink: 0;
    background-color: ${props => props.block === 0
                        ? 'black' : props.color };
    outline: 1px solid black;
`

const drawBoard = (board, color) => {
    let htmlBoard = [];
    board.map((line, index) => {
      if (index > 2) {
        line.map(cell => {
          htmlBoard.push(<Shapes block={cell} color={color} key={htmlBoard.length}/>)
        })
      }
    })
    return htmlBoard
}

export default drawBoard