import React from 'react';
import { mount, shallow } from 'enzyme';

import Paper from './';

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
      expect(wrapper.childAt(0).text()).toEqual('Hello');
    });

    it(`renders with default props`, () => {
      const wrapper = mount(
        <Paper>
          <div>Hello</div>
        </Paper>
      );
      expect(wrapper.props().bg).toEqual('white');
      expect(wrapper.props().borderRadius).toEqual('2px');
      expect(wrapper.props().color).toEqual('gray');
    });

    it(`renders with style prop overrides`, () => {
      const wrapper = mount(
        <Paper p={6}>
          <div>Hello</div>
        </Paper>
      );
      expect(wrapper.props().p).toEqual(6);
    });
  });
});
