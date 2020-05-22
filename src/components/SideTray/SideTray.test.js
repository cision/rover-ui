import React from 'react';
import { shallow } from 'enzyme';

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
});
