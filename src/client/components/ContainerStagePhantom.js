import React, { Fragment } from 'react'

import styled from 'styled-components'
import GameOver from './GameOver'
import StagePhantom from './StagePhantom';

const container = {
    display: "flex",
    alignItems: 'stretch',
    flexWrap: 'wrap',
    height: '80%',
    position: 'relative',
    margin: '10px',
    maxWidth: '13.5vh',
    backgroundColor: 'grey',
    flex: '1'
}

const TextInput = styled.h2`
    font-family: Montserrat;
    width: 100%;
    text-align: center;
    color: ${props => props.color};
`

const ContainerStagePhantom = ({boardAdversary, name}) => {
    return (
        <Fragment>
            {boardAdversary ? boardAdversary.map((adversary, index) => {
                if (adversary.name != name) {
                    return (
                    <div style={container} key={index}>
                        <StagePhantom stage={adversary.board}/>
                        {adversary.end ? <GameOver win={false}/> : null}
                        <TextInput color='#FF3333'>{adversary.name}</TextInput>
                    </div>
                    )
                } else return
            }) : null}
        </Fragment>
    )
}

export default ContainerStagePhantom