import React from 'react';
import { render } from '@testing-library/react';

import Item from '.';

describe('Item', () => {
  it('renders', () => {
    const { baseElement } = render(<Item>Boom</Item>);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders content', () => {
    const { getByText } = render(<Item>Boom</Item>);
    expect(getByText('Boom')).toBeTruthy();
  });

  describe("when there's an href", () => {
    it('renders a link', () => {
      const { getByText } = render(<Item href="foo">Hi</Item>);
      const menuItem = getByText('Hi') as HTMLAnchorElement;
      expect(menuItem.tagName).toEqual('A');
      expect(menuItem.href).toEqual('http://localhost/foo');
    });

    describe('and an onClick', () => {
      it('still renders a link', () => {
        const { getByText } = render(
          <Item href="foo" onClick={() => {}}>
            Hi
          </Item>
        );

        const menuItem = getByText('Hi');
        expect(menuItem.tagName).toEqual('A');
      });
    });
  });

  describe("when there's an onClick", () => {
    const { getByText } = render(<Item onClick={() => {}}>Hi</Item>);

    const menuItem = getByText('Hi');
    expect(menuItem.tagName).toEqual('BUTTON');
  });

  describe('when children is a React node', () => {
    it('still renders', () => {
      const { baseElement, getByText } = render(
        <Item>
          <span>Span!</span>
        </Item>
      );
      expect(baseElement).toMatchSnapshot();
      expect(getByText('Span!')).toBeTruthy();
    });
  });
});
