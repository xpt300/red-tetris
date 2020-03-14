import React from 'react'
import { usePlayer } from '../usePlayer'
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from '../../reducers'

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

// return [player, updatePlayerPos, resetPlayer, playerRotate];

describe('<usePlayer/> HOOK', () => {
  const { result, waitForNextUpdate } = renderHook(() => usePlayer(), {
    wrapper: ({ children }) => <Provider store={store} >{children}</Provider>
  });
  it('should not error', () => {
    expect(result.current[0]).toStrictEqual({"collided": false, "pos": {"x": 3, "y": 0}, "tetromino": [
      ["I", "I", "I", "I"],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]})
  });
  
  it('new position player', async () => {
    act(() => {
      result.current[1]({ x: 0, y: 1, collided: true})
    })
    await waitForNextUpdate

    // expect(result.current[0]).toStrictEqual({"collided": true, "pos": {"x": 0, "y": 1}, "tetromino": [
    //   ["I", "I", "I", "I"],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0]
    // ]})
  });

  it('new reset player', async () => {
    act(() => {
      result.current[2]([
        [0, "J", 0],
        [0, "J", 0],
        ["J", "J", 0]
    ])
    })
    await waitForNextUpdate

    // expect(result.current[0]).toStrictEqual({"collided": true, "pos": {"x": 0, "y": 1}, "tetromino": [
    //   [0, "J", 0],
    //   [0, "J", 0],
    //   ["J", "J", 0]
    // ]})
  })

  it('new player rotate', async () => {
    act(() => {
      result.current[3]([
        [0, "J", 0],
        [0, "J", 0],
        ["J", "J", 0]
    ])
    })
    await waitForNextUpdate

    // expect(result.current[0]).toStrictEqual({"collided": true, "pos": {"x": 0, "y": 1}, "tetromino": [
    //   [0, "J", 0],
    //   [0, "J", 0],
    //   ["J", "J", 0]
    // ]})
  })
})