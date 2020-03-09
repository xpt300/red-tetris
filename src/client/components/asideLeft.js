import React, { useEffect } from 'react'

import styled from 'styled-components'
import { StagePreview } from './Stage';

import { useStagePreview } from '../hook/useStagePreview'
import { usePlayerPreview } from '../hook/usePlayerPreview'

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 40vh;
    height: 80vh;
    flex-direction: column;
`

const Text = styled.h1`
    font-family: Montserrat;
`

const Aside = styled.div`
    display: flex;
    align-items: stretch;
    align-content: start;
    justify-content: center;
    flex: 1;
    width: 100%;
`

const ContainerShapes = styled.div`
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    align-content: start;
    width: 100%;
    height: 15vh;
`
export const TextInput = styled.h2`
    font-family: Montserrat;
    color: ${props => props.color};
`

const AsideLeft = ({score, level, shapes}) => {
    const [player, resetPlayer] = usePlayerPreview()
    const [stage, setStage, rowsCleared] = useStagePreview(player, resetPlayer)

    useEffect(() => {
        if (shapes[1] && shapes[1].shape) {
            resetPlayer(shapes[1].shape)
        }
    }, [shapes]);

    return (
        <Aside>
            <TextContainer>
                <Text>NEXT</Text>
                <ContainerShapes>
                    {shapes && shapes[1] ? <StagePreview stage={stage}/> : null}
                </ContainerShapes>
                <Text>SCORE</Text>
                <TextInput color='#FF3333'>{score}</TextInput>
                <Text>LEVEL</Text>
                <TextInput color='#5DFF33'>{level}</TextInput>
            </TextContainer>
        </Aside>
    )
}

export default AsideLeft