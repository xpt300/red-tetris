import React from 'react'

import styled from 'styled-components'

const Shapes = styled.div`
    width: 10%;
    height: 4vh;
    flex-shrink: 0;
    background-color: ${props => props.block === 0 
                        ? 'white' : props.color };
    outline: 1px solid white;
`

const Cell = (shapes) => {
    let htmlShapes = [];
    if (shapes) {
      shapes.shapes.map((line, index) => {
        if (index > 1) {
          line.map(block => {
            htmlShapes.push(<Shapes block={block} {...shapes} key={htmlShapes.length}/>)
          })
        }
      })
    }
    return htmlShapes
}

export default Cell