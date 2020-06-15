import React from 'react';
import { mount, shallow } from 'enzyme';

import Icon from '../Icon';
import DeletablePill from '.';

describe('DeletablePill', () => {
  it('renders', () => {
    shallow(<DeletablePill onDelete={() => {}}>DeletablePill</DeletablePill>);
  });

  describe('with children', () => {
    it('renders its children', () => {
      const wrapper = mount(
        <DeletablePill onDelete={() => {}}>DeletablePill 1</DeletablePill>
      );

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.text()).toEqual('DeletablePill 1');
    });
  });

  describe('when unchecked', () => {
    it("doesn't show clear action", () => {
      const wrapper = mount(
        <DeletablePill onDelete={() => {}}>DeletablePill 1</DeletablePill>
      );

      const clear = wrapper.find(Icon);

      expect(clear).toHaveLength(0);
    });
  });

  describe('when checked', () => {
    it('shows clear action', () => {
      const wrapper = mount(
        <DeletablePill checked onDelete={() => {}}>
          DeletablePill 1
        </DeletablePill>
      );

      const clear = wrapper.find(Icon);

      expect(clear).toHaveLength(1);
    });
  });
});
