import React from 'react';
import { shallow, mount } from 'enzyme';

import ExpansionPanel from './';

describe('ExpansionPanel', () => {
  it('is collaped by default', () => {
    const wrapper = mount(
      <ExpansionPanel>
        <ExpansionPanel.Header />
      </ExpansionPanel>
    );

    expect(wrapper.prop('expanded')).toBe(false);
  });

  it('renders header as first child', () => {
    const wrapper = shallow(
      <ExpansionPanel>
        <ExpansionPanel.Header />
        <ExpansionPanel.Body />
      </ExpansionPanel>
    );

    expect(wrapper.childAt(0).name()).toEqual('ExpansionPanel.Header');
  });

  it('renders body wrapped in Collapse component', () => {
    const wrapper = shallow(
      <ExpansionPanel>
        <ExpansionPanel.Header />
        <ExpansionPanel.Body />
      </ExpansionPanel>
    );

    const wrappedBody = wrapper.childAt(1);
    expect(wrappedBody.name()).toEqual('Collapse');
    expect(wrappedBody.children()).toHaveLength(1);
    expect(wrappedBody.childAt(0).name()).toEqual('ExpansionPanel.Body');
  });

  it('can be fully styled', () => {
    const wrapper = shallow(
      <ExpansionPanel className="foo" style={{ bar: 'bar' }}>
        <ExpansionPanel.Header />
      </ExpansionPanel>
    );

    expect(wrapper.hasClass('foo')).toEqual(true);
    expect(wrapper.props().style).toEqual({ bar: 'bar' });
  });

  it('invokes onToggle when header is clicked', () => {
    const handleToggle = jest.fn();

    const wrapper = shallow(
      <ExpansionPanel expanded={false} onToggle={handleToggle}>
        <ExpansionPanel.Header />
      </ExpansionPanel>
    );

    let header = wrapper.childAt(0);
    header.simulate('click', {});
    expect(handleToggle).toHaveBeenCalledWith({}, true);

    wrapper.setProps({ expanded: true });
    header = wrapper.childAt(0);
    header.simulate('click', {});
    expect(handleToggle).toHaveBeenCalledWith({}, false);
  });

  it('overrides collapse props', () => {
    const collapseProps = { foo: 'foo', bar: 'bar' };

    const wrapper = shallow(
      <ExpansionPanel collapseProps={collapseProps}>
        <ExpansionPanel.Header />
        <ExpansionPanel.Body />
      </ExpansionPanel>
    );

    const collapse = wrapper.childAt(1);
    expect(collapse.prop('foo')).toEqual('foo');
    expect(collapse.prop('bar')).toEqual('bar');
  });

  describe('in uncontrolled mode', () => {
    it('initial expanded is taken from `defaultExpanded`', () => {
      const wrapper = shallow(
        <ExpansionPanel defaultExpanded>
          <ExpansionPanel.Header />
          <ExpansionPanel.Body />
        </ExpansionPanel>
      );

      expect(wrapper.childAt(0).prop('expanded')).toEqual(true);
    });

    it('changing `expand` prop from outside should be ignored', () => {
      const wrapper = shallow(
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanel.Header />
          <ExpansionPanel.Body />
        </ExpansionPanel>
      );

      expect(wrapper.childAt(0).prop('expanded')).toEqual(false);
      wrapper.setProps({ expaned: true });
      expect(wrapper.childAt(0).prop('expanded')).toEqual(false);
    });

    it('should expand after clicking on the header', () => {
      const wrapper = shallow(
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanel.Header />
          <ExpansionPanel.Body />
        </ExpansionPanel>
      );

      expect(wrapper.childAt(0).prop('expanded')).toEqual(false);
      wrapper.childAt(0).simulate('click');
      expect(wrapper.childAt(0).prop('expanded')).toEqual(true);
      wrapper.childAt(0).simulate('click');
      expect(wrapper.childAt(0).prop('expanded')).toEqual(false);
    });

    it('should call `onToggle` if set', () => {
      const handleToggle = jest.fn();
      const wrapper = shallow(
        <ExpansionPanel onToggle={handleToggle} defaultExpanded={false}>
          <ExpansionPanel.Header />
          <ExpansionPanel.Body />
        </ExpansionPanel>
      );

      expect(wrapper.childAt(0).prop('expanded')).toEqual(false);
      wrapper.childAt(0).simulate('click', {});
      expect(handleToggle).toHaveBeenLastCalledWith({}, true);
      wrapper.childAt(0).simulate('click', {});
      expect(handleToggle).toHaveBeenLastCalledWith({}, false);
    });
  });
});
