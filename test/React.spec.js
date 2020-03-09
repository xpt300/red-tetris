import chaiEnzyme from "chai-enzyme"
import chai from "chai"
import React from 'react'
import 'jsdom-global/register'
import { shallow } from 'enzyme';
import App from '../src/client/containers/app'
import { Tetriminos } from '../src/server/models'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import createLogger from 'redux-logger'
import socketMiddleWare from '../src/client/middleware/socketMiddleWare'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'                                                                                                                                                  
import reducer from '../src/client/reducers'
import ContainerText from '../src/client/components/ContainerText'
import AsideLeft, { TextInput } from '../src/client/components/asideLeft'
import Tetris from '../src/client/components/Tetris'
import io from 'socket.io-client'

configure({ adapter: new Adapter() })

chai.use(chaiEnzyme());
const expect = chai.expect

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

// const ReduxProvider = ({ children, reduxStore }) => (
//   <Provider store={reduxStore}>{children}</Provider>
// )

// const socket = io('http://0.0.0.0:3004', {
//   query: 'room=' + window.location.href.split('/')[3]
// })

describe('<AsideLeft/> Component', () => {
  const tetriminos = new Tetriminos
  let tetro = []
  for (let i = 0; i < 5; i++) {
    tetro.push(tetriminos.randomTetromino())
  }
  let wrapper = shallow(
    <AsideLeft level='0' score='0' shapes={tetro}/>
  )

  it('expected <AsideLeft />', () => {
    expect(wrapper.length).to.equal(1)
  })

  it('contains StagePreview', () => {
    console.log(wrapper.find(TextInput).children().debug());
    expect(wrapper.find(TextInput).children()).to.be.present()
    expect(wrapper).to.contain('StagePreview')
  })

  it('add level 2', () => {
    const level = 2
  })
  // it('expected child <Tetris /> after simulate [enter]', () => {
  //   wrapper.simulate('keypress', {key: 'Enter'})
  //   expect(wrapper.simulate('keypress', {key: 'Enter'}).find(<Tetris />).length === 1)
  // })
})
