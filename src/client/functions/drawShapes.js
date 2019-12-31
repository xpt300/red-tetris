import React from 'react'

const hiddenBox = {
    width: '10%',
    height: '5%',
    flexShrink: '0',
    // backgroundColor: 'black',
    // outline: '1px solid black'
}

const redBox = {
    width: '10%',
    height: '5%',
    flexShrink: '0',
    backgroundColor: 'red',
    outline: '1px solid white'
}

const drawShapes = (shapes) => {
    let htmlShapes = [];
    if (shapes.length > 0) {
      shapes.map((line, index) => {
        line.map(block => {
          if (block === 0) {
            htmlShapes.push(<div style={hiddenBox} key={htmlShapes.length}/>)
          } else {
            htmlShapes.push(<div style={redBox} key={htmlShapes.length}/>)
          }
        })
      })
    }
    return htmlShapes
}

export default drawShapes