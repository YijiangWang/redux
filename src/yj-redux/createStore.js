export default function createStore(reducer, enhancer) {
  if(enhancer) {
    // enhancer: 加强 dispatch，在发出 action 和 reducer 之间添加其它功能
    // dispatch 来自 store，store 来自 createStore
    // return enhancer(createStore, reducer); // 进行柯里化
    return enhancer(createStore)(reducer);
  }

  // 开辟一个空间存储状态
  let currentState;

  let currentListeners = [];

  // get
  const getState = () => {
    return currentState;
  }  
  
  // set
  const dispatch = (action) => {
    // 先修改 store 的 state
    currentState = reducer(currentState, action);
    // state 改变，执行订阅的函数
    currentListeners.forEach(listener=>listener());
  }

  // 订阅和取消订阅必须要成对出现
  const subscribe = (listener) => {
    currentListeners.push(listener);
    return () => {
      currentListeners = currentListeners.filter(func => func!== listener);
      // 源码中实现
      // const index = currentListeners.indexOf(listener);
      // currentListeners.splice(index, 1);
    }
  }

  // 首次去取 reducer 中的 state 默认值
  const initType = Math.random().toString(36).substring(7).split('').join('.'); 
  dispatch({type: initType});

  return {
    dispatch,
    getState,
    subscribe,
  }
}