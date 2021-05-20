import React, { useEffect, useRef } from 'react';

import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

/* eslint-disable @typescript-eslint/no-explicit-any */
const WithUseRef = ({ Component, focus = false, ...passedProps }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref && ref.current) {
      if (focus) {
        ref.current.focus();
      } else {
        ref.current.blur();
      }
    }
  }, [focus]);

  return <Component ref={ref} {...passedProps} />;
};
/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Input', () => {
  it('renders', () => {
    const { baseElement } = render(<Checkbox onChange={() => {}} />);
    expect(baseElement).toMatchSnapshot();
  });

  describe('Supports ref forwarding', () => {
    it('with useRef', () => {
      const { getByTestId, rerender } = render(
        <WithUseRef
          Component={Checkbox}
          data-testid="my-checkbox"
          onChange={() => {}}
        />
      );

      const checkbox = getByTestId('my-checkbox') as HTMLInputElement;

      expect(checkbox).not.toBe(document.activeElement);

      rerender(<WithUseRef Component={Checkbox} focus />);

      expect(checkbox).toBe(document.activeElement);
    });

    it('with React.createRef', () => {
      const ref = React.createRef<any>();

      const { getByTestId } = render(
        <Checkbox ref={ref} data-testid="my-checkbox" onChange={() => {}} />
      );

      const checkbox = getByTestId('my-checkbox') as HTMLInputElement;
      expect(checkbox).not.toBe(document.activeElement);
      checkbox.focus();
      expect(checkbox).toBe(document.activeElement);
    });

    it('with callback refs', () => {
      const handleSetRef = jest.fn(() => {});

      render(<Checkbox ref={handleSetRef} onChange={() => {}} />);

      const {
        mock: { calls },
      } = handleSetRef;

      let firstArgs: any = calls.length ? calls[0] : [];
      firstArgs = firstArgs.length ? firstArgs[0] : null;
      expect(handleSetRef.mock.calls.length).toBe(1);
      expect(firstArgs.toString()).toBe('[object HTMLInputElement]');
    });
  });
});
