import {createStore, applyMiddleware, combineReducers} from '../yj-redux';
import thunk from '../middlewares/redux-thunk';
import logger from '../middlewares/redux-logger';
import promise from '../middlewares/redux-promise';

const counter = (state=1, {type, payload=10}) => {
  switch(type) {
    case 'ADD': 
      return state + payload;
    case 'MINUS': 
      return state - payload;
    default:
      return state;
  }
}

export const store = createStore(
  combineReducers({counter}), 
  applyMiddleware(thunk, promise, logger)
);