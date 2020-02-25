import { useState, useCallback } from 'react'

import { WIDTH, checkCollision } from '../gameHelper'

import { TETROMINOS, randomTetromino } from '../../server/models/tetriminos';

const TETRO = {
    0: { shape: [[0]], color: '0, 0, 0' },
}

export const usePlayerPreview = () => {
    const [player, setPlayer] = useState({
      pos: { x: 0, y: 0 },
      tetromino: TETRO[0].shape,
    });
  
    const resetPlayer = useCallback((tetrimono) => {
      setPlayer({
        pos: { x: WIDTH / 2 - 2, y: 0 },
        tetromino: tetrimono,
        collided: false,
      });
    }, []);
  
    return [player, resetPlayer];
  };