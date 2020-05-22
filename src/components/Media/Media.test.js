import React, { useState } from 'react';
import { mount } from 'enzyme';

import Media from './';

const TestWrapper = () => {
  const [val, setVal] = useState('');

  const handleOnChange = (e) => {
    setVal(e.target.value);
  };

  return (
    <Media>
      <Media.Body id="media-body">
        <input
          id="input-test"
          type="text"
          value={val}
          onChange={handleOnChange}
        />
      </Media.Body>
    </Media>
  );
};

describe('Media', () => {
  describe('Media.Item', () => {
    xit('supports custom tags', () => {
      const wrapper = mount(
        <Media tag="main">
          <Media.Item tag="aside">Hello</Media.Item>
        </Media>
      );

      expect(wrapper.find('main')).toHaveLength(1);
      expect(wrapper.find('main aside')).toHaveLength(1);
    });

    it('will not re-render everything unnecessarily', () => {
      const wrapper = mount(<TestWrapper />);
      const input = wrapper.find('input#input-test');

      input.instance().focus();

      input.simulate('change', { target: { value: 'h' } });
      input.simulate('change', { target: { value: 'he' } });

      expect(input.is(':focus')).toBe(true);
    });

    it('renders its children', () => {
      const wrapper = mount(
        <Media className="media-classname">
          <Media.Item className="item-classname">Hello</Media.Item>
        </Media>
      );

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find('.media-classname').length).toBeGreaterThan(0);
      expect(wrapper.text()).toEqual('Hello');
    });
  });

  describe('Media.Body', () => {
    xit('supports custom tags', () => {
      const wrapper = mount(
        <Media tag="main">
          <Media.Body tag="content">Hello</Media.Body>
        </Media>
      );

      expect(wrapper.find('main')).toHaveLength(1);
      expect(wrapper.find('main content')).toHaveLength(1);
    });

    it('renders its children', () => {
      const wrapper = mount(
        <Media>
          <Media.Body className="body-classname">Hello</Media.Body>
        </Media>
      );

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find('.body-classname').length).toBeGreaterThan(0);
      expect(wrapper.text()).toEqual('Hello');
    });
  });
});
