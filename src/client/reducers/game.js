import { WIN, START, END } from '../actions/game'

const initialState = {
  start: false,
  win: false,
  end: false
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
    default: 
      return state
  }
}

export default reducer

