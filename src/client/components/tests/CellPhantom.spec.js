import React from 'react'
import { shallow, configure } from 'enzyme';
import CellPhantom from '../CellPhantom';
import toJson from "enzyme-to-json"


describe('<Cell/> Component', () => {
  it('rendering correctly Cell with color', () => {
    const TETROMINOS = {
      0: { color: "255, 255, 255" },
      I: { color: "80, 227, 230" },
      J: { color: "36, 95, 223" },
      L: { color: "223, 173, 36" },
      O: { color: "223, 217, 36" },
      S: { color: "48, 211, 56" },
      T: { color: "132, 61, 198" },
      Z: { color: "227, 78, 78" },
      W: { color: "128, 128, 128"}
    };
    let wrapper = shallow(
      <CellPhantom type={'T'} color={TETROMINOS['T'].color}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
