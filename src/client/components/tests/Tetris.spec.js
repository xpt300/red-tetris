import React from 'react'
import ReactDom from 'react-dom'
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import Tetris from '../Tetris';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import socketMiddleWare from '../../middleware/socketMiddleWare'
import reducer from '../../reducers'
import toJson from "enzyme-to-json"

const initialState = {
    start: true,
    win: false,
    end: false,
    score: 0,
    level: 0,
    delay: 1000,
    scoreAdversary: [],
    boardAdversary: [],
    game: {
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
    },
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
    name: 'mjoubert',
    numberPlayer: 0,
    lineFull: 0
}

const middleware = [
    thunk,
    socketMiddleWare,
    createLogger(),
]

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
)


describe('<Tetris/> Component', () => {
  let object
  beforeEach(() => {
    object = {
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
        name: 'mjoubert',
        numberPlayer: 0,
        lineFull: 0
    }
  });
      it('rendering correctly Tetris', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <Provider store={store}>
            <Tetris
            endGame={() => null}
            newShapes={() => null}
            handleScore={() => null}
            socket={() => null}
            store={object}/>
          </Provider>, div)
        ReactDom.unmountComponentAtNode(div)
      })
})
