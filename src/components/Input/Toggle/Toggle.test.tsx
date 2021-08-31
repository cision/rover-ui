import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Toggle from './Toggle';

describe('Toggle', () => {
  it('renders', () => {
    render(<Toggle readOnly />);
  });

  describe('when rendered with id attribute', () => {
    it('should have the id attribute accessible in the dom element', () => {
      const { getByTestId } = render(
        <Toggle data-testid="toggleElem" id="toggleId" onChange={() => {}} />
      );

      const toggleElem = getByTestId('toggleElem');
      const toggleId = toggleElem.getAttribute('id') || '';
      expect(toggleId).toBe('toggleId');
    });
  });
});
