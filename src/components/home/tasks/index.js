import React from 'react';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';

const Task = ({ checked, label }) => (
  <Grid container item xs={12}>
    <FormControlLabel
      control={
        <Checkbox checked={checked} />
      }
      label={label}
    />
    <Button color="secondary">Delete</Button>
  </Grid>
);

const Tasks = () => (
  <Grid container item xs={12}>
    <Task checked={false} label="Dormir" />
  </Grid>
);

export default Tasks;
