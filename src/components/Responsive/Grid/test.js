import React from 'react';
import { shallow } from 'enzyme';
import Grid from './';

describe('<Grid />', () => {
  it('renders without error', () => {
    shallow(<Grid />);
  });
});
