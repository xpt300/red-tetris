import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Tetris } from '../components/tetris'
import Aside from '../components/aside'
import Popup from '../components/popup'
import StartText from '../components/startText'

const container = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "nowrap",
  height:"100vh"
}

const App = ({message, start, win, end}) => {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)

  useEffect(() => {
    function handlekeyupEvent (event) {
      if (event.keyCode === 13) {
        dispatch({ type: 'START'})
      }
    }
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.addEventListener('keyup', handlekeyupEvent)
    }
  }, [game.start])

  return (
    <Fragment>
      {/* {popup ? 
        <Popup 
        handleLogin={(value) => handleLogin(value)} 
        closePopup={closePopup}/> 
        : null} */}
      <div style={container}>
        <Aside />
        { game.start ? <Tetris /> : <StartText text="Press <Enter> for START" />}
        <Aside />
      </div>
    </Fragment>
  )
}

export default App


