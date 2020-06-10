import React from 'react';
import { mount, shallow } from 'enzyme';

import Paper from '.';

describe('Paper', () => {
  it('renders', () => {
    shallow(<Paper>Boom</Paper>);
  });

  describe('with children renders children', () => {
    it('renders its children', () => {
      const wrapper = mount(
        <Paper>
          <div>Hello</div>
        </Paper>
      );

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.text()).toEqual('Hello');
    });
  });
});
