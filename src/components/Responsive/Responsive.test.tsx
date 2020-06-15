import React from 'react';
import { shallow } from 'enzyme';

import Responsive from '.';

describe('Responsive.Container', () => {
  it('renders', () => {
    shallow(<Responsive.Container>Boom</Responsive.Container>);
  });
});

describe('Responsive.Element', () => {
  it('renders', () => {
    shallow(<Responsive.Element />);
  });
});

describe('Responsive.Element', () => {
  it('renders', () => {
    shallow(<Responsive.Element />);
  });
});

// describe('Responsive.Grid', () => {
//   it('renders', () => {
//     shallow(
//       <Responsive.Grid>
//         <p>Hello!</p>
//       </Responsive.Grid>
//     );
//   });
// });
