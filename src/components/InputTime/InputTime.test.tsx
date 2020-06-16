import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import InputTime from './InputTime';

describe('InputTime', () => {
  it('renders', () => {
    const { getByLabelText } = render(
      <InputTime aria-label="time input" placeholder="Type a time" />
    );

    const baseInputTime = getByLabelText('time input') as HTMLInputElement;
    expect(baseInputTime.placeholder).toBe('Type a time');
    expect(baseInputTime.value).toBe('');
  });

  describe('Handles fuzzy values', () => {
    it("doesn't fire change callback without a valid input", () => {
      const handleChange = jest.fn((e) => e.target.value);
      const userInput = 'foo';

      const { getByLabelText } = render(
        <InputTime
          aria-label="time input"
          placeholder="Type a time"
          onChange={handleChange}
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;

      fireEvent.input(baseInputTime, { target: { value: userInput } });
      expect(baseInputTime.value).toBe(userInput);
      expect(handleChange.mock.calls.length).toBe(0);
    });

    it('Handles various values', () => {
      const inputOutputMap = {
        '1': '01:00',
        '1 p': '13:00',
        '3 15': '03:15',
        '3 15 pm': '15:15',
        '00:00': '00:00',
        '12:00': '12:00',
        '7h42': '07:42',
        '8,19p': '20:19',
      };

      const handleChange = jest.fn((e) => e.target.value);

      const { getByLabelText } = render(
        <InputTime
          aria-label="time input"
          placeholder="Type a time"
          onChange={handleChange}
        />
      );

      const baseInputTime = getByLabelText('time input') as HTMLInputElement;

      Object.entries(inputOutputMap).forEach(([k, v], i) => {
        fireEvent.input(baseInputTime, { target: { value: k } });
        expect(baseInputTime.value).toBe(k);
        expect(handleChange.mock.calls.length).toBe(i + 1);
        expect(handleChange.mock.results[i].value).toBe(v);
      });
    });
  });
});
