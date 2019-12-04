import React from 'react'
import { connect } from 'react-redux'

import {Tetris} from '../components/tetris'
import {Popup} from '../components/popup'

const container = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "stretch",
  flexWrap: "nowrap",
}

const App = ({message}) => {
  return (
    <div style={container}>
      <Popup/>
      <Tetris />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


