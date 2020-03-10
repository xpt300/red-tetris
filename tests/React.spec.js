import React from 'react'
import { shallow, configure } from 'enzyme';
import { Tetriminos } from '../src/server/models'
import Adapter from 'enzyme-adapter-react-16'
import AsideLeft from '../src/client/components/asideLeft'

configure({ adapter: new Adapter() })

describe('<AsideLeft/> Component', () => {
  it('rendering correctly with no shapes', () => {
    let wrapper = shallow(
      <AsideLeft level='0' score='0'/>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('rendering correctly with shapes', () => {
    const tetriminos = new Tetriminos
    let tetro = []
    for (let i = 0; i < 5; i++) {
      tetro.push(tetriminos.randomTetromino())
    }
    let wrapper = shallow(
      <AsideLeft level='0' score='0' shapes={tetro}/>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
