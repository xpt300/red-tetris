import React from 'react';

import CellPhantom from './CellPhantom';

const StagePhantom = ({ stage }) => {

    const TETROMINOS = {
        0: { color: "128, 128, 128" },
        I: { color: "80, 227, 230" },
        J: { color: "36, 95, 223" },
        L: { color: "223, 173, 36" },
        O: { color: "223, 217, 36" },
        S: { color: "48, 211, 56" },
        T: { color: "132, 61, 198" },
        Z: { color: "227, 78, 78" }
      };

    return stage.map(row => row.map((cell, x) =>
        <CellPhantom key={x} type={cell[0]} color={TETROMINOS[cell[0]].color}/>
    ))
}



export default StagePhantom