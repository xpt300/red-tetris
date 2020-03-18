import gameReducer from '../game'

describe('REDUCER', () => {
  it('START', () => {
    const test = gameReducer(undefined , {type: 'START', object: {shapes: ['lol'], player: 1}})
    expect(test).toEqual({
      start: true,
      shapes: [ 'lol' ],
      numberPlayer: 1,
      boardAdversary: [],
      delay: 1000,
      end: false,
      level: 0,
      lineFull: 0,
      name: '',
      numberPlayer: 1,
      score: 0,
      scoreAdversary: [],
      shapes: ['lol'],
      start: true,
      text: '',
      textEnd: '',
      win: false})
  })

  it('RESTART', () => {
    const test = gameReducer(undefined , {type: 'restart', object: {shapes: ['lol'], level: 1, numberPlayer: 1}})
    expect(test).toEqual({ start: true,
      win: false,
      end: false,
      score: 0,
      level: 1,
      delay: 1200,
      lineFull: 0,
      scoreAdversary: [],
      boardAdversary: [],
      shapes: ['lol'],
      text: '',
      textEnd: '',
      name: '',
      numberPlayer: 1})
  })

  it('ENDGAME', () => {
    const test = gameReducer(undefined , {type: 'ENDGAME', object: {win: true, score: 40, text: 'lol', numberPlayer: 1}})
    expect(test).toEqual({ start: false,
      win: true,
      end: true,
      score: 0,
      level: 0,
      delay: 1000,
      lineFull: 0,
      scoreAdversary: 40,
      boardAdversary: [],
      shapes: [],
      text: '',
      textEnd: 'lol',
      name: '',
      numberPlayer: 1})
  })

  it('NEWSHAPES', () => {
    const test = gameReducer(undefined , {type: 'NEWSHAPES', newShapes: {shapes: ['lol'], start: true, board: ['hihi'], player: 1, fullLine: 1}})
    expect(test).toEqual({ start: true,
      win: false,
      end: false,
      score: 0,
      level: 0,
      delay: 1000,
      lineFull: 1,
      scoreAdversary: [],
      boardAdversary: ['hihi'],
      shapes: ['lol'],
      text: '',
      textEnd: '',
      name: '',
      numberPlayer: 1})
  })

  it('DELETESHAPE', () => {
    const test = gameReducer(undefined , {type: 'DELETESHAPE'})
    expect(test).toEqual({ start: false,
      win: false,
      end: false,
      score: 0,
      level: 0,
      delay: 1000,
      lineFull: 0,
      scoreAdversary: [],
      boardAdversary: [],
      shapes: [],
      text: '',
      textEnd: '',
      name: '',
      numberPlayer: 0})
  })

  it('ROOM', () => {
    const test = gameReducer(undefined , {type: 'ROOM', object: {text: 'hihi', name: 'mjoubert'}})
    console.log(test);
    expect(test).toEqual({ start: false,
      win: false,
      end: false,
      score: 0,
      level: 0,
      delay: 1000,
      lineFull: 0,
      scoreAdversary: [],
      boardAdversary: [],
      shapes: [],
      text: 'hihi',
      textEnd: '',
      name: 'mjoubert',
      numberPlayer: 0})
  })

  it('NEWTEXT', () => {
    const test = gameReducer(undefined , {type: 'NEWTEXT', text: {text: 'hihi'}})
    console.log(test);
    expect(test).toEqual({ start: false,
      win: false,
      end: false,
      score: 0,
      level: 0,
      delay: 1000,
      lineFull: 0,
      scoreAdversary: [],
      boardAdversary: [],
      shapes: [],
      text: 'hihi',
      textEnd: '',
      name: '',
      numberPlayer: 0})
  })

  it('SCORE', () => {
    const test = gameReducer(undefined , {type: 'SCORE', object: {score: 10}})
    console.log(test);
    expect(test).toEqual({ start: false,
      win: false,
      end: false,
      score: 10,
      level: 0,
      delay: 1000,
      lineFull: 0,
      scoreAdversary: [],
      boardAdversary: [],
      shapes: [],
      text: '',
      textEnd: '',
      name: '',
      numberPlayer: 0})
  })

  it('NEWLEVEL', () => {
    const test = gameReducer(undefined , {type: 'NEWLEVEL', level: 1})
    console.log(test);
    expect(test).toEqual({ start: false,
      win: false,
      end: false,
      score: 0,
      level: 1,
      delay: 1200,
      lineFull: 0,
      scoreAdversary: [],
      boardAdversary: [],
      shapes: [],
      text: '',
      textEnd: '',
      name: '',
      numberPlayer: 0})
  })
});