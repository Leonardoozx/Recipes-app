import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({ loginReducer, mealsReducer });

export default rootReducer;
