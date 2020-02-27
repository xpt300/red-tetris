import { WIN, START, ENDGAME, ROOM, DELETESHAPE, NEWTEXT, NEWSHAPES, SCORE, NEWLEVEL, BOARD } from '../actions/game'

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
  name: '',
  numberPlayer: 0
}

const reducer = (state = initialState , action) => {
  console.log(action, 'action');
  switch(action.type){
    case START:
      return {
        ...state,
        start: true,
        shapes: action.object.shapes,
        numberPlayer: action.object.player
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
          scoreAdversary: action.score
        }
    case NEWSHAPES:
        return {
          ...state,
          shapes: state.shapes.concat(action.newShapes.shapes),
          start: action.newShapes.start ? action.newShapes.start : state.start,
          numberPlayer: action.newShapes.player
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
      if (state.boardAdversary[0]) {
        const filter = state.boardAdversary.filter(board => board.name === action.board.name)
        if (filter[0]) {
          console.log(filter, 'filter ok');
          const board = state.boardAdversary.map(board => {
            if (board.name === action.board.name) {
              board.board = action.board.board
              return board
            }
            return board
          })
          console.log(board, 'board');
          return {
            ...state,
            boardAdversary: board,
          }
        } else {
          console.log('ici', action.board, state.boardAdversary);
          return {
            ...state,
            boardAdversary : state.boardAdversary.push(action.board)
          }
        }
      } else {
        return {
          ...state,
          boardAdversary : [action.board]
        }
      }
    default:
      return state
  }
}

export default reducer

