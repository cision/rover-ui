import React, { Component } from 'react';

import { Badge, Button, Paper, Grid } from '@cision/rover-ui';

export default class App extends Component {
  render() {
    return (
      <div style={{ background: 'gray' }}>
        <Badge variant="info">Badge</Badge>
        <Button level="secondary">Boom</Button>
        <Grid columns={3} gutter="sm">
          <Paper>Hi</Paper>
          <Paper>Hi</Paper>
          <Paper>Hi</Paper>
          <Paper>Hi</Paper>
          <Paper>Hi</Paper>
          <Paper>Hi</Paper>
          <Paper>Hi</Paper>
        </Grid>
      </div>
    );
  }
}
