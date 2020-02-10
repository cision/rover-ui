import React from 'react';
import { shallow, mount } from 'enzyme';

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

  it('renders initials of the image url results in non-200 response', () => {
    const imageUrl = 'http://some.url/not-image';
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      get: () => 0,
    });
    const wrapper = shallow(
      <Avatar name="Helter Skelter" imageUrl={imageUrl} />
    );
    expect(wrapper.text()).toEqual('HS');
  });

  it('renders an image in bg assuming valid url', () => {
    const imageUrl = `http://some.url/image.png`;
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      get: () => 120,
    });
    const wrapper = mount(<Avatar name="Helter Skelter" imageUrl={imageUrl} />);
    expect(wrapper.text()).toEqual('');
    expect(wrapper.children().prop('style')).toHaveProperty(
      'backgroundImage',
      `url(${imageUrl})`
    );
  });
});
