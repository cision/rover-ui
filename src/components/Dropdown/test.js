import React from 'react';
import { mount, shallow } from 'enzyme';

import Dropdown from './';
import { isOpenContext } from './context';

describe('Dropdow;n', () => {
  it('renders children', () => {
    shallow(<Dropdown onToggle={() => {}}>Boom</Dropdown>);
  });

  describe('when isOpen is true', () => {
    describe('when disabled is false', () => {
      it('provides isOpenContext context of true', () => {
        const wrapper = mount(
          <Dropdown isOpen onToggle={() => {}}>
            <isOpenContext.Consumer>
              {isOpen => `isOpen: ${JSON.stringify(isOpen)}`}
            </isOpenContext.Consumer>
          </Dropdown>
        );

        expect(wrapper.text()).toEqual('isOpen: true');
      });
    });

    describe('when disabled is true', () => {
      it('provides isOpenContext context of false', () => {
        const wrapper = mount(
          <Dropdown disabled isOpen onToggle={() => {}}>
            <isOpenContext.Consumer>
              {isOpen => `isOpen: ${JSON.stringify(isOpen)}`}
            </isOpenContext.Consumer>
          </Dropdown>
        );

        expect(wrapper.text()).toEqual('isOpen: false');
      });
    });
  });

  describe('when isOpen is false', () => {
    it('provides isOpenContext context of false', () => {
      const wrapper = mount(
        <Dropdown onToggle={() => {}}>
          <isOpenContext.Consumer>
            {isOpen => `isOpen: ${JSON.stringify(isOpen)}`}
          </isOpenContext.Consumer>
        </Dropdown>
      );

      expect(wrapper.text()).toEqual('isOpen: false');
    });
  });

  describe('onToggle', () => {
    it('is called on Escape keypress', () => {
      const onToggleSpy = jest.fn();

      mount(
        <Dropdown isOpen onToggle={onToggleSpy}>
          <button type="button">Click me</button>
          <input type="text" />
        </Dropdown>
      );

      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

      expect(onToggleSpy.mock.calls.length).toEqual(1);
    });

    it('is called on click outside', () => {
      const onToggleSpy = jest.fn();

      const wrapper = mount(
        <div className="outside">
          <Dropdown isOpen onToggle={onToggleSpy}>
            Boom
          </Dropdown>
        </div>
      );

      document.dispatchEvent(
        new MouseEvent('click', {
          target: wrapper.find('.outside').getDOMNode(),
        })
      );

      expect(onToggleSpy.mock.calls.length).toEqual(1);
    });
  });
});
