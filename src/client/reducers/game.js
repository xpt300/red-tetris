import { START, ENDGAME, ROOM, DELETESHAPE, NEWTEXT, NEWSHAPES, SCORE, NEWLEVEL, RESTART } from '../actions/game'

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
  numberPlayer: 0,
  lineFull: 0
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
    case ENDGAME:
        return {
          ...state,
          end: true,
          win: action.object.win ? action.object.win : false,
          scoreAdversary: action.object.score ? action.object.score : state.scoreAdversary,
          textEnd: action.object.text
        }
    case NEWSHAPES: 
      return {
        ...state,
        shapes: action.newShapes.shapes ? state.shapes.concat(action.newShapes.shapes) : state.shapes,
        start: action.newShapes.start ? action.newShapes.start : state.start,
        boardAdversary : action.newShapes.board,
        numberPlayer: action.newShapes.player ? action.newShapes.player : state.numberPlayer,
        lineFull: action.newShapes.fullLine ? state.lineFull + 1 : state.lineFull
      }
    case DELETESHAPE:
      return {
        ...state,
        shapes: state.shapes.slice(1),
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
    default:
      return state
  }
}

export default reducer

