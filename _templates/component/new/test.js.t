---
to: src/components/<%= h.changeCase.pascal(name) %>/test.js
unless_exists: true
---
import React from 'react';
import { shallow } from 'enzyme';

import <%= h.changeCase.pascal(name) %> from './';

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('renders', () => {
    shallow(<<%= h.changeCase.pascal(name) %>>Boom</<%= h.changeCase.pascal(name) %>>);
  });
});
