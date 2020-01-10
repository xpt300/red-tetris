import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import Tetris from '../components/tetris'
import Aside from '../components/aside'
import AsideLeft from '../components/asideLeft'
import ContainerText from '../components/ContainerText'
import CreateBoard from '../functions/createBoard'

const container = {
  display: "flex",
  position: 'relative',
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "nowrap",
  height:"100vh"
}

const App = () => {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const store = useStore()

  const endGame = () =>  {
    dispatch({ type:'END' })
  }

  const newShapes = (board) => {
    dispatch({ type: 'SHAPES', board: board})
  }

  useEffect(() => {
    function handlekeyupEvent (event) {
      let state = store.getState()
      if (event.keyCode === 13 && !state.game.start) {
        dispatch({ type: 'START'})
      }
    }
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.removeEventListener('keyup', handlekeyupEvent)
    }
  }, [game.shapes])

  return (
    <Fragment>
      <div style={container}>
        <AsideLeft shapes={store.getState().game.newShapes}/>
        { game.start && game.shapes ? 
            <Tetris
              endGame={endGame}
              newShapes={newShapes} 
              store={store.getState()}
              end={store.getState().game.end} 
              shapes={store.getState().game.shapes}/> 
            : <ContainerText text="Press <Enter> for START" />}
        <Aside />
      </div>
    </Fragment>
  )
}

export default App


