import React from 'react';
import { shallow, mount } from 'enzyme';

import SideTray from './';

describe('SideTray', () => {
  it('renders', () => {
    const wrapper = shallow(
      <SideTray visible onClose={() => {}}>
        Hey I am a sidetray!
      </SideTray>
    );

    expect(wrapper.text()).toEqual('Hey I am a sidetray!');
  });

  it('renders correctly with marginTop set', () => {
    const wrapper = mount(
      <SideTray visible onClose={() => {}} marginTop="45px">
        I am a sidetray with marginTop!
      </SideTray>
    );
    const backdrop = wrapper.find('button');

    expect(backdrop.prop('style')).toEqual({ marginTop: '45px' });
    expect(wrapper.html()).toContain('margin-top: 45px;');
  });

  it('defaults marginTop to 0', () => {
    const wrapper = mount(
      <SideTray visible onClose={() => {}}>
        I am a sidetray with marginTop!
      </SideTray>
    );
    const backdrop = wrapper.find('button');

    expect(backdrop.prop('style')).toEqual({ marginTop: '0px' });
    expect(wrapper.html()).toContain('margin-top: 0px;');
  });

  it('does not include backdrop if closeOnOutsideClick is false', () => {
    const wrapper = mount(
      <SideTray visible onClose={() => {}} closeOnOutsideClick={false}>
        I am a sidetray with marginTop!
      </SideTray>
    );

    expect(wrapper.contains(<button />)).toBe(false);
  });
});
