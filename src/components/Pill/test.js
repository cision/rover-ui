import React from 'react';
import { mount, shallow } from 'enzyme';

import Pill from './';

describe('Pill', () => {
  it('renders', () => {
    shallow(
      <Pill id="pill" onClick={() => {}}>
        Pill
      </Pill>
    );
  });

  describe('with children renders children', () => {
    it('renders its children', () => {
      const wrapper = mount(
        <Pill id="pill-1" onClick={() => {}}>
          Pill 1
        </Pill>
      );

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.text()).toEqual('Pill 1');
    });
  });
});
