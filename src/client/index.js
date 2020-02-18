import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import socketMiddleWare from './middleware/socketMiddleWare'
import storeStateMiddleWare from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import io from 'socket.io-client'

const initialState = {}

const middleware = [
  thunk,
  socketMiddleWare,
  createLogger(),
]

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
)

const socket = io('http://0.0.0.0:3004', {
  query: 'room=' + window.location.href.split('/')[3]
})

ReactDom.render((
  <Provider store={store}>
    <App socket={socket}/>
  </Provider>
), document.getElementById('tetris'))