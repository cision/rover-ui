import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './';

describe('Avatar', () => {
  it('reminds you to write some tests', () => {
    expect(false).toEqual(true);
  });

  it('renders', () => {
    shallow(<Avatar>Boom</Avatar>);
  });
});
