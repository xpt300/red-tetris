import React from 'react'
import { shallow } from 'enzyme';
import StagePhantom from '../StagePhantom'
import { createStage } from '../../gameHelper'
import toJson from "enzyme-to-json"

describe('<StagePhantom/> Component', () => {
  it('rendering correctly StagePhantom', () => {
    let stage = createStage()
    let wrapper = shallow(
      <StagePhantom stage={stage}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
