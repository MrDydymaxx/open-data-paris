import React from 'react';
import {
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import './index.scss';

class Item extends React.Component {
  constructor(props) {
    super(props);

    const { onChecked } = this.props;

    this.onChecked = onChecked;
  }

  render() {
    const { item } = this.props;
    const { id, label, checked } = item;

    return (
      <Grid container item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={checked} onClick={() => this.onChecked(id)} />}
          label={label}
        />
      </Grid>
    );
  }
}

export default Item;
