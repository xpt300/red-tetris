import React, { Fragment } from 'react'

import styled from 'styled-components'

import ContainerStagePhantom from '../components/ContainerStagePhantom'

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 40vh;
    height: 50vh;
    flex-direction: column;
`

const Text = styled.h1`
    font-family: Montserrat;
    text-align: center;
`

const Aside = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    width: 100%;
`

const TextInput = styled.h2`
    font-family: Montserrat;
    color: ${props => props.color};
`

const AsideRight = ({scoreAdversary, boardAdversary, numberPlayer, name}) => {
    return (
    <Aside>
        {numberPlayer > 1 ?
        <Fragment>
            <Text>Adversaire</Text>
            <TextContainer>
                <ContainerStagePhantom boardAdversary={boardAdversary} name={name}/>
            </TextContainer>
        </Fragment>
          : null}
        
            {scoreAdversary && 
            <Text>SCORE FINAL</Text> && 
            scoreAdversary.map(player => 
                <TextInput color='#FF3333'>{player.name}</TextInput>        
            )}
    </Aside>
    )
}

export default AsideRight