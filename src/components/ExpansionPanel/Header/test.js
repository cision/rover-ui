import React from 'react';
import { shallow } from 'enzyme';

import Header from './';

describe('ExpansionPanel.Header', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Header>Hello</Header>);

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.text()).toEqual('Hello');
  });

  it('renders expand icon at the end', () => {
    const expandIcon = <span>ExpandIcon</span>;
    const wrapper = shallow(<Header expandIcon={expandIcon}>Hello</Header>);

    expect(wrapper.text()).toEqual('HelloExpandIcon');
  });

  it('can be fully styled', () => {
    const wrapper = shallow(<Header className="foo" style={{ bar: 'bar' }} />);

    expect(wrapper.hasClass('foo')).toEqual(true);
    expect(wrapper.props().style).toEqual({ bar: 'bar' });
  });

  it('can receive children as render prop', () => {
    let wrapper = shallow(<Header>{() => 'Hello'}</Header>);
    expect(wrapper.text()).toEqual('Hello');

    const expandIcon = <span>ExpandIcon</span>;
    wrapper = shallow(
      <Header expandIcon={expandIcon}>{icon => <div>{icon}Hello</div>}</Header>
    );
    expect(wrapper.text()).toEqual('ExpandIconHello');
  });
});
