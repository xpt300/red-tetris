import React from 'react'
import { shallow } from 'enzyme';
import ContainerStagePhantom from '../ContainerStagePhantom';
import { createStage } from '../../gameHelper'
import toJson from "enzyme-to-json"


describe('<ContainerStagePhantom/> Component', () => {
  it('rendering correctly ContainerStagePhantom', () => {
    const boardArray = [
      {
        board: createStage, 
        name: "lol", 
        end: true
      },
      {
        board: createStage, 
        name: 'hihi', 
        end: false
      }
    ]
    let wrapper = shallow(
      <ContainerStagePhantom boardAdversary={boardArray} name="hihi"/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
