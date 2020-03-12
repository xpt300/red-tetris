import React from 'react'
import { shallow } from 'enzyme';
import GameOver from '../GameOver';
import toJson from "enzyme-to-json"

describe('<GameOver/> Component', () => {
  it('rendering correctly GameOver win', () => {
    let wrapper = shallow(
      <GameOver win={true}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('rendering correctly GameOver not win', () => {
    let wrapper = shallow(
      <GameOver win={false}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
