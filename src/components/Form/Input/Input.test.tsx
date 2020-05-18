import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('Input', () => {
  it('renders', () => {
    shallow(<Input value="Boom" />);
  });
});
