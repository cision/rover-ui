import React from 'react';
import { render } from '@testing-library/react';

import Option from './Option';

describe('Option', () => {
  it('renders', () => {
    const { baseElement } = render(<Option>Boom</Option>);
    expect(baseElement).toMatchSnapshot();
  });

  it("warns when there's no string value provided", () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Option>
        <strong>Some HTML</strong>
      </Option>
    );

    expect(warn).toBeCalledWith(
      'Option requires a `value` prop when `children` is not a string.'
    );
  });
});
