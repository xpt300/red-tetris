import React from 'react'
import ReactDom from 'react-dom'
import App from '../App'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import socketMiddleWare from '../middleware/socketMiddleWare'
import reducer from '../reducers'
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

it('rendering without bug <App/>', () => {
  const div = document.createElement('div')
  ReactDom.render(
    <Provider store={store}>
      <App socket={socket}/>
    </Provider>, div)
  ReactDom.unmountComponentAtNode(div)
})