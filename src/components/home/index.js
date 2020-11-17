import React from 'react';
import {
  Grid,
} from '@material-ui/core';

import InputAdd from './input-add';
import Tasks from './tasks';

const Home = () => (
  <Grid container spacing={1}>
    <InputAdd />
    <Tasks />
  </Grid>
);

export default Home;
