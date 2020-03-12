import React from 'react'
import { shallow } from 'enzyme';
import AsideRight from '../asideRight'
import toJson from "enzyme-to-json"

describe('<AsideRight/> Component', () => {
  it('rendering correctly with no shapes', () => {
    let wrapper = shallow(
      <AsideRight scoreAdversary={null} boardAdversary={null} numberPlayer="1" name="lol"/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
