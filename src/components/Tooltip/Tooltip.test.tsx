import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Tooltip from '.';

describe('Tooltip', () => {
  it('renders', () => {
    render(
      <Tooltip content={<button type="button">Foo</button>}>Boom</Tooltip>
    );
  });

  describe('when a text only tooltip is rendered', () => {
    describe('with a custom style width using the tooltipProps', () => {
      it('should have a textContentHasWidth class', () => {
        const { getByTestId, queryByText } = render(
          <Tooltip
            isOpen
            content="Text Content with width props"
            tooltipProps={{
              style: {
                width: '100px',
              },
            }}
            data-testid="tooltipElem"
          />
        );

        const tooltipElem = getByTestId('tooltipElem');
        userEvent.hover(tooltipElem);
        const tooltipContent = queryByText('Text Content with width props');

        expect(tooltipContent?.className).toEqual('textContentHasWidth');
      });
    });

    describe('with a tooltipWidth prop', () => {
      it('should have a textContentHasWidth class', () => {
        const { getByTestId, queryByText } = render(
          <Tooltip
            isOpen
            content="Text Content with width props"
            tooltipWidth="100px"
            data-testid="tooltipElem"
          />
        );

        const tooltipElem = getByTestId('tooltipElem');
        userEvent.hover(tooltipElem);
        const tooltipContent = queryByText('Text Content with width props');

        expect(tooltipContent?.className).toEqual('textContentHasWidth');
      });
    });

    describe('without a tooltipWidth prop', () => {
      it('should have a textContent class', () => {
        const { getByTestId, queryByText } = render(
          <Tooltip
            isOpen
            content="Text Content with no width props"
            data-testid="tooltipElem"
          />
        );

        const tooltipElem = getByTestId('tooltipElem');
        userEvent.hover(tooltipElem);
        const tooltipContent = queryByText('Text Content with no width props');

        expect(tooltipContent?.className).toEqual('textContent');
      });
    });
  });

  describe('when open state is fully controlled', () => {});

  describe('when props.showOnHover', () => {
    describe('is false', () => {
      it('hover and focus have no effect on open state', () => {
        const { getByTestId, queryByText } = render(
          <Tooltip
            isOpen={false}
            showOnHover={false}
            content={<button type="button">Foo</button>}
          >
            <span data-testid="toggleButton">Boom</span>
          </Tooltip>
        );

        const toggleButton = getByTestId('toggleButton');
        userEvent.hover(toggleButton);

        expect(queryByText('Foo')).toEqual(null);
      });
    });

    describe('is true', () => {
      it('hovering opens the tooltip', () => {
        const { getByTestId, getByText } = render(
          <Tooltip showOnHover content={<div>Foo</div>}>
            <span data-testid="toggleButton">Boom</span>
          </Tooltip>
        );

        userEvent.hover(getByTestId('toggleButton'));
        expect(getByText('Foo'));
      });

      it('focusing opens the tooltip', () => {
        const { getByText } = render(
          <Tooltip showOnHover content={<button type="button">Foo</button>}>
            <span data-testid="toggleButton">Boom</span>
          </Tooltip>
        );

        userEvent.tab();
        expect(getByText('Foo'));
      });
    });
  });
});
