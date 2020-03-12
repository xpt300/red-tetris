import React from 'react'

import Win from '../util/images/success.png'
import End from '../util/images/game-over.png'

const container = {
    position: "absolute",
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
}

const image = {
    width: '50%'
}

const GameOver = ({win}) => {
    return (
        <span style={container}>
            <img
                style={image}
                src={win ? Win : End}
                alt={win ? "gagne" : "perdu"}
                />
        </span>
    )
}

export default GameOver