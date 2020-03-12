import React from 'react'
import { shallow, configure } from 'enzyme';
import { Provider } from 'react-redux'
import Tetris from '../Tetris';
import { createStore } from 'redux'
import reducer from '../../reducers'
import { Tetriminos } from '../../../server/models'
import toJson from "enzyme-to-json"

const initialState = {}

const store = createStore(
  reducer,
  initialState,
)

describe('<Tetris/> Component', () => {
    const object = {
        start: true,
        win: false,
        end: false,
        score: 0,
        level: 0,
        delay: 1000,
        scoreAdversary: [],
        boardAdversary: [],
        shapes: [
            {
                shape: [
                    ["I", "I", "I", "I"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: "80, 227, 230"
            },
            {
                shape: [
                    ["I", "I", "I", "I"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: "80, 227, 230"
            },
            {
                shape: [
                    ["I", "I", "I", "I"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: "80, 227, 230"
            },
            {
                shape: [
                    ["I", "I", "I", "I"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: "80, 227, 230"
            },
            {
                shape: [
                    ["I", "I", "I", "I"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: "80, 227, 230"
            },
        ],
        text: '',
        textEnd: '',
        name: '',
        numberPlayer: 0,
        lineFull: 0
    }
    it('rendering correctly Tetris', () => {
        let wrapper = shallow(
        <Provider store={store}>
        <Tetris
        endGame={() => null}
        newShapes={() => null}
        handleScore={() => null}
        socket={() => null}
        store={object}/>
        </Provider>
        )
        console.log(wrapper.children().debug());
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('win', () => {
        object.win = true
        let wrapper = shallow(
        <Provider store={store}>
        <Tetris
        endGame={() => null}
        newShapes={() => null}
        handleScore={() => null}
        socket={() => null}
        store={object}/>
        </Provider>
        )
        expect(wrapper).toMatchSnapshot()
    })
})
