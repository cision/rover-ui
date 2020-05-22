import React from 'react';
import { shallow } from 'enzyme';

import Callout from './Callout';

describe('Callout', () => {
  it('renders', () => {
    shallow(<Callout>Boom</Callout>);
  });
});
