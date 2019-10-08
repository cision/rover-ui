import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './';

describe('Avatar', () => {
  it('renders', () => {
    shallow(<Avatar />);
  });

  it('does not show initials when loading=true', () => {
    const wrapper = shallow(<Avatar loading name="Helter Skelter" />);
    expect(wrapper.text()).toEqual('');
  });

  it('renders initials of name if no image url', () => {
    const wrapper = shallow(<Avatar name="Helter Skelter" />);
    expect(wrapper.text()).toEqual('HS');
  });

  it('Is the size specified', () => {
    const wrapper = shallow(<Avatar name="Helter Skelter" size={67} />);
    expect(wrapper.prop('style')).toHaveProperty('width', '67px');
    expect(wrapper.prop('style')).toHaveProperty('height', '67px');
  });
});
