import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Loader from '.';

describe('Loader', () => {
  it('renders', () => {
    render(<Loader />);
  });

  describe('when rendered with custom style with width and height', () => {
    it('should override the default loader sizes', () => {
      const { getByTestId } = render(
        <Loader
          data-testid="loaderElem"
          style={{ width: '123px', height: '123px' }}
        />
      );

      const loaderElem = getByTestId('loaderElem') as HTMLDivElement;
      expect(loaderElem.style.width).toBe('123px');
    });
  });

  describe('when rendered with additional class names', () => {
    it('should not replace the default classes', () => {
      const { getByTestId } = render(
        <Loader data-testid="loaderElem" className="loader" />
      );

      const loaderElem = getByTestId('loaderElem') as HTMLDivElement;
      const loaderClasses = loaderElem.className
        .split(' ')
        .filter((classes) => classes.match('\\w*(loader)\\w*'));
      expect(loaderClasses.length).toBe(2);
    });
  });
});
