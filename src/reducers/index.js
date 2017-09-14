import { combineReducers } from 'redux';
import users from './users';
import { routerReducer } from 'react-router-redux';
 
var Task = combineReducers({
    users
});

export default Task;