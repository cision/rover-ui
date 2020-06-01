import React from 'react';
import { shallow } from 'enzyme';

import Input from './';

describe('Input', () => {
  it('renders', () => {
    shallow(<Input />);
  });
});
