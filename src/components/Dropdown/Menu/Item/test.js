import React from 'react';
import { shallow } from 'enzyme';

import Item from './';

describe('Item', () => {
  it('renders', () => {
    shallow(<Item>Boom</Item>);
  });

  it('renders content', () => {
    const wrapper = shallow(<Item>Boom</Item>);
    expect(wrapper.text()).toEqual('Boom');
  });

  describe("when there's an href", () => {
    it('renders a link', () => {
      const wrapper = shallow(<Item href="foo">Hi</Item>);
      expect(wrapper.find('a').length).toEqual(1);
    });

    describe('and an onClick', () => {
      it('still renders a link', () => {
        const wrapper = shallow(
          <Item href="foo" onClick={() => {}}>
            Hi
          </Item>
        );
        expect(wrapper.find('a').length).toEqual(1);
        expect(wrapper.find('button').length).toEqual(0);
      });
    });
  });

  describe("when there's an onClick", () => {
    const wrapper = shallow(<Item onClick={() => {}}>Hi</Item>);
    expect(wrapper.find('button').length).toEqual(1);
  });

  describe('when children is a React node', () => {
    it('still renders', () => {
      const wrapper = shallow(
        <Item>
          <span>Span!</span>
        </Item>
      );
      expect(wrapper.find('span').length).toEqual(1);
      expect(wrapper.text()).toEqual('Span!');
    });
  });
});
