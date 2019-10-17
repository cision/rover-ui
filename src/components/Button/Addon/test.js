import React from 'react';
import { shallow } from 'enzyme';

import Addon from './';

describe('Addon', () => {
  describe('Main component', () => {
    it('renders an `Addon` tag without error', () => {
      shallow(<Addon size="sm" />);
    });

    describe('props.className', () => {
      it('adds custom className', () => {
        const wrapper = shallow(<Addon className="foo" size="sm" />);
        expect(wrapper.hasClass('foo')).toEqual(true);
      });
    });

    describe('props.size', () => {
      // Our current test build doesn't do css modules, so this doesn't work
      // it('adds "md" size className', () => {
      //   const wrapper = shallow(<Addon size="md" />);
      //   expect(wrapper.hasClass(style.md)).toEqual(true);
      // });
    });
  });
});
