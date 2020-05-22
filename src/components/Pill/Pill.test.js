import React from 'react';
import { mount, shallow } from 'enzyme';

import Pill from './';

describe('Pill', () => {
  it('renders', () => {
    shallow(<Pill onClick={() => {}}>Pill</Pill>);
  });

  describe('with non-Addon children', () => {
    it('renders its children', () => {
      const wrapper = mount(<Pill onClick={() => {}}>Pill 1</Pill>);

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.text()).toEqual('Pill 1');
    });

    it('wraps children', () => {
      const wrapper = mount(<Pill onClick={() => {}}>Pill 1</Pill>);
      // Should use css modules selector, but our version of react-scripts doesn't support it.
      const content = wrapper.find('span');

      expect(content).toHaveLength(1);
      expect(content.text()).toEqual('Pill 1');
    });
  });

  describe('with Addon children', () => {
    it('wraps Addons', () => {
      const wrapper = mount(
        <Pill onClick={() => {}}>
          <Pill.Addon>Foo</Pill.Addon>Pill 1<Pill.Addon>Bar</Pill.Addon>
        </Pill>
      );

      // Should use css modules selector, but our version of react-scripts doesn't support it.
      const addons = wrapper.find('div[role="button"] > div');

      expect(addons).toHaveLength(2);
      expect(addons.at(0).text()).toEqual('Foo');
      expect(addons.at(1).text()).toEqual('Bar');
    });
  });
});
