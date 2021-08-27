import React from 'react';
import { render, screen } from '@testing-library/react';

import Item from '.';

describe('Item', () => {
  it('renders', () => {
    const { baseElement } = render(<Item>Boom</Item>);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders content', () => {
    render(<Item>Boom</Item>);
    expect(screen.getByText('Boom')).toBeTruthy();
  });

  describe("when there's an href", () => {
    it('renders a link', () => {
      render(<Item href="foo">Hi</Item>);
      const menuItem = screen.getByRole('link', {
        name: 'Hi',
      }) as HTMLAnchorElement;
      expect(menuItem.href).toEqual('http://localhost/foo');
    });

    describe('and an onClick', () => {
      it('still renders a link', () => {
        render(
          <Item href="foo" onClick={() => {}}>
            Hi
          </Item>
        );

        expect(screen.getByRole('link', { name: 'Hi' })).toBeTruthy();
      });
    });
  });

  describe("when there's an onClick", () => {
    render(<Item onClick={() => {}}>Hi</Item>);
    expect(screen.getByRole('button', { name: 'Hi' })).toBeTruthy();
  });

  describe('when children is a React node', () => {
    it('still renders', () => {
      const { baseElement } = render(
        <Item>
          <span>Span!</span>
        </Item>
      );
      expect(baseElement).toMatchSnapshot();
      expect(screen.getByText('Span!')).toBeTruthy();
    });
  });
});
