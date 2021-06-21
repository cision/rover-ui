import React from 'react';
import { render } from '@testing-library/react';

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
});
