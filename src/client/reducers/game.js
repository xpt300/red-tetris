import { WIN, START, END, SHAPES, BOARDADVERSARY } from '../actions/game'

const initialState = {
  start: false,
  win: false,
  end: false,
  boardAdversary: [],
  newShapes:[],
  shapes: []
}

const reducer = (state = initialState , action) => {
  switch(action.type){
    case START:
      return {
        ...state,
        start: true,
        shapes: action.object.shapes,
        newShapes: action.object.newShapes
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
        shapes: state.newShapes,
        newShapes: action.object.newShapes,
        boardAdversary: action.object.board ? action.object.board : null
      }
    default: 
      return state
  }
}

export default reducer

