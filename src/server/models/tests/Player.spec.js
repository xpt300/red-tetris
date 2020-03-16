import React from 'react'
import ReactDom from 'react-dom'
import Player from '../player'

describe('PLAYER MODELS', () => {
  const player = new Player('mjoubert', 1)
  it('should create constructor level', () => {
    expect(player.name).toStrictEqual('mjoubert')
  });
  it('should create constructor player', () => {
    expect(player.socketId).toBe(1)
  });
})