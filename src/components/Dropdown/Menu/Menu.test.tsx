import React from 'react';
import { mount, shallow } from 'enzyme';

import { isOpenContext } from '../context';
import Menu from '.';

describe('Menu', () => {
  it('renders', () => {
    shallow(<Menu>Boom</Menu>);
  });

  it('renders contents when isOpenContext context is true', () => {
    const wrapper = mount(
      <isOpenContext.Provider value>
        <Menu>Hi</Menu>
      </isOpenContext.Provider>
    );

    expect(wrapper.text()).toEqual('Hi');
  });

  it("doesn't render when isOpenContext context is false", () => {
    const wrapper = mount(
      <isOpenContext.Provider value={false}>
        <Menu>Hi</Menu>
      </isOpenContext.Provider>
    );

    expect(wrapper.text()).toEqual('');
  });
});
