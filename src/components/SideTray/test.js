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

  it('correctly sets wrapperStyle', () => {
    const wrapper = mount(
      <SideTray
        visible
        onClose={() => {}}
        wrapperStyle={{ paddingTop: '45px' }}
      >
        I am a sidetray with marginTop!
      </SideTray>
    );
    expect(wrapper.html()).toContain('padding-top: 45px;');
  });

  it('does not include backdrop if closeOnOutsideClick is false', () => {
    const wrapper = mount(
      <SideTray visible onClose={() => {}} closeOnOutsideClick={false}>
        I am a sidetray that does not close on outside click!
      </SideTray>
    );

    expect(wrapper.contains(<button />)).toBe(false);
  });
});
