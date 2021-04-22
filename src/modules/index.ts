import { combineReducers } from 'redux';
import appReducer from './app'
import authReducer from './auth'
import userReducer from './user'
import entriesReducer from './entries';


export default combineReducers({
    appReducer,
    authReducer,
    userReducer,
    entriesReducer
});

