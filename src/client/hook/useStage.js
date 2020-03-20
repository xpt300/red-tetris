import { useState, useEffect } from 'react'
import { createStage } from '../gameHelper'
import { useStore, useSelector } from 'react-redux'
import { usePrevious } from '../hook/usePrevious'

export const useStage = (player, resetPlayer, newShapes) => {
    const store = useStore()
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);
    const fullLine = useSelector(state => state.game.lineFull)
    const prevLine = usePrevious(fullLine)
  
    useEffect(() => {
      const addLine = prev => {
        for (let i = 0; i < fullLine - prevLine; i++) {
          prev.shift()
          prev.push(new Array(prev[0].length).fill(['W', 'merged']))
        }
        return prev
      } 
      if (fullLine > 0 && !store.getState().game.end) setStage(prev => addLine(prev))
    }, [fullLine]);

    useEffect(() => {
      setRowsCleared(0);
      const sweepRows = newStage => {
        let lineDelete = 0
        const newnewStage = newStage.reduce((ack, row) => {
          if (row.findIndex(cell => cell[0] === 0) === -1 && row[0][0] !== 'W') {
            lineDelete += 1
            setRowsCleared(prev => prev + 1);
            ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
            return ack;
          }
          ack.push(row);
          return ack;
        }, []);
        if (lineDelete > 0) newShapes(newnewStage, lineDelete)
        else newShapes(newnewStage, 0)
        return newnewStage
      }

      const updateStage = prevStage => {
        // First flush the stage
        const newStage = prevStage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        );
        // Then draw the tetromino
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y][x + player.pos.x] = [
                value,
                `${player.collided ? 'merged' : 'clear'}`,
              ];
            }
          });
        });
        // Then check if we got some score if collided
        if (player.collided) {
          resetPlayer(store.getState().game.shapes[0].shape);
          return sweepRows(newStage);
        }
        return newStage;
      };
  
      // Here are the updates
      setStage(prev => updateStage(prev));
    }, [
      player.collided,
      player.pos.x,
      player.pos.y,
      player.tetromino,
      resetPlayer,
    ]);
    
    return [stage, setStage, rowsCleared];
  };