import React from 'react';
import { shallow } from 'enzyme';
import Grid from './';

describe('<Grid />', () => {
  test('renders without error', () => {
    shallow(<Grid />);
  });
});
