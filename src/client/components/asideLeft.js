import React from 'react'

import Cell from '../components/Cell'
import styled from 'styled-components'

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
const TextInput = styled.h2`
    font-family: Montserrat;
    color: ${props => props.color};
`

const AsideLeft = (shape) => {
    let htmlShapes = Cell(shape.shapes[1])
    return (
        <Aside>
            <TextContainer>
                <Text>NEXT</Text>
                <ContainerShapes>
                {htmlShapes}
                </ContainerShapes>
                <Text>SCORE</Text>
                <TextInput color='#FF3333'>0</TextInput>
                <Text>LEVEL</Text>
                <TextInput color='#5DFF33'>0</TextInput>
            </TextContainer>
        </Aside>
    )
}

export default AsideLeft