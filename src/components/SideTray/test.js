import React from 'react';
import { shallow } from 'enzyme';

import SideTray from './';

describe('SideTray', () => {
  it('renders', () => {
    shallow(<SideTray>Boom</SideTray>);
  });
});
