import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import Kite from './Kite';

const defaultProps = {
  visible: true,
  onClose: jest.fn(),
  title: 'Kite Title!',
  ttl: 3000,
  canBeDismissed: true,
};

const renderKite = (props = defaultProps) =>
  render(
    <Kite {...props}>
      <Kite.Icon
        fill="green"
        height="20"
        name="check"
        style={{ display: 'block' }}
        width="20"
      />
      <Kite.Content title="Kite Title" />
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
        render(<Kite {...defaultProps} canBeDismissed={canBeDismissed} />);

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
      render(<Kite {...defaultProps} />);
      const dismissButton = screen.getByTestId('kite-dismiss-button');
      expect(dismissButton).toBeInTheDocument();

      userEvent.click(dismissButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
