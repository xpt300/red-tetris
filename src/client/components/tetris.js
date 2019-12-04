import React from 'react'

const containerTetris = {
  display: "flex",
  alignItems: "stretch",
}

const box = {
  width: "50px",
  height: "50px",
  backgroundColor: "red"
}


const lines = () => {
  let indents = [];
  for (let i = 0; i < 20; i++) {
    indents.push(<div style={box} key={i}/>);
  }
  return indents
}

const tab = () => {
  let indents = [];
  for (let i = 0; i < 10; i++) {
    indents.push(
    <div key={i}> {lines()} </div>
    );
  }
  return indents
}

export const Tetris = () => {
  return (
    <Board/>
  )
}

export const Board = () => {
  return (
    <div style={containerTetris}>
      {tab()}
    </div>
  )
}
