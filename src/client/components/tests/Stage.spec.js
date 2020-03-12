import React from 'react'
import { shallow } from 'enzyme';
import Stage, { StagePreview } from '../stage'
import { createStage, createStagePreview } from '../../gameHelper'
import toJson from "enzyme-to-json"

describe('<Stage/> Component', () => {
  it('rendering correctly Stage', () => {
    let stage = createStage()
    let wrapper = shallow(
      <Stage stage={stage}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('rendering correctly StagePreview', () => {
    let stage = createStagePreview()
    let wrapper = shallow(
      <StagePreview stage={stage}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
