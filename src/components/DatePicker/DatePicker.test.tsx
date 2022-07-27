import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import DatePicker from '.';

describe('DatePicker', () => {
  it('renders', () => {
    render(<DatePicker />);
  });

  describe('when rendered with classnames props', () => {
    it('should append the custom class to the exisiting class', () => {
      const styleOverride = { wrapper: 'customWrapperClass' };
      const { getByTestId } = render(
        <div data-testid="datePickerElem">
          <DatePicker classNames={styleOverride} />
        </div>
      );

      const DatePickerElem = getByTestId('datePickerElem') as HTMLDivElement;
      const wrapperElem = DatePickerElem.firstChild
        ?.firstChild as HTMLDivElement;

      expect(wrapperElem.className).toContain('customWrapperClass');
    });
  });
});
