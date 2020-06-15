import React from 'react';
import { shallow } from 'enzyme';

import InputTime from './InputTime';

describe('InputTime', () => {
  it('renders', () => {
    shallow(<InputTime>Boom</InputTime>);
  });
});
