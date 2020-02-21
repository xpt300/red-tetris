import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import Tetris from '../components/tetris'
import Aside from '../components/aside'
import AsideLeft from '../components/asideLeft'
import ContainerText from '../components/ContainerText'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  position: 'relative';
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  height:100vh;
`

const Text = styled.h1`
  position: absolute;
  font-family: 'Press Start 2P';
  color: #FF0000;
  left: 0;
  right: 0;
  text-align: center;
`

const App = ({socket}) => {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const store = useStore()

  const endGame = () =>  {
    dispatch({ type:'END', socket })
  }

  const newShapes = (board) => {
    dispatch({ type: 'SHAPES', board: board, socket})
  }

  useEffect(() => {
    function handlekeyupEvent (event) {
      let state = store.getState()
      if (event.keyCode === 13 && !state.game.start) {
        dispatch({ type: 'START', socket})
      }
    }
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.removeEventListener('keyup', handlekeyupEvent)
    }
  }, [game.shapes])

  useEffect(() => {
    if (!game.text) {
      dispatch({ type: 'ROOM', socket})
    }
    // socket.on('start', (shapes) => dispatch({ type: 'NEWSHAPES', shapes}))
    socket.on('newText', (text) => dispatch({ type: 'NEWTEXT', text}))
  }, [])

  return (
    <Fragment>
        <Text>RED TETRIS</Text>
        <Container>
          <AsideLeft shapes={store.getState().game.shapes}/>
          {/* { game.start && game.shapes ? 
              <Tetris
                endGame={endGame}
                newShapes={newShapes} 
                store={store.getState()}
                end={store.getState().game.end} 
                {...store.getState().game.shapes}/> 
              : <ContainerText text={game.text} />}
          <Aside /> */}
        </Container>
    </Fragment>
  )
}

export default App


