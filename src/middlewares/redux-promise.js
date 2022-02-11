import isPromise from '../utils/is-promise';

export default function({getState, dispatch}) {
  return dispatch2 => action => {
    if(isPromise(action)) {
      return action.then(dispatch)
    }
    return dispatch2(action);
  }
}