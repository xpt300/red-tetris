import { useState, useCallback } from 'react'

import { WIDTH } from '../gameHelper'

const TETRO = {
    0: { shape: [[0]], color: '0, 0, 0' },
}

export const usePlayerPreview = () => {
    const [player, setPlayer] = useState({
      pos: { x: 0, y: 0 },
      tetromino: TETRO[0].shape,
    });
  
    const resetPlayer = useCallback((tetromino) => {
      setPlayer({
        pos: { x: WIDTH / 2 - 2, y: 0 },
        tetromino: tetromino,
        collided: false,
      });
    }, []);
  
    return [player, resetPlayer];
  };