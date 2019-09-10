import React from 'react';
import { shallow, mount } from 'enzyme';

import Collapse from './';

describe('Collapse', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders its children', () => {
    const wrapper = mount(<Collapse>hello</Collapse>);
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.text()).toEqual('hello');
  });

  it('wraps Transition component', () => {
    const wrapper = shallow(<Collapse />);
    expect(wrapper.is('Transition')).toEqual(true);
  });

  it('has default isOpen value', () => {
    const wrapper = mount(<Collapse />);
    expect(wrapper.props().isOpen).toEqual(false);
  });

  it('has default timeout value', () => {
    const wrapper = mount(<Collapse />);
    expect(wrapper.props().timeout).toEqual(200);
  });

  it('sets transition duration when isOpen', () => {
    const wrapper = mount(<Collapse />);
    wrapper.setProps({ isOpen: true });
    expect(wrapper.getDOMNode().style.transitionDuration).toBe('200ms');
  });

  it('sets custom transition duration when custom timeout prop is passed', () => {
    const wrapper = mount(<Collapse timeout={400} />);
    wrapper.setProps({ isOpen: true });
    expect(wrapper.getDOMNode().style.transitionDuration).toBe('400ms');
  });

  it('forwards all Transition callbacks', () => {
    const callbacks = {
      onEnter: jest.fn(),
      onEntering: jest.fn(),
      onEntered: jest.fn(),
      onExit: jest.fn(),
      onExiting: jest.fn(),
      onExited: jest.fn(),
    };
    const wrapper = mount(<Collapse {...callbacks} />);

    wrapper.setProps({ isOpen: true });
    expect(callbacks.onEnter).toHaveBeenCalled();
    expect(callbacks.onEntering).toHaveBeenCalled();
    expect(callbacks.onEntered).not.toHaveBeenCalled();
    jest.runTimersToTime(200);
    expect(callbacks.onEntered).toHaveBeenCalled();
    expect(callbacks.onExit).not.toHaveBeenCalled();

    wrapper.setProps({ isOpen: false });
    expect(callbacks.onExit).toHaveBeenCalled();
    expect(callbacks.onExiting).toHaveBeenCalled();
    expect(callbacks.onExited).not.toHaveBeenCalled();
    jest.runTimersToTime(200);
    expect(callbacks.onExiting).toHaveBeenCalled();
    expect(callbacks.onExited).toHaveBeenCalled();
  });
});
