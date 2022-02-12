export default function combineReducers(reducers) {
  return function(state={}, action) {
    let hasChanged = false;
    let nextState = {};
    for(let key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    //TODO 其实 redux 中 store 还提供了一个 replaceReducer 这个方法，所以 state 的个数有可能会发生变化（这个方法几乎不会用，这里有时间再去实现^_^）
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  }
}