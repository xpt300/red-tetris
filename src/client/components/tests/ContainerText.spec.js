import React from 'react'
import { shallow } from 'enzyme';
import ContainerText from '../ContainerText';
import toJson from "enzyme-to-json"


describe('<ContainerText/> Component', () => {
  it('rendering correctly ContainerText', () => {
    let wrapper = shallow(
      <ContainerText text="lol"/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
