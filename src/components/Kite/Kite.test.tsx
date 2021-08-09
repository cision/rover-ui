import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import Kite from './Kite';

const defaultProps = {
  visible: true,
  onClose: jest.fn(),
  ttl: 3000,
  canBeDismissed: true,
};

const renderKite = (props = defaultProps) =>
  render(
    <Kite
      {...props}
      icon={<Kite.Icon fill="red" height="20" name="warning" width="20" />}
    >
      <Kite.Header>Kite Title</Kite.Header>
      <Kite.Body>
        <p>Kite Content Goes here!</p>
      </Kite.Body>
    </Kite>
  );
describe('Kite', () => {
  it('renders correctly', () => {
    const { baseElement } = renderKite();
    expect(baseElement).toMatchSnapshot();
  });

  it("does not render when 'visible' prop is false", () => {
    render(<Kite visible={false} data-testid="Kite-Test" />);
    expect(screen.queryByTestId('Modal-Test')).not.toBeInTheDocument();
  });

  describe('Dismiss Button', () => {
    test.each`
      canBeDismissed | visible
      ${true}        | ${true}
      ${false}       | ${false}
    `(
      'when canBeDismissed = $canBeDismissed, the close button visible should be: $visible',
      ({ canBeDismissed }) => {
        render(
          <Kite {...defaultProps} canBeDismissed={canBeDismissed}>
            <Kite.Header>Title</Kite.Header>
          </Kite>
        );

        const dismissButton = screen.queryByTestId('kite-dismiss-button');
        if (canBeDismissed) {
          expect(dismissButton).toBeInTheDocument();
        } else {
          expect(dismissButton).not.toBeInTheDocument();
        }
      }
    );
  });

  describe('onClose callback', () => {
    it('calls onClose callback when dismiss button is clicked', async () => {
      render(
        <Kite {...defaultProps} onClose={defaultProps.onClose}>
          <Kite.Header>Title</Kite.Header>
        </Kite>
      );
      const dismissButton = screen.getByTestId('kite-dismiss-button');
      expect(dismissButton).toBeInTheDocument();

      userEvent.click(dismissButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
