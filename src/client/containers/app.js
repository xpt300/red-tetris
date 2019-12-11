import React, { Fragment, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import openSocket from 'socket.io-client';


import { Tetris } from '../components/tetris'
import Aside from '../components/aside'
import Popup from '../components/popup'

// const socket = openSocket('http://0.0.0.0:8080');

const container = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "nowrap",
  height:"100vh"
}

const App = ({message, start, win, end}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    function handlekeyupEvent (event) {
      if (event.keyCode === 13) {
        dispatch(startGame)
      }
    }
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.addEventListener('keyup', handlekeyupEvent)
    }
  }, [start])

  return (
    <Fragment>
      {/* {popup ? 
        <Popup 
        handleLogin={(value) => handleLogin(value)} 
        closePopup={closePopup}/> 
        : null} */}
      <div style={container}>
        <Aside />
        {start ? <Tetris /> : 'hihihi'}
        <Aside />
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    login: state.login.name,
    popup: state.login.popup,
    win: state.game.win,
    start: state.game.start,
    end: state.game.end
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch({ type: 'START'}),
    closePopup: (keyPress) => dispatch({ type: 'ENTER', key: keyPress})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


