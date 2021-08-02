import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '.';

describe('Button', () => {
  it('renders a `button` tag without error', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('You can override default props', () => {
    render(<Button type="submit">Boom</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toEqual('submit');
  });

  describe('props.children', () => {
    it('renders strings', () => {
      render(<Button className="foo">Boom</Button>);
      expect(screen.getByRole('button').textContent).toEqual('Boom');
    });

    it('renders React nodes', () => {
      render(
        <Button className="foo">
          <span data-testid="bar">Boom</span>
        </Button>
      );

      expect(screen.getByRole('button').textContent).toEqual('Boom');
      expect(screen.getByTestId('bar')).toBeTruthy();
    });
  });

  describe('props.className', () => {
    it('adds custom className', () => {
      render(<Button className="foo">Boom</Button>);
      expect(screen.getByRole('button').classList).toContain('foo');
    });
  });

  describe('props.level', () => {
    it('adds custom className', () => {
      render(<Button level="primary">Boom</Button>);
      expect(screen.getByRole('button').classList).toContain('primary');
    });
  });

  describe('props.size', () => {
    describe('is available to `Addon` children by default', () => {
      it('sm', () => {
        render(
          <Button size="sm">
            <Button.Addon>Addon</Button.Addon>
          </Button>
        );

        expect(screen.getByText('Addon').classList).toContain('sm');
      });

      it('lg', () => {
        render(
          <Button size="lg">
            <Button.Addon>Addon</Button.Addon>
          </Button>
        );

        expect(screen.getByText('Addon').classList).toContain('lg');
      });
    });

    describe('can be overridden by `Addon` children', () => {
      it('sm', () => {
        render(
          <Button size="sm">
            <Button.Addon size="md">Addon</Button.Addon>
          </Button>
        );

        expect(screen.getByText('Addon').classList).toContain('md');
      });

      it('lg', () => {
        render(
          <Button size="lg">
            <Button.Addon size="md">Addon</Button.Addon>
          </Button>
        );

        expect(screen.getByText('Addon').classList).toContain('md');
      });
    });
  });

  describe('props.href', () => {
    it('renders an anchor tag when there is an href', () => {
      render(<Button href="#example">Boom</Button>);
      expect(screen.getByRole('link')).toBeTruthy();
    });

    it('renders a button tag when there is not href', () => {
      const callback = jest.fn();

      render(<Button onClick={callback}>Boom</Button>);

      const button = screen.getByRole('button');
      userEvent.click(button);

      expect(button).toBeTruthy();
      expect(callback).toBeCalledTimes(1);
    });
  });
});
