import React from 'react';
import { shallow } from 'enzyme';

import Tooltip from './';

describe('Tooltip', () => {
  it('renders', () => {
    shallow(<Tooltip>Boom</Tooltip>);
  });
});
