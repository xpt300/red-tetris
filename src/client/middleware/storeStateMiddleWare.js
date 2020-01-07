import { createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'
import io from 'socket.io-client';

function storeStateMiddleWare ({ getState }) {


  return (next) => (action) => {

    const socket = io()

    if (typeof action === 'function') {
      return next(action);
    }
    window.top.state = getState()
    const {
      event,
      leave,
      handle,
      ...rest
    } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    let handleEvent = handle;
    console.log('xxxxx');
    if (typeof handleEvent === 'string') {
      handleEvent = result => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  }
}

const configureStore = () => {
  return createStore (
    reducers,
    applyMiddleware(storeStateMiddleWare)
  )
}

export default configureStore
