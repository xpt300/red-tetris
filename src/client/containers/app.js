import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import AsideRight from '../components/AsideRight'
import AsideLeft from '../components/asideLeft'
import ContainerText from '../components/ContainerText'
import styled from 'styled-components'

import Tetris from "../components/Tetris"
import { restart } from '../../server/controllers'

const Container = styled.div`
  display: flex;
  position: 'relative';
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  height:100%;
`

const Text = styled.h1`
  font-family: 'Press Start 2P';
  color: #FF0000;
  left: 0;
  right: 0;
  text-align: center;
`

const TextEnd = styled.h3`
    position: 'absolute';
    font-family: Montserrat;
    text-align: center;
    margin: 20px;
    left: 0;
    right: 0;
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

  const newShapes = (stage) => {
    dispatch({ type: 'DELETESHAPE', socket, length: store.getState().game.shapes.length, board: stage})
  }

  useEffect(() => {
    function handlekeyupEvent (event) {
      let state = store.getState()
      if (!state.game.start || state.game.end) {
        switch (event.keyCode) {
          case 13 : {
            if (state.game.end) {
              dispatch({ type: 'RESTART', socket})
            } else if (!state.game.start) {
              dispatch({ type: 'START', socket})
            }
            break;
          }
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
    socket.on('shapes', (newShapes) => dispatch({ type: 'NEWSHAPES', newShapes}))
    socket.on('start', (newShapes) => dispatch({ type: 'NEWSHAPES', newShapes}))
    socket.on('newText', (text) => dispatch({ type: 'NEWTEXT', text}))
    socket.on('level', (level) => dispatch({ type: 'NEWLEVEL', level}))
    socket.on('end', (object) => dispatch({ type: 'ENDGAME', object}))
    socket.on('board', (board) => dispatch({ type: 'BOARD', board}))
    socket.on('restart', (object) => dispatch({ type: 'restart', object}))
  }, [])

  return (
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
        {game.textEnd ? <TextEnd>{game.textEnd}</TextEnd> : null}
    </Fragment>
  )
}

export default App


