import React from 'react';

import Cell from './Cell';

const Stage = ({ stage }) => {

    const TETROMINOS = {
        0: { color: "0, 0, 0" },
        I: { color: "80, 227, 230" },
        J: { color: "36, 95, 223" },
        L: { color: "223, 173, 36" },
        O: { color: "223, 217, 36" },
        S: { color: "48, 211, 56" },
        T: { color: "132, 61, 198" },
        Z: { color: "227, 78, 78" }
      };

    return stage.map(row => row.map((cell, x) =>
        <Cell key={x} type={cell[0]} color={TETROMINOS[cell[0]].color}/>
    ))
}


export const StagePreview = ({ stage }) => {

    const TETROMINOS = {
        0: { color: "255, 255, 255" },
        I: { color: "80, 227, 230" },
        J: { color: "36, 95, 223" },
        L: { color: "223, 173, 36" },
        O: { color: "223, 217, 36" },
        S: { color: "48, 211, 56" },
        T: { color: "132, 61, 198" },
        Z: { color: "227, 78, 78" }
      };

    return stage.map(row => row.map((cell, x) => 
        <Cell key={x} type={cell[0]} color={TETROMINOS[cell[0]].color}/>
    ))
}



export default Stage