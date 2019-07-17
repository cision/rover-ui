import React from 'react';
import { shallow } from 'enzyme';

import SideTray from './';

describe('SideTray', () => {
  it('renders', () => {
    const wrapper = shallow(
      <SideTray visible closeCallback={() => {}}>
        Hey I am a sidetray!
      </SideTray>
    );

    expect(wrapper.text()).toEqual('Hey I am a sidetray!');
  });

  it('renders header if exists', () => {
    const wrapper = shallow(
      <SideTray
        closeCallback={() => {}}
        header={<div className="header">header</div>}
      >
        Content
      </SideTray>
    );

    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('renders footer if exists', () => {
    const wrapper = shallow(
      <SideTray
        closeCallback={() => {}}
        footer={<div className="footer">footer</div>}
      >
        Content
      </SideTray>
    );

    expect(wrapper.find('.footer')).toHaveLength(1);
  });
});
