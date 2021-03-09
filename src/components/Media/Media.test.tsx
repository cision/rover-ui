import React, { useState } from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mount } from 'enzyme';

import Media from '.';

const TestWrapper = () => {
  const [val, setVal] = useState('');

  const handleOnChange = (e) => {
    setVal(e.target.value);
  };

  return (
    <Media>
      <Media.Body>
        <input
          data-testid="input-test"
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
    it('will not re-render everything unnecessarily', () => {
      const { getByTestId } = render(<TestWrapper />);
      const input = getByTestId('input-test') as HTMLInputElement;

      userEvent.tab();
      userEvent.type(input, 'h');
      userEvent.type(input, 'e');

      expect(document.activeElement).toEqual(input);
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
