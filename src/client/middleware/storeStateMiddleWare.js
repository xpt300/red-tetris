import { createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'

function storeStateMiddleWare ({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    return next(action)
  }
}

const configureStore = () => {
  return createStore (
    reducers,
    applyMiddleware(storeStateMiddleWare)
  )
}

export default configureStore
