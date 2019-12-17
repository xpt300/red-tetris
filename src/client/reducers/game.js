import { WIN, START, END, SHAPES } from '../actions/game'
import { shapesRandom } from '../util/shapes'

const initialState = {
  start: false,
  win: false,
  end: false,
  shapes: [],
  numberShapes: 0
}


const reducer = (state = initialState , action) => {
  switch(action.type){
    case WIN:
      return { 
        ...state,
        win: true
      }
    case START:
      return {
        ...state,
        start: true,
      }
    case END:
        return {
          ...state,
          end: true
        }
    case SHAPES: {
      const number = Math.floor(Math.random() * 7)
      return {
        ...state,
        numberShapes: number,
        shapes: JSON.parse(JSON.stringify(shapesRandom[number]))
      }
    }
    default: 
      return state
  }
}

export default reducer

