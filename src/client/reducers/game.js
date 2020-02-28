import { WIN, START, ENDGAME, ROOM, DELETESHAPE, NEWTEXT, NEWSHAPES, SCORE, NEWLEVEL, BOARD, RESTART } from '../actions/game'

const initialState = {
  start: false,
  win: false,
  end: false,
  score: 0,
  level: 0,
  delay: 1000,
  scoreAdversary: [],
  boardAdversary: [],
  shapes: [],
  text: '',
  textEnd: '',
  name: '',
  numberPlayer: 0
}

const reducer = (state = initialState , action) => {
  switch(action.type){
    case START:
      return {
        ...state,
        start: true,
        shapes: action.object.shapes,
        numberPlayer: action.object.player
      }
    case RESTART:
      return {
        ...state,
        start: true,
        win: false,
        end: false,
        score: 0,
        level: action.object.level,
        delay: state.level === 5 ? 100 : 1000 / (state.level + 1) + 200,
        scoreAdversary: [],
        boardAdversary: [],
        shapes: action.object.shapes,
        text: '',
        textEnd: '',
        name: '',
        numberPlayer: action.object.numberPlayer,
      }
    case WIN:
      return { 
        ...state,
        win: true
      }
    case ENDGAME:
        return {
          ...state,
          end: true,
          scoreAdversary: action.object.score ? action.object.score : state.scoreAdversary,
          textEnd: action.object.text
        }
    case NEWSHAPES:
        return {
          ...state,
          shapes: state.shapes.concat(action.newShapes.shapes),
          start: action.newShapes.start ? action.newShapes.start : state.start,
          numberPlayer: action.newShapes.player ? action.newShapes.player : state.numberPlayer
        }
    case DELETESHAPE:
        return {
          ...state,
          shapes: state.shapes.slice(1)
        }
    case ROOM:
      return {
        ...state,
        text: action.object.text,
        name: action.object.name ? action.object.name : ''
      }
    case NEWTEXT:
      return {
        ...state,
        text: action.text.text
      }
    case SCORE:
      return {
        ...state,
        score: action.object.score
      }
    case NEWLEVEL:
      return {
        ...state,
        level: action.level,
        delay : state.level === 5 ? 100 : 1000 / (state.level + 1) + 200
      }
    case BOARD:
      return {
        ...state,
        boardAdversary : action.board
      }
    default:
      return state
  }
}

export default reducer

