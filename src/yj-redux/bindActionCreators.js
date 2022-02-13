function bindActionCreator(creator, dispatch) {
  return function() {
    dispatch(creator.apply(this, arguments));
  }
}

export default function(creators, dispatch) {

  const boundActionCreators = {};
  for(let key in creators) {
    const creator = creators[key]
    if(typeof creator === 'function') {
      boundActionCreators[key] = bindActionCreator(creator, dispatch)
    }
  }

  return boundActionCreators;
}