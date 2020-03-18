import socketMiddleWare from '../socketMiddleWare'

it('should dispatch action room', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'ROOM', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['newPlayer', { type: 'room' }]])
})

it('should dispatch action start', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'START', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['action', { type: 'start' }]])
})

it('should dispatch action end', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'END', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['end']])
})

it('should dispatch action score', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'SCORE', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['action', {type : 'score', score : action.score}]])
})

it('should dispatch action restart', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'RESTART', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['action', {type : 'restart'}]])
})

it('should dispatch action level', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'LEVEL', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['action', {type : 'level', ope : action.ope}]])
})


it('should dispatch action delete shape', () => {
  const next = jest.fn(); // middleware needs those as parameters, usually calling next(action) at the end to proceed
  const store = jest.fn(); 
  store.dispatch = jest.fn();
  const emit = jest.fn()
  const on = jest.fn()
  const action = { type: 'DELETESHAPE', object: 'lol', socket: {
    emit: emit,
    on: on
  }}
  socketMiddleWare(store)(next)(action);
  expect(emit.mock.calls).toEqual([['action', {type : 'shapes', board: action.board, length: action.length, fullLine: action.fullLine}]])
})