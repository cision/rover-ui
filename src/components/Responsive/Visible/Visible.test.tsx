import React from 'react';
import { mount } from 'enzyme';
import Context from '../Context';
import Visible from '.';

describe('<Visible />', () => {
  it('renders without error', () => {
    mount(
      <Visible>
        <span>Boom</span>
      </Visible>
    );
  });

  it('shows by breakpoint', () => {
    const wrapper = mount(
      <Context.Provider
        value={[
          'container-sm-up',
          'container-sm-only',
          'container-sm-down',
          'container-md-down',
        ]}
      >
        <Visible breakpoints={['container-sm-down']}>
          <span>Boom</span>
        </Visible>
      </Context.Provider>
    );

    expect(wrapper.text()).toEqual('Boom');
  });

  it("doesn't show without breakpoint", () => {
    const wrapper = mount(
      <Context.Provider
        value={[
          'container-sm-up',
          'container-sm-only',
          'container-sm-down',
          'container-md-down',
        ]}
      >
        <Visible breakpoints={['container-md-up']}>
          <span>Boom</span>
        </Visible>
      </Context.Provider>
    );

    expect(wrapper.text()).toEqual('');
  });
});
