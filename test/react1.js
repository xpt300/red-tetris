import chai from "chai"
import React from 'react'
import { shallow } from 'enzyme';
import { App } from '../src/client/containers/app'


describe('<Tetris/>', () => {
  it('simulate button events', () => {
    const wrapper = shallow(Tetris)
    wrapper.simulate('keypress', {key: 'Enter'})
  })

})
