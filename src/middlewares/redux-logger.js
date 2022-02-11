export default function({getState, dispatch}) {
  return dispatch2 => action => {
    console.log('prev state ', getState())
    console.log('action     ', action);
    const newValue = dispatch2(action);
    console.log('next state ', getState());
    return newValue;
  }
}