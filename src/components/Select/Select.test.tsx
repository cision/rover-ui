import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from './Select';
import Option from './Option';

describe('Select', () => {
  it('renders', () => {
    const { baseElement } = render(
      <Select id="foo">
        <Option>Boom</Option>
      </Select>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('Select with loads of stuff', () => {
    const DefaultSelect = ({ now = new Date(), ...props }) => (
      <Select
        autoFocus
        defaultValue="Option 6"
        id="test-select"
        placeholder="Pick one"
        required
        {...props}
      >
        <Option value={now.toISOString()}>Now</Option>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
        <Option>Option 4</Option>
        <Option>Option 5</Option>
        <Option>Option 6</Option>
        <Option disabled>Option 7</Option>
        <Option>Option 8</Option>
        <Option>Option 9</Option>
        <Option>Option 10</Option>
        <Option>Option 11 is very wide, possibly too wide.</Option>
      </Select>
    );

    it('is auto-selected', () => {
      render(<DefaultSelect />);

      expect(document.activeElement).toHaveTextContent('Option 6');
    });

    it('selected option is focused on open', async () => {
      render(<DefaultSelect />);

      const toggle = screen.getByRole('button', {
        name: 'Option 6',
      });

      userEvent.click(toggle);
      const menu = await screen.findByRole('listbox');
      const option6 = within(menu).getByRole('option', { name: 'Option 6' });

      await waitFor(() => expect(option6).toEqual(document.activeElement));
    });
  });
});
