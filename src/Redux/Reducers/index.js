import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({ mealsReducer });

export default rootReducer;
