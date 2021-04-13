import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';

import { deleteTask, checkTask } from './tasks/actions';
import store from '../../../store';

onChange(e) {
    this.setState({
      value: e.target.value,
    });

    store.dispatch(updateValue(e.target.value));
  }

  onClick() {
    const { value } = this.state;

    store.dispatch(addTask(value));
  }
const Task = ({ checked, label }) => (
  <Grid container item xs={12}>
    <FormControlLabel
      control={<Checkbox checked={checked} />}
      label={label}
    />
    <Button color="secondary" onClick={deleteTask(this.state.id)}>Delete</Button>
  </Grid>
);

const Tasks = ({ tasks }) => (
  <Grid container item xs={12}>
    {tasks.map((task) => (<Task checked={task.checked} label={task.label} onClick={checkTask()} />))}
  </Grid>
);

const mapToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapToProps)(Tasks);
