import React from 'react';
import { mount } from 'enzyme';

import Icon from './';

describe('Icon', () => {
  it('renders', () => {
    const wrapper = mount(<Icon name="times-circle" />);

    expect(wrapper.find('svg').children()).toHaveLength(1);
  });
});
