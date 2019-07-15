import React from 'react';

import {
  Badge,
  Bar,
  Button,
  Media,
  Paper,
  Grid,
  Responsive,
} from '@cision/rover-ui';

const App = () => (
  <div>
    <section>
      <h1>Badge</h1>
      <Badge variant="info">Badge</Badge>
    </section>
    <section>
      <h1>Bar</h1>
      <Bar.Bar>
        <Bar.Fill width="50%" />
      </Bar.Bar>
    </section>
    <section>
      <h1>Button</h1>
      <Button>Button</Button>
    </section>
    <section>
      <h1>Media</h1>
      <Media>
        <Media.Item mr="md">
          <small>
            <em>Media.Item</em>
          </small>
          <img
            src="https://source.unsplash.com/64x64/daily"
            alt="Unsplash daily"
          />
        </Media.Item>
        <Media.Body>Media.Body</Media.Body>
      </Media>
    </section>
    <section>
      <h1>Paper</h1>
      <Paper>Paper</Paper>
    </section>
    <section>
      <h1>Grid</h1>
      <Grid columns={4} gutter="md">
        <Paper>Grid entry 1</Paper>
        <Paper>Grid entry 2</Paper>
        <Paper>Grid entry 3</Paper>
        <Paper>Grid entry 4</Paper>
      </Grid>
    </section>
    <section>
      <h1>Responsive</h1>
      <div
        style={{
          border: '1px solid black',
          padding: '20px',
          resize: 'horizontal',
          overflowX: 'hidden',
        }}
      >
        <Responsive.Container>
          <Responsive.Grid
            breakpoints={{
              'container-xs-down': {
                columns: 1,
                gutter: '20px',
              },
              'container-sm-up': {
                columns: 2,
                gutter: '20px',
              },
            }}
          >
            <Paper>Grid entry 1</Paper>
            <Paper>Grid entry 2</Paper>
            <Paper>Grid entry 3</Paper>
            <Paper>Grid entry 4</Paper>
          </Responsive.Grid>
        </Responsive.Container>
      </div>
    </section>
  </div>
);

export default App;
