import React from 'react';
import { mount } from 'enzyme';
import Context from '../Context';
import Grid from './';
import BaseGrid from '../../Grid';

describe('<Grid />', () => {
  it('renders without error', () => {
    const wrapper = mount(
      <Grid>
        <span>Boom</span>
      </Grid>
    );

    expect(wrapper.find(BaseGrid).length).toEqual(1);
  });

  it('gets `columns` and `gutter` by breakpoint', () => {
    const wrapper = mount(
      <Context.Provider
        value={['container-sm-up', 'container-sm-only', 'container-sm-down']}
      >
        <Grid
          breakpoints={{
            'container-sm-only': {
              columns: 42,
              gutter: 'foo',
            },
            'container-md-only': {
              columns: 1,
              gutter: 'bar',
            },
          }}
        >
          <span>Boom</span>
        </Grid>
      </Context.Provider>
    );

    const baseGrid = wrapper.find(BaseGrid);
    expect(baseGrid.props().columns).toEqual(42);
    expect(baseGrid.props().gutter).toEqual('foo');
  });
});
