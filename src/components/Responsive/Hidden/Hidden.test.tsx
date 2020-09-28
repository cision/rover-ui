import React from 'react';
import { mount } from 'enzyme';
import Context from '../Context';
import Hidden from '.';

describe('<Hidden />', () => {
  it('renders without error', () => {
    mount(
      <Hidden>
        <span>Boom</span>
      </Hidden>
    );
  });

  it('hides by breakpoint', () => {
    const wrapper = mount(
      <Context.Provider
        value={[
          'container-sm-up',
          'container-sm-only',
          'container-sm-down',
          'container-md-down',
        ]}
      >
        <Hidden breakpoints={['container-sm-down']}>
          <span>Boom</span>
        </Hidden>
      </Context.Provider>
    );

    expect(wrapper.text()).toEqual('');
  });

  it("doesn't hide without breakpoint", () => {
    const wrapper = mount(
      <Context.Provider
        value={[
          'container-sm-up',
          'container-sm-only',
          'container-sm-down',
          'container-md-down',
        ]}
      >
        <Hidden breakpoints={['container-md-up']}>
          <span>Boom</span>
        </Hidden>
      </Context.Provider>
    );

    expect(wrapper.text()).toEqual('Boom');
  });
});
