import React from 'react'
import { shallow } from 'enzyme';
import { Tetriminos } from '../../../server/models'
import AsideLeft from '../asideLeft'
import toJson from "enzyme-to-json"

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
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
