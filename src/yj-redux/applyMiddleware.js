// 可以接受多个参数
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    // 获取 dispatch
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    
    // get super dispatch
    // 需要将状态的 set、get 传递给中间件
    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args), // 新用一个 dispatch，防止不同中间件之间相互影响
    };

    const middlewaresChain = middlewares.map(middleware => {
      return middleware(midApi);
    })
    // super dispatch
    dispatch = compose(...middlewaresChain)(dispatch);

    return {...store, dispatch};
  }

  function compose(...funcs) {
    if (funcs.length === 0) {
      return (arg) => arg
    }

    if (funcs.length === 1) {
      return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
}