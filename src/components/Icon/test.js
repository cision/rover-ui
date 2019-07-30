import React from 'react';
import { mount } from 'enzyme';

import Icon from './';

describe('Icon', () => {
  it('renders', () => {
    const wrapper = mount(<Icon name="clear" />);

    expect(wrapper.find('svg').children()).toHaveLength(1);
  });
});
