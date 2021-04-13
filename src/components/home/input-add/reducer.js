import { actionsType } from './actions';

const initalState = {
  value: '',
};

/**
 * update value
 * @param { Object } state
 * @param { Object } action
 * @return { Object } stateUpdated
 */
const updateValue = (state, action) => {
  const stateUpdated = state;

  stateUpdated.value = action.value;

  return stateUpdated;
};

const inputAdd = (state = initalState, action) => {
  switch (action.type) {
    case actionsType.UPDATE_VALUE:
      return updateValue(state, action);
    default:
      return state;
  }
};

export default inputAdd;
