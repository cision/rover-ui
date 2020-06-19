import React from 'react';
import { shallow } from 'enzyme';

import Body from '.';

describe('ExpansionPanel.body', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Body>Hello</Body>);

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.text()).toEqual('Hello');
  });

  it('can be fully styled', () => {
    const wrapper = shallow(
      <Body className="foo" style={{ backgroundColor: 'rebeccapurple' }} />
    );

    expect(wrapper.hasClass('foo')).toEqual(true);
    expect(wrapper.props().style).toEqual({ backgroundColor: 'rebeccapurple' });
  });
});
