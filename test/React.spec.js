import { expect } from "chai"
import React from 'react'
import 'jsdom-global/register'
// import "jest-enzyme"
import { shallow, mount } from 'enzyme';
import App from '../src/client/containers/app'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import createLogger from 'redux-logger'
import socketMiddleWare from '../src/client/middleware/socketMiddleWare'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'                                                                                                                                                  
import reducer from '../src/client/reducers'
import ContainerText from '../src/client/components/ContainerText'
import AsideLeft from '../src/client/components/asideLeft'
import Tetris from '../src/client/components/Tetris'
import io from 'socket.io-client'

configure({ adapter: new Adapter() })

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

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
)

const socket = io('http://0.0.0.0:3004', {
  query: 'room=' + window.location.href.split('/')[3]
})

describe('<App/> Component', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<ReduxProvider reduxStore={store}><App socket={socket}/></ReduxProvider>) })
  it('expected <App />', () => {
    expect(wrapper.length).to.equal(1)
  })

  it('expected child component ContainerText ', () => {
    expect(wrapper.contains(<ContainerText text="lol"/>))
  })

  it('expected child title', () => {
    expect(wrapper.contains('Text').text()).to.be.equal('RED TETRIS')
  })

  it('expected child component AsideLeft', () => {
    expect(wrapper.contains(<AsideLeft />))
  })

  // it('expected child <Tetris /> after simulate [enter]', () => {
  //   wrapper.simulate('keypress', {key: 'Enter'})
  //   expect(wrapper.simulate('keypress', {key: 'Enter'}).find(<Tetris />).length === 1)
  // })
})
