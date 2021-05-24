import React from 'react';
import { mount, shallow } from 'enzyme';

import styles from './Button.module.css';

import Button from '.';

describe('Button', () => {
  it('renders a `button` tag without error', () => {
    const wrapper = mount(<Button />);
    const inner = wrapper.childAt(0);
    expect(inner.name()).toEqual('button');
  });

  it('You can override default props', () => {
    const wrapper = mount(<Button type="submit" />);
    expect(wrapper.prop('type')).toEqual('submit');
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

  describe('props.level', () => {
    it('adds "primary" level className', () => {
      const wrapper = shallow(<Button level="primary" />);
      expect(wrapper.hasClass(styles.primary)).toEqual(true);
    });
  });

  describe('props.outline', () => {
    it('adds "outline" className', () => {
      const wrapper = shallow(<Button outline />);
      expect(wrapper.hasClass(styles.outline)).toEqual(true);
    });
  });

  describe('props.size', () => {
    it('does not pass size prop to `Addon` children', () => {
      const wrapper = mount(
        <Button size="md">
          <Button.Addon size="md" />
        </Button>
      );
      let addon = wrapper.find(Button.Addon);
      expect(addon.props().size).toEqual('md');
      wrapper.setProps({ size: 'sm' });
      addon = wrapper.find(Button.Addon);
      expect(addon.props().size).toEqual('md');
      wrapper.setProps({ size: 'lg' });
      addon = wrapper.find(Button.Addon);
      expect(addon.props().size).toEqual('md');
    });
  });

  describe('props.href', () => {
    it('renders an anchor tag when there is an href', () => {
      const wrapper = mount(<Button href="#example" />);
      const inner = wrapper.childAt(0);
      expect(inner.name()).toEqual('a');
    });

    it('renders a button tag when there is not href', () => {
      const callback = jest.fn();
      const wrapper = mount(<Button onClick={callback} />);
      const inner = wrapper.childAt(0);
      expect(inner.name()).toEqual('button');
    });
  });
});
