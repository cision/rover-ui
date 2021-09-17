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

  describe('when clicked with onChange handler', () => {
    it('should call the handler with the expected value', async () => {
      let checkValue = false;
      const changeHandler = () => {
        checkValue = !checkValue;
      };
      const { getByTestId } = render(
        <Toggle
          data-testid="toggleElem"
          onChange={changeHandler}
          checked={checkValue}
        />
      );

      const toggleElem = getByTestId('toggleElem');

      toggleElem.click();
      expect(checkValue).toBe(true);

      toggleElem.click();
      expect(checkValue).toBe(false);
    });
  });
});
