export default function({getState, dispatch}) {
  return dispatch2 => action => {
    if(typeof action === 'function') {
      return action();
    }
    return dispatch2(action);
  }
}