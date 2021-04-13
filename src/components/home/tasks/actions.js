export const actionsType = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  CHECK_TASK: 'CHECK_TASK',
};

export const addTask = (value) => ({
  type: actionsType.ADD_TASK,
  value,
});

export const deleteTask = (value) => ({
  type: actionsType.DELETE_TASK,
  value,
});

export const checkTask = (value) => ({
  type: actionsType.CHECK_TASK,
  value,
});
