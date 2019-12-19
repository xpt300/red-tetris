import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Tetris from '../components/tetris'
import Aside from '../components/aside'
import Popup from '../components/popup'
import StartText from '../components/startText'
import addShapes from '../functions/addShapes'
import createBoard from '../functions/createBoard'
import newShapes from '../functions/newShapes'


const container = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "nowrap",
  height:"100vh"
}

const App = () => {
  const [board, setBoard] = useState(null)
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const random = Math.floor(Math.random() * 7)

  const endGame = () =>  {
    dispatch({ type:'END' })
  }

  useEffect(() => {
    function handlekeyupEvent (event) {
      if (event.keyCode === 13 && !game.start) {
        dispatch({ type: 'START'})
        setBoard(addShapes(createBoard(), newShapes(random)))
      }
    }
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.addEventListener('keyup', handlekeyupEvent)
    }
  }, [game.start, game.shapes])

  return (
    <Fragment>
      <div style={container}>
        <Aside />
        { game.start && board ? 
            <Tetris board={board} endGame={endGame} end={game.end}/> 
            : <StartText text="Press <Enter> for START" />}
        <Aside />
      </div>
    </Fragment>
  )
}

export default App


