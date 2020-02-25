import React, {useState, useEffect, Fragment} from 'react'

import useInterval from '../hook/useInterval'
import GameOver from './GameOver'

import { createStage, checkCollision } from '../gameHelper'
import Stage from './Stage';

import { usePlayer } from '../hook/usePlayer'
import { useStage } from '../hook/useStage'
import { useGameStatus } from '../hook/useGameStatus'

const containerTetris = {
  display: "flex",
  alignItems: 'stretch',
  flexWrap: 'wrap',
  alignContent: 'center',
  width: '40vh',
  height: '80vh',
}

const Tetris = ({ endGame, newShapes, store }) => {
  const [delay, setDelay] = useState(1000)
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)
  
  useInterval(() => {
    drop()
  }, store.end ? null : delay);

  useEffect(() => {
    const handlekeydownEvent = ({ keyCode }) => {
      if (!store.end) {
        switch (keyCode) {
          case 37 : 
            movePlayer(-1)
            break;
          case 39 : 
            movePlayer(1)
            break;
          case 40 : 
            dropPlayer()
            break;
          case 32 : 
            playerRotate(stage, 1)
            break;
          case 13 : 
            startGame()
            break;
        }
      }
    }
    const handlekeyupEvent = ({ keyCode }) => {
      if (!store.end) {
        switch (keyCode) {
          case 40 :
            setDelay(1000)
        }
      }
    }
    document.addEventListener('keydown', handlekeydownEvent)
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.removeEventListener('keydown', handlekeydownEvent)
      document.removeEventListener('keyup', handlekeyupEvent)
    }
  }, [player])

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0});
    }
  };

  const startGame = () => {

    setStage(createStage())
    resetPlayer(store.shapes[0].shape)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1)
      // setDelay(1000 / (level + 1) + 200)
    }
    if (!checkCollision(player, stage, { x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false})
    } else {
      if (player.pos.y < 1) {
        console.log("GAMEOVER");
        endGame()
      }
      updatePlayerPos({ x: 0, y: 0, collided: true})
      newShapes()
    }
  }

  const dropPlayer = () => {
    setDelay(null)
    drop()
  }

  return (
    <Fragment>
      <div style={containerTetris}>
        <Stage stage={stage}/>
      </div>
      {store.end ? <GameOver text="Perdu" /> : null}
    </Fragment>
  )
}

export default Tetris