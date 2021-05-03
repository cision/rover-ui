import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import Modal from './Modal';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
};

const renderModal = (props = defaultProps) =>
  render(
    <Modal {...props}>
      <Modal.Header>
        <p>Modal Header</p>
      </Modal.Header>
      <Modal.Body>
        <p>Modal Body</p>
      </Modal.Body>
      <Modal.Footer>
        <p>Modal Footer</p>
      </Modal.Footer>
    </Modal>
  );
describe('Modal', () => {
  it('renders correctly', () => {
    const { baseElement } = renderModal();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders', () => {
    render(<Modal isOpen data-testid="Modal-Test" />);
    expect(screen.getByTestId('Modal-Test')).toBeInTheDocument();
  });

  it("does not render when 'isOpen' prop is false", () => {
    render(<Modal isOpen={false} data-testid="Modal-Test" />);
    expect(screen.queryByTestId('Modal-Test')).not.toBeInTheDocument();
  });

  describe('Modal CSS Classes', () => {
    test.each`
      size         | level        | sizeClass | levelClass
      ${'sm'}      | ${'primary'} | ${'sm'}   | ${'level--primary'}
      ${'md'}      | ${'warning'} | ${'md'}   | ${'level--warning'}
      ${'lg'}      | ${undefined} | ${'lg'}   | ${'level--primary'}
      ${undefined} | ${undefined} | ${'md'}   | ${'level--primary'}
      ${'lg'}      | ${'info'}    | ${'lg'}   | ${'level--info'}
      ${undefined} | ${'danger'}  | ${'md'}   | ${'level--danger'}
    `(
      'when size prop = $size and level prop = $level, the modal should have css classes $sizeClass and $levelClass',
      ({ size, level, sizeClass, levelClass }) => {
        render(
          <Modal isOpen size={size}>
            <Modal.Header data-testid="Modal-Header" level={level}>
              <h4>Test Header</h4>
            </Modal.Header>
          </Modal>
        );
        const modalContentDiv = screen.getByRole('dialog');
        expect(modalContentDiv).toHaveClass(sizeClass);
        expect(screen.getByTestId('Modal-Header')).toHaveClass(levelClass);
      }
    );
  });

  describe('onClose callback', () => {
    it('calls onClose callback when the escape key is pressed', async () => {
      const onClose = jest.fn();
      render(<Modal isOpen onClose={onClose} data-testid="Modal-Test" />);
      const modal = screen.getByTestId('Modal-Test');
      expect(modal).toBeInTheDocument();

      userEvent.type(modal, '{esc}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
