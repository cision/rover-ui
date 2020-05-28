import React, { useState } from 'react';
import { mount } from 'enzyme';

import Media from '.';

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

type OverrideInstanceFocus = {
  instance: () => {
    focus: () => void;
  };
};

describe('Media', () => {
  describe('Media.Item', () => {
    it('will not re-render everything unnecessarily', () => {
      const wrapper = mount(<TestWrapper />);
      const input = wrapper.find('input#input-test');

      // TypeScript _really_ doesn't think `focus` exists.
      ((input as unknown) as OverrideInstanceFocus).instance().focus();

      input.simulate('change', { target: { value: 'h' } });
      input.simulate('change', { target: { value: 'he' } });

      expect(wrapper.find('#input-test').is(':focus')).toBe(true);
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
