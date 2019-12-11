import { combineReducers } from 'redux';

import alert from './alert'
import login from './login'
import game from './game'

const reducers = combineReducers({
    alert,
    login,
    game
})

export default reducers;



