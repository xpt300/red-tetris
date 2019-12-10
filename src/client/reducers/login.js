import { LOGIN } from '../actions/login'
import { ENTER } from '../actions/login'

const initialState = {
  popup: true,
  name: ''
}

const reducer = (state = initialState , action) => {
  console.log(action)
  switch(action.type){
    case LOGIN:
      return { 
        ...state,
        name: action.name
      }
    case ENTER:
      if (action.key === 'Enter') {
        return {
          ...state,
          popup: false
        }
      }
    default: 
      return state
  }
}

export default reducer

