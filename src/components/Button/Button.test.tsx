import React from 'react';
import { mount, shallow } from 'enzyme';

import Button from '.';

describe('Button', () => {
  it('renders a `button` tag without error', () => {
    const wrapper = mount(<Button />);
    const inner = wrapper.childAt(0);
    expect(inner.name()).toEqual('button');
  });

  describe('props.children', () => {
    it('renders strings', () => {
      const wrapper = shallow(<Button>Boom</Button>);
      expect(wrapper.text()).toEqual('Boom');
    });

    it('renders React nodes', () => {
      const wrapper = shallow(
        <Button>
          <span>Boom</span>
        </Button>
      );

      expect(wrapper.text()).toEqual('Boom');
    });
  });

  describe('props.className', () => {
    it('adds custom className', () => {
      const wrapper = shallow(<Button className="foo" />);
      expect(wrapper.hasClass('foo')).toEqual(true);
    });
  });

  describe('props.hollow', () => {
    // Our current test build doesn't do css modules, so this won't work
    // it('adds hollow className', () => {
    //   const wrapper = shallow(<Button hollow />);
    //   expect(wrapper.hasClass(style.hollow)).toEqual(true);
    // });
  });

  describe('props.level', () => {
    // Our current test build doesn't do css modules, so this won't work
    // it.ignore('adds "primary" level className', () => {
    //   const wrapper = shallow(<Button level="primary" />);
    //   expect(wrapper.hasClass(style.primary)).toEqual(true);
    // });
  });

  describe('props.size', () => {
    // Our current test build doesn't do css modules, so this doesn't work
    // it('adds "md" size className', () => {
    //   const wrapper = shallow(<Button size="md" />);
    //   expect(wrapper.hasClass(style.md)).toEqual(true);
    // });

    it('passes size prop to `Addon` children', () => {
      const wrapper = mount(
        <Button size="md">
          <Button.Addon />
        </Button>
      );
      let addon = wrapper.find(Button.Addon);
      expect(addon.props().size).toEqual('md');
      wrapper.setProps({ size: 'sm' });
      addon = wrapper.find(Button.Addon);
      expect(addon.props().size).toEqual('sm');
      wrapper.setProps({ size: 'lg' });
      addon = wrapper.find(Button.Addon);
      expect(addon.props().size).toEqual('lg');
    });
  });

  describe('props.tag', () => {
    it('renders a different html tag', () => {
      const wrapper = mount(<Button tag="span" />);
      const inner = wrapper.childAt(0);
      expect(inner.name()).toEqual('span');
    });
  });
});
