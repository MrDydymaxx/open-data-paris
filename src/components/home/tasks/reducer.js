import { actionsType } from './actions';

const initalState = [{
  id: '1',
  label: 'Dormir',
  checked: false,
}];

const addTask = (state) => (state);
const deleteTask = (state) => (state);
const checkTask = (state) => (state);

const tasks = (state = initalState, action) => {
  switch (action.type) {
    case actionsType.ADD_TASK:
      return addTask(state);
    case actionsType.DELETE_TASK:
      return deleteTask(state);
    case actionsType.CHECK_TASK:
      return checkTask(state);
    default:
      return state;
  }
};

export default tasks;
