import { combineReducers } from 'redux';

import alert from './alert'
import login from './login'

const reducers = combineReducers({
    alert,
    login
})

export default reducers;



