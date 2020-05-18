---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.test.tsx
unless_exists: true
---
import React from 'react';
import { shallow } from 'enzyme';

import <%= h.changeCase.pascal(name) %> from '.';

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('reminds you to write some tests', () => {
    expect(false).toEqual(true);
  });

  it('renders', () => {
    shallow(<<%= h.changeCase.pascal(name) %>>Boom</<%= h.changeCase.pascal(name) %>>);
  });
});
