import React from 'react'

import styled from 'styled-components'

const StyledCell = styled.div`
    width: 10%;
    height: 4vh;
    flex-shrink: 0;
    background: rgba(${props => props.color});
`

const Cell = ({ type, color }) => {
  return (<StyledCell type={type} color={color}></StyledCell>)
}

export default React.memo(Cell)