import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client';


import { Tetris } from '../components/tetris'
import Aside from '../components/aside'
import Popup from '../components/popup'

// const socket = openSocket('http://0.0.0.0:8080');

const container = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "stretch",
  flexWrap: "nowrap",
  height:"100vh"
}

const App = ({message, popup, closePopup, handleLogin}) => {
  return (
    <Fragment>
      {/* {popup ? 
        <Popup 
        handleLogin={(value) => handleLogin(value)} 
        closePopup={closePopup}/> 
        : null} */}
      <div style={container}>
        {/* <Aside /> */}
        <Tetris />
        {/* <Aside /> */}
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    login: state.login.name,
    popup: state.login.popup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (login) => dispatch({ type: 'LOGIN', name: login}),
    closePopup: (keyPress) => dispatch({ type: 'ENTER', key: keyPress})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


