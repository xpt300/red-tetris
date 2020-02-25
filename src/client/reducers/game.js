import { WIN, START, END, SHAPES, ROOM, DELETESHAPE, NEWTEXT } from '../actions/game'

const initialState = {
  start: false,
  win: false,
  end: false,
  score: 0,
  level: 0,
  boardAdversary: [],
  shapes: [],
  text: '',
  name: ''
}

const reducer = (state = initialState , action) => {
  switch(action.type){
    case START:
      return {
        ...state,
        start: true,
        shapes: action.object.shapes
      }
    case WIN:
      return { 
        ...state,
        win: true
      }
    case END:
        return {
          ...state,
          end: true
        }
    case SHAPES:
      return {
        ...state,
        shapes: state.shapes.concat(action.object.newShapes).slice(5),
        boardAdversary: action.object.board ? action.object.board : null
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
    default:
      return state
  }
}

export default reducer

