import React from 'react';

import { mount, shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';

import EasyDropdown from '.';

describe('EasyDropdown', () => {
  it('renders', () => {
    shallow(<EasyDropdown>Boom</EasyDropdown>);
  });

  describe('props', () => {
    it('renders children', () => {
      const wrapper = shallow(<EasyDropdown>Boom</EasyDropdown>);
      expect(wrapper.find(Button).dive().text()).toEqual('Boom');
    });

    it('renders custom className', () => {
      const wrapper = mount(<EasyDropdown className="foo">Boom</EasyDropdown>);

      expect(wrapper.getDOMNode().getAttribute('class')).toContain('foo');
    });

    describe('with defaultIsOpen', () => {
      it('starts open when true', () => {
        render(<EasyDropdown defaultIsOpen>Boom</EasyDropdown>);

        expect(
          screen
            .getByRole('button', { name: 'Boom' })
            .getAttribute('data-is-open')
        ).toEqual('true');
      });

      it('starts closed when false', () => {
        render(<EasyDropdown defaultIsOpen={false}>Boom</EasyDropdown>);

        expect(
          screen
            .getByRole('button', { name: 'Boom' })
            .getAttribute('data-is-open')
        ).toEqual('false');
      });

      it("doesn't even care about controlled isOpen prop changes", () => {
        const { rerender } = render(
          <EasyDropdown defaultIsOpen>Boom</EasyDropdown>
        );

        rerender(<EasyDropdown defaultIsOpen={false}>Bang</EasyDropdown>);
        expect(
          screen
            .getByRole('button', { name: 'Bang' })
            .getAttribute('data-is-open')
        ).toEqual('true');
      });

      it('clicking a menu item closes the menu', async () => {
        const onClickMenuItemSpy = jest.fn();

        render(
          <EasyDropdown
            defaultIsOpen
            menuItems={[
              {
                children: <span className="item-foo">Bing</span>,
                label: 'Bang',
                onClick: onClickMenuItemSpy,
              },
            ]}
          >
            Boom
          </EasyDropdown>
        );

        userEvent.click(screen.getByText('Bing'));
        expect(onClickMenuItemSpy).toBeCalledTimes(1);

        expect(
          screen
            .getByRole('button', { name: 'Boom' })
            .getAttribute('data-is-open')
        ).toEqual('false');
      });
    });

    describe('without defaultIsOpen', () => {
      it('starts open when true', () => {
        const wrapper = mount(<EasyDropdown isOpen>Boom</EasyDropdown>);

        expect(
          wrapper.find(Button).getDOMNode().getAttribute('data-is-open')
        ).toEqual('true');
      });

      it('starts closed when false', () => {
        const wrapper = mount(<EasyDropdown isOpen={false}>Boom</EasyDropdown>);

        expect(
          wrapper.find(Button).getDOMNode().getAttribute('data-is-open')
        ).toEqual('false');
      });

      it('respects when isOpen prop changes', () => {
        const wrapper = mount(<EasyDropdown isOpen>Boom</EasyDropdown>);

        wrapper.setProps({ isOpen: false });

        expect(
          wrapper.find(Button).getDOMNode().getAttribute('data-is-open')
        ).toEqual('false');
      });
    });
  });
});
