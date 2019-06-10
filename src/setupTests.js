// setup file
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const TestComponent = props => <div {...props} />;

const setupTests = {
  TestComponent,
};

export default setupTests;
