import React, { useEffect, useRef } from 'react';
import { render, fireEvent /*, waitFor*/ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputTime from './InputTime';

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

describe('InputTime', () => {
  it('renders', () => {
    const { getByLabelText } = render(
      <InputTime
        fuzzyInputProps={{
          'aria-label': 'time input',
          placeholder: 'Type a time',
        }}
      />
    );

    const baseInputTime = getByLabelText('time input') as HTMLInputElement;
    expect(baseInputTime.placeholder).toBe('Type a time');
    expect(baseInputTime.value).toBe('');
  });

  describe('when passed a custom `step` prop', () => {
    it('validates values against step + start of day', () => {
      const { getByTestId, rerender } = render(
        <InputTime
          data-testid="InputTime test"
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          step="2700"
          value="01:30"
        />
      );

      const baseInputTime = getByTestId('InputTime test') as HTMLInputElement;

      // Valid time
      expect(baseInputTime.classList).not.toContain('invalid');

      // Invalid time
      rerender(
        <InputTime
          data-testid="InputTime test"
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          step="2700"
          value="01:00"
        />
      );

      expect(baseInputTime.classList).toContain('invalid');
    });

    it('regular input validates values against step + min if present', async () => {
      const { getByTestId } = render(
        <input
          data-testid="InputTime test"
          min="01:30"
          onChange={() => {}}
          step="2700"
          value="01:30"
        />
      );

      const baseInput = getByTestId('InputTime test') as HTMLInputElement;
      expect(baseInput.validationMessage).toBeFalsy();
    });

    // it.only('validates values against step + min if present', async () => {
    //   // const { debug, getByTestId, rerender } = render(
    //   //   <InputTime
    //   //     data-testid="InputTime test"
    //   //     fuzzyInputProps={{ 'aria-label': "time input" }}
    //   //     min="01:30"
    //   //     step="2700"
    //   //     value="02:15"
    //   //   />
    //   // );
    //   //
    //   // debug();
    //   // const baseInputTime = getByTestId('InputTime test') as HTMLInputElement;
    //   //
    //   // await waitFor(() =>
    //   //   expect(baseInputTime.classList).not.toContain('invalid')
    //   // );
    //
    //   // Valid time
    //   // expect(baseInputTime.classList).not.toContain('invalid');
    //
    //   // // Invalid time
    //   // rerender(
    //   //   <InputTime
    //   //     data-testid="InputTime test"
    //   //     fuzzyInputProps={{ 'aria-label': "time input" }}
    //   //     min="01:30"
    //   //     step="2700"
    //   //     value="02:00"
    //   //   />
    //   // );
    //   //
    //   // expect(baseInputTime.classList).toContain('invalid');
    // });

    it('ignores invalid step values', () => {});

    describe('dropdown time picker', () => {
      it('shows options with correct intervals', () => {});

      it('shows options with 1 hour intervals if the step is invalid', () => {});
    });
  });

  describe('when passed a custom `formatTime` prop', () => {
    it('uses the custom formatter for the fuzzy input', () => {
      const { getByLabelText } = render(
        <InputTime
          formatTime={(date: Date) =>
            `${date.getHours()}🎈:${date.getMinutes()}🐝`
          }
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          value="01:30"
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;
      expect(baseInputTime.value).toEqual('1🎈:30🐝');
    });

    it('uses the custom formatter for the dropdown options', () => {
      const { getByLabelText, queryByText } = render(
        <InputTime
          formatTime={(date: Date) =>
            `${date.getHours()}🎈:${date.getMinutes()}🐝`
          }
          toggleAriaLabel="Toggle"
        />
      );

      const toggle = getByLabelText('Toggle');
      // Open dropdown
      userEvent.click(toggle);
      const select10 = queryByText('10🎈:0🐝');
      expect(select10).toBeTruthy();
    });
  });

  describe('dropdown time picker', () => {
    it('clicking a time selects it', () => {
      const handleChange = jest.fn((e) => {
        e.persist();
        return e;
      });

      const { getByLabelText, getByText, queryByText } = render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          onChange={handleChange}
          value="11:00"
          toggleAriaLabel="Toggle"
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;
      const toggle = getByLabelText('Toggle');
      let select10 = queryByText('10:00 AM');

      // Before clicking dropdown
      expect(baseInputTime.value).toBe('11:00 AM');
      expect(select10).toBeNull();
      // Open dropdown
      userEvent.click(toggle);
      select10 = getByText('10:00 AM');
      expect(select10).toBeTruthy();
      expect(handleChange.mock.calls.length).toBe(1);
      // Make a selection
      userEvent.click(select10);
      expect(baseInputTime.value).toBe('10:00 AM');
      expect(handleChange.mock.calls.length).toBe(2);
      expect(handleChange.mock.calls[1][0].target.value).toBe('10:00');
    });

    describe('`showDropdown` prop`', () => {
      it('`null` or "none" hides the dropdown', () => {
        const { queryByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            showDropdown={null}
            toggleAriaLabel="Toggle"
          />
        );

        const dropdownToggle = queryByLabelText('Toggle');
        expect(dropdownToggle).toBeNull();

        rerender(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            showDropdown="none"
            toggleAriaLabel="Toggle"
          />
        );

        expect(dropdownToggle).toBeNull();
      });

      it('"click" or `undefined` shows the dropdown', () => {
        const { queryByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            showDropdown="click"
            toggleAriaLabel="Toggle"
          />
        );

        const dropdownToggle = queryByLabelText('Toggle');
        expect(dropdownToggle).toBeTruthy();

        rerender(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            toggleAriaLabel="Toggle"
          />
        );

        expect(dropdownToggle).toBeTruthy();
      });
    });
  });

  describe('Handles bad values gracefully', () => {
    it("With bad user input, doesn't fire change callback", () => {
      const handleChange = jest.fn((e) => e.target.value);
      const userInput = 'foo';

      const { getByLabelText } = render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          onChange={handleChange}
          value=""
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;

      userEvent.type(baseInputTime, userInput);
      expect(baseInputTime.value).toBe(userInput);
      expect(handleChange.mock.calls.length).toBe(0);
    });

    describe("With empty controlled values, doesn't fail", () => {
      it('undefined', () => {
        const { getByLabelText } = render(
          <InputTime fuzzyInputProps={{ 'aria-label': 'time input' }} />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;
        expect(baseInputTime.value).toBe('');
      });

      it('empty string', () => {
        const { getByLabelText } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            value=""
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;
        expect(baseInputTime.value).toBe('');
      });
    });

    it('With garbage controlled values, fails', () => {
      const { getByLabelText } = render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          value="foo"
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;
      expect(baseInputTime.value).toBe('Invalid Date');
    });
  });

  describe('Supports ref forwarding', () => {
    it('with useRef', () => {
      const { getByLabelText, rerender } = render(
        <WithUseRef
          Component={InputTime}
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          value=""
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;
      expect(baseInputTime).not.toBe(document.activeElement);

      rerender(
        <WithUseRef
          Component={InputTime}
          focus
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          value=""
        />
      );

      expect(baseInputTime).toBe(document.activeElement);
    });

    it('with React.createRef', () => {
      const ref = React.createRef<any>();

      const { getByLabelText } = render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          ref={ref}
          value=""
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;
      expect(baseInputTime).not.toBe(document.activeElement);
      baseInputTime.focus();
      expect(baseInputTime).toBe(document.activeElement);
    });

    it('with callback refs', () => {
      const handleSetRef = jest.fn(() => {});
      render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          ref={handleSetRef}
          value=""
        />
      );

      const {
        mock: { calls },
      } = handleSetRef;

      let firstArgs: any = calls.length ? calls[0] : [];
      firstArgs = firstArgs.length ? firstArgs[0] : null;
      expect(handleSetRef.mock.calls.length).toBe(1);
      expect(firstArgs.toString()).toBe('[object HTMLInputElement]');
    });
  });

  describe('when passed ISO dates', () => {
    it('Handles several time string patterns', () => {
      const inputOutputMap = {
        '1': {
          hours: 1,
          minutes: 0,
        },
        '1 p': {
          hours: 13,
          minutes: 0,
        },
        '3 15': {
          hours: 3,
          minutes: 15,
        },
        '3 15 pm': {
          hours: 15,
          minutes: 15,
        },
        '00:00': {
          hours: 0,
          minutes: 0,
        },
        '12:00': {
          hours: 12,
          minutes: 0,
        },
        '12 a': {
          hours: 0,
          minutes: 0,
        },
        '12 p': {
          hours: 12,
          minutes: 0,
        },
        '7h42': {
          hours: 7,
          minutes: 42,
        },
        '8,19p': {
          hours: 20,
          minutes: 19,
        },
      };

      const handleChange = jest.fn((e) => e.target.value);

      const { getByLabelText } = render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          onChange={handleChange}
          value="2020-06-29T20:00:00.000Z"
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;

      Object.entries(inputOutputMap).forEach(([input, output], i) => {
        /*
            Don't use `userEvent.type()`` here because typing "3:15 pm" sets the
            value multiple times, with 03:00, 03:10, 03:15, and 15:15 values
          */
        fireEvent.input(baseInputTime, { target: { value: input } });
        expect(baseInputTime.value).toBe(input);
        expect(handleChange.mock.calls.length).toBe(i + 1);
        const selectedDate = new Date(handleChange.mock.results[i].value);
        expect(selectedDate.getHours()).toBe(output.hours);
        expect(selectedDate.getMinutes()).toBe(output.minutes);
      });
    });

    describe('validation', () => {
      it('validates `value` against same day `min` and `max`', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            max="2020-06-29T20:00:00.000Z"
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );

        // Equals `max`
        const baseInputTime = getByLabelText('time input') as HTMLInputElement;
        expect(baseInputTime.validationMessage).toBeFalsy();

        // Equals `min`
        rerender(
          <InputTime
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T10:00:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeFalsy();

        // Outside `max`
        rerender(
          <InputTime
            max="2020-06-29T20:00:00.000Z"
            value="2020-06-29T20:01:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeTruthy();

        // Outside `min`
        rerender(
          <InputTime
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T09:59:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeTruthy();

        // Impossible
        rerender(
          <InputTime
            max="2020-06-29T09:59:00.000Z"
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T09:59:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeTruthy();
      });

      it('disables when `min` or `max` make all selections impossible', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            max="2020-06-29T20:00:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );

        // Happy path
        const baseInputTime = getByLabelText('time input') as HTMLInputElement;
        expect(baseInputTime.disabled).toBeFalsy();

        // `max` is before today
        rerender(
          <InputTime
            max="2020-06-28T20:00:00.000Z"
            min="2020-06-29T20:00:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );

        expect(baseInputTime.disabled).toBeTruthy();

        // `min` is after today
        rerender(
          <InputTime
            max="2020-06-29T20:00:00.000Z"
            min="2020-06-30T20:00:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );

        expect(baseInputTime.disabled).toBeTruthy();

        // `min` and `max are both impossible`
        rerender(
          <InputTime
            max="2020-06-28T20:00:00.000Z"
            min="2020-06-30T10:00:00.000Z"
            value="2020-06-29T09:59:00.000Z"
          />
        );

        expect(baseInputTime.disabled).toBeTruthy();

        // Back to good
        rerender(<InputTime value="2020-06-29T20:00:00.000Z" />);
        expect(baseInputTime.disabled).toBeFalsy();
      });

      it('re-validates on `value` changes', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T10:00:00.000Z"
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;

        rerender(
          <InputTime
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T09:59:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeTruthy();
        rerender(
          <InputTime
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T10:01:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeFalsy();
      });

      it('re-validates on `max` changes', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            max="2020-06-29T20:00:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;

        rerender(
          <InputTime
            max="2020-06-29T19:59:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeTruthy();
        rerender(
          <InputTime
            max="2020-06-29T20:01:00.000Z"
            value="2020-06-29T20:00:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeFalsy();
      });

      it('re-validates on `min` changes', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            min="2020-06-29T10:00:00.000Z"
            value="2020-06-29T10:00:00.000Z"
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;

        rerender(
          <InputTime
            min="2020-06-29T10:01:00.000Z"
            value="2020-06-29T10:00:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeTruthy();
        rerender(
          <InputTime
            min="2020-06-29T09:59:00.000Z"
            value="2020-06-29T10:00:00.000Z"
          />
        );
        expect(baseInputTime.validationMessage).toBeFalsy();
      });
    });
  });

  describe('when passed string times', () => {
    it('Handles several time string patterns', () => {
      const inputOutputMap = {
        '1': '01:00',
        '1 p': '13:00',
        '3 15': '03:15',
        '3 15 pm': '15:15',
        '00:00': '00:00',
        '12:00': '12:00',
        '12 a': '00:00',
        '12 p': '12:00',
        '7h42': '07:42',
        '8,19p': '20:19',
      };

      const handleChange = jest.fn((e) => e.target.value);

      const { getByLabelText } = render(
        <InputTime
          fuzzyInputProps={{ 'aria-label': 'time input' }}
          onChange={handleChange}
          value=""
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;

      Object.entries(inputOutputMap).forEach(([input, output], i) => {
        /*
          Don't use `userEvent.type()`` here because typing "3:15 pm" sets the
          value multiple times, with 03:00, 03:10, 03:15, and 15:15 values
        */
        fireEvent.input(baseInputTime, { target: { value: input } });
        expect(baseInputTime.value).toBe(input);
        expect(handleChange.mock.calls.length).toBe(i + 1);
        expect(handleChange.mock.results[i].value).toBe(output);
      });
    });

    describe('validation', () => {
      it('validates `value` against `min` and `max`', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            max="20:00"
            min="10:00"
            value="20:00"
          />
        );

        // Equals `max`
        const baseInputTime = getByLabelText('time input') as HTMLInputElement;
        expect(baseInputTime.validationMessage).toBeFalsy();

        // Equals `min`
        rerender(<InputTime min="10:00" value="10:00" />);
        expect(baseInputTime.validationMessage).toBeFalsy();

        // Outside `max`
        rerender(<InputTime max="20:00" value="20:01" />);
        expect(baseInputTime.validationMessage).toBeTruthy();

        // Outside `min`
        rerender(<InputTime min="10:00" value="09:59" />);
        expect(baseInputTime.validationMessage).toBeTruthy();

        // Impossible
        rerender(<InputTime max="9:59" min="10:00" value="09:59" />);
        expect(baseInputTime.validationMessage).toBeTruthy();
      });

      it('re-validates on `value` changes', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            min="10:00"
            value="10:00"
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;

        rerender(<InputTime min="10:00" value="09:59" />);
        expect(baseInputTime.validationMessage).toBeTruthy();
        rerender(<InputTime min="10:00" value="10:01" />);
        expect(baseInputTime.validationMessage).toBeFalsy();
      });

      it('re-validates on `max` changes', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            max="20:00"
            value="20:00"
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;

        rerender(<InputTime max="19:59" value="20:00" />);
        expect(baseInputTime.validationMessage).toBeTruthy();
        rerender(<InputTime max="20:01" value="20:00" />);
        expect(baseInputTime.validationMessage).toBeFalsy();
      });

      it('re-validates on `min` changes', () => {
        const { getByLabelText, rerender } = render(
          <InputTime
            fuzzyInputProps={{ 'aria-label': 'time input' }}
            min="10:00"
            value="10:00"
          />
        );

        const baseInputTime = getByLabelText('time input') as HTMLInputElement;

        rerender(<InputTime min="10:01" value="10:00" />);
        expect(baseInputTime.validationMessage).toBeTruthy();
        rerender(<InputTime min="09:59" value="10:00" />);
        expect(baseInputTime.validationMessage).toBeFalsy();
      });
    });
  });
});
