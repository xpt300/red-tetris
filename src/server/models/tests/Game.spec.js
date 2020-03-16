import React from 'react'
import ReactDom from 'react-dom'
import Game from '../game'

describe('GAME MODELS', () => {
  const game = new Game(false, 0, 'lol', ['mjoubert'])
  it('should create constructor level', () => {
    expect(game.level).toBe(0)
  });
  it('should create constructor player', () => {
    expect(game.master).toStrictEqual(['mjoubert'])
  });
})