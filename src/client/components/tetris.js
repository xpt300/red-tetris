import React, {useState, useEffect, Fragment} from 'react'

import useInterval from '../hook/useInterval'
import GameOver from './GameOver'

import { createStage, checkCollision } from '../gameHelper'
import Stage from './Stage';

import { usePrevious } from '../hook/usePrevious'
import { usePlayer } from '../hook/usePlayer'
import { useStage } from '../hook/useStage'
import { useGameStatus } from '../hook/useGameStatus'

const containerTetris = {
  display: "flex",
  position: 'relative',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  alignContent: 'center',
  width: '40vh',
  height: '80vh',
}

const Tetris = ({ endGame, newShapes, store, handleScore }) => {
  const [delay, setDelay] = useState(store.delay)
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, newShapes)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)
  const prev = usePrevious(store)
  
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
          case 32 :
              dropPlayer()
            break;
          case 38 : 
            playerRotate(stage, 1)
            break;
          case 40: 
            let i = 0
            while (!checkCollision(player, stage, { x: 0, y: i})) i++
            if (i > 0) updatePlayerPos({ x: 0, y: i - 1, collided: true})
            break;
        }
      }
    }
    const handlekeyupEvent = ({ keyCode }) => {
      if (!store.end) {
        switch (keyCode) {
          case 32 :
            setDelay(store.delay)
        }
      }
    }
    document.addEventListener('keydown', handlekeydownEvent)
    document.addEventListener('keyup', handlekeyupEvent)
    return () => {
      document.removeEventListener('keydown', handlekeydownEvent)
      document.removeEventListener('keyup', handlekeyupEvent)
    }
  }, [player, store.end])

  useEffect(() => {
    if (score > 0) handleScore(score)
  }, [score]);

  useEffect(() => {
    if (prev && prev.end && prev.start && store.start && !store.end) {
      setStage(createStage());
      setDelay(store.delay);
      resetPlayer(store.shapes[0].shape);
      setScore(0);
      setRows(0);
    }
  }, [store.start, store.end]);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0});
    }
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false})
    } else {
      if (player.pos.y < 1) {
        endGame()
        setDelay(null)
        return
      }
      updatePlayerPos({ x: 0, y: 0, collided: true})
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
        {store.end ? <GameOver win={store.win}/> : null}
      </div>
     
    </Fragment>
  )
}

export default Tetris