import React from 'react'

import drawShapes from '../functions/drawShapes'

const aside = {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'center',
    justifyContent: 'center',
    flex: '1',
    width: '100%',
}

const text = {
    position: 'absolute',
    fontFamily: 'Montserrat'
}

const containerShapes = {
    display: "flex",
    alignItems: 'stretch',
    flexWrap: 'wrap',
    alignContent: 'start',
    width: '40vh',
    height: '80vh',
  }

const AsideLeft = (shapes) => {
    let htmlShapes = drawShapes(shapes.shapes)
    return (
        <div style={aside}>
            <h1 style={text}>NEXT</h1>
            <div style={containerShapes}>
            {htmlShapes}
            </div>
        </div>
    )
}

export default AsideLeft