import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Avatar from '.';

jest.useFakeTimers();

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

  it('renders initials of name with emojis if no image url', () => {
    const wrapper = shallow(<Avatar name="Helter 🔥" />);
    expect(wrapper.text()).toEqual('H🔥');
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
    const imageUrl = `https://via.placeholder.com/350x150`;
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      get: () => 120,
    });
    const wrapper = mount(
      <Avatar
        name="Helter Skelter"
        imageUrl={imageUrl}
        imageFetcher={({ onLoad, src }) => {
          onLoad(src);
        }}
      />
    );
    expect(wrapper.text()).toEqual('');
    expect(wrapper.children().prop('style')).toHaveProperty(
      'backgroundImage',
      `url(${imageUrl})`
    );
  });

  it("doesn't suffer from race condition problems", () => {
    const firstImageUrl = `http://some.url/first-image.png`;
    const secondImageUrl = `http://some.url/second-image.png`;
    const imageOnLoad = jest.fn();
    const firstImageCleanupFunction = jest.fn();
    const timeout = 500;
    const slowImageFetcher = ({ onLoad, src }) => {
      let shouldExecute = true;
      setTimeout(() => shouldExecute && onLoad(src), timeout);

      // Cleanup function
      return () => {
        shouldExecute = false;
        firstImageCleanupFunction();
      };
    };
    const fastImageFetcher = ({ onLoad, src }) => {
      let shouldExecute = true;
      setTimeout(() => shouldExecute && onLoad(src), timeout / 2);

      // Cleanup function
      return () => {
        shouldExecute = false;
      };
    };
    const wrapper = mount(
      <Avatar
        name="Helter Skelter"
        imageUrl={firstImageUrl}
        imageFetcher={slowImageFetcher}
        onLoad={imageOnLoad}
      />
    );

    wrapper.setProps({
      imageUrl: secondImageUrl,
      imageFetcher: fastImageFetcher,
    });
    act(() => {
      jest.runTimersToTime(timeout);
    });
    expect(firstImageCleanupFunction).toHaveBeenCalled();
    expect(imageOnLoad).not.toHaveBeenCalledWith(firstImageUrl);
    expect(imageOnLoad).toHaveBeenCalledWith(secondImageUrl);
  });
});
