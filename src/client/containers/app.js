import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import AsideRight from '../components/AsideRight'
import AsideLeft from '../components/asideLeft'
import ContainerText from '../components/ContainerText'
import styled from 'styled-components'

import Tetris from "../components/Tetris"

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

  const handleScore = (score) => {
    dispatch({ type : 'SCORE', score, socket})
  }

  const handleLevel = (ope) => {
    dispatch({ type : 'LEVEL', ope, socket})
  }

  const newShapes = () => {
    if (store.getState().game.shapes.length <= 6) {
      dispatch({ type: 'SHAPES', socket})
    }
    dispatch({ type: 'DELETESHAPE', socket})
  }

  useEffect(() => {
    function handlekeyupEvent (event) {
      let state = store.getState()
      if (!state.game.start) {
        switch (event.keyCode) {
          case 13 : 
            dispatch({ type: 'START', socket})
            break;
          case 107 :
              if (state.game.level < 5) handleLevel('+')
              break;
          case 109 :
              if (state.game.level > 0) handleLevel('-')
              break;
        }
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
    socket.on('start', (newShapes) => dispatch({ type: 'NEWSHAPES', newShapes}))
    socket.on('shapes', (newShapes) => dispatch({ type: 'NEWSHAPES', newShapes}))
    socket.on('newText', (text) => dispatch({ type: 'NEWTEXT', text}))
    socket.on('level', (level) => dispatch({ type: 'NEWLEVEL', level}))
    socket.on('end', (score) => dispatch({ type: 'ENDGAME', score}))
    socket.on('board', (board) => dispatch({ type: 'BOARD', board}))
  }, [])

  return console.log(store.getState().game) || (
    <Fragment>
        <Text>RED TETRIS</Text>
        <Container>
          <AsideLeft {...store.getState().game}/>
          {game.start && game.shapes ? 
              <Tetris
                endGame={endGame}
                newShapes={newShapes}
                handleScore={handleScore}
                socket={socket}
                store={store.getState().game}/> 
               : <ContainerText text={game.text} />}
          <AsideRight {...store.getState().game}/>
        </Container>
    </Fragment>
  )
}

export default App


