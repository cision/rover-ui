import React from 'react';
import { shallow } from 'enzyme';
import Entry from './';

describe('<Entry />', () => {
  test('renders', () => {
    shallow(<Entry />);
  });
});
