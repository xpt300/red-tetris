import React from 'react'

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

const GameOver = ( {win} ) => {
    return (
        <span style={container}>
            <img
                style={image}
                src={win ? '/src/client/util/images/success.png' : '/src/client/util/images/game-over.png'}
                alt="perdu"
                />
        </span>
    )
}

export default GameOver