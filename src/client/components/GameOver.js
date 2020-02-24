import React from 'react'

// const gameOver = require('../util/images/game-over.png')
// const success = require('../util/images/success.png')

const container = {
    position: "absolute",
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center'
}

const image = {
    width: '50%'
}

const GameOver = ( {win} ) => {
    return (
        <span style={container}>
            <img
                style={image}
                src='/src/client/util/images/game-over.png' 
                alt="perdu"
                />
        </span>
    )
}

export default GameOver