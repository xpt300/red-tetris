import React, { Fragment } from 'react'

import styled from 'styled-components'

import StagePhantom from './StagePhantom';

const container = {
    display: "flex",
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: '50%',
    height: '80%',
    backgroundColor: 'grey',
}

const TextInput = styled.h2`
    font-family: Montserrat;
    width: 100%;
    text-align: center;
    color: ${props => props.color};
`

const ContainerStagePhantom = ({boardAdversary, name}) => {
    return (
        <div style={container}>
            {boardAdversary ? boardAdversary.map((adversary, index) => {
                if (adversary.name !== name) {
                    return (
                    <Fragment key={index}>
                        <StagePhantom stage={adversary.board}/>
                        <TextInput color='#FF3333'>{adversary.name}</TextInput>
                    </Fragment>
                    )
                } else return
            }) : null}
        </div>
    )
}

export default ContainerStagePhantom