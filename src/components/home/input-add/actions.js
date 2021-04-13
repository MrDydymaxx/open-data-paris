export const actionsType = {
  UPDATE_VALUE: 'UPDATE_VALUE',
};

export const updateValue = (value) => ({
  type: actionsType.UPDATE_VALUE,
  value,
});
