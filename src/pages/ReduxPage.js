import React from 'react';
import { store } from '../store/store';

export default class extends React.PureComponent {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  add = () => {
    store.dispatch({type:'ADD',payload:5});
  }
  minus = () => {
    store.dispatch({type:'MINUS',payload:3});
  }
  asyncAdd = () => {
    store.dispatch(() => {
      setTimeout(() => {
        store.dispatch({type: 'ADD', payload: 3});
      }, 1000);
    })
  }
  promiseAdd = () => {
    store.dispatch(Promise.resolve({type: 'ADD'}))
  }
  
  render() {
    return (<div>
      <h3>Redux</h3>
      <p>{store.getState().counter}</p>
      <button onClick={this.add}>add</button>
      <button onClick={this.asyncAdd}>asyncAdd</button>
      <button onClick={this.promiseAdd}>promiseAdd</button>
      <button onClick={this.minus}>minus</button>
    </div>) 
  }
}