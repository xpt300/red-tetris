import React from 'react'
import { useStage } from '../useStage'
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from '../../reducers'
import { createStage } from '../../gameHelper'

const initialState = {
  game : {
    shapes : [
      {
        shape: [
          ["I", "I", "I", "I"],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      }
    ]
  }
}

const store = createStore(
  reducer,
  initialState,
)

describe('<useStage/> HOOK', () => {
  const player = {
    pos: { x: 10 / 2 - 2, y: 0 },
    tetromino: [
      ["I", "I", "I", "I"],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    collided: false,
  }
  const newPlayer = jest.fn()
  const resetPlayer = jest.fn()
  const { result, rerender } = renderHook(() => useStage(player, newPlayer, resetPlayer), {
    wrapper: ({ children }) => <Provider store={store} >{children}</Provider>
  });
  it('should not error', () => {
    expect(result)
  });

  it('new stage', async () => {
    
    act(() => {
      result.current[1](createStage())
    })
  })

  it('new rows cleared', async () => {
    player.collided = true
    const { result, rerender } = renderHook(() => useStage(player, newPlayer, resetPlayer), {
      wrapper: ({ children }) => <Provider store={store} >{children}</Provider>
    });
    act(() => {
      result.current[2]
    })
  })

})