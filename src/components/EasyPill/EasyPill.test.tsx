import React from 'react';
import { mount, shallow } from 'enzyme';

import Pill from '../Pill';
import EasyPill from '.';

describe('EasyPill', () => {
  it('renders', () => {
    shallow(<EasyPill onDelete={() => {}}>EasyPill</EasyPill>);
  });

  describe('with children', () => {
    it('renders its children', () => {
      const wrapper = mount(
        <EasyPill onDelete={() => {}}>EasyPill 1</EasyPill>
      );

      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.text()).toEqual('EasyPill 1');
    });

    it('renders its Addon with tooltip', () => {
      const tooltip = 'tooltip test';
      const wrapper = mount(
        <EasyPill tooltip={tooltip} onDelete={() => {}} checked>
          EasyPill 2
        </EasyPill>
      );
      const tooltipWapper = wrapper.find('Tooltip');
      expect(tooltipWapper.children()).toHaveLength(1);
    });
  });

  describe('with props.actions', () => {
    describe('when unchecked', () => {
      it("doesn't render actions", () => {
        const wrapper = mount(
          <EasyPill
            actions={[
              {
                label: 'Boom',
                onClick: () => {},
              },
              {
                label: 'Bang',
                onClick: () => {},
              },
            ]}
          >
            EasyPill 1
          </EasyPill>
        );

        // Should use css modules selector, but our version of react-scripts doesn't support it.
        const addons = wrapper.find(Pill.Addon);
        expect(addons.children()).toHaveLength(0);
      });
    });

    describe('when checked', () => {
      it('does render actions', () => {
        const wrapper = mount(
          <EasyPill
            actions={[
              {
                label: 'Boom',
                onClick: () => {},
              },
              {
                label: 'Bang',
                onClick: () => {},
              },
            ]}
            checked
          >
            EasyPill 1
          </EasyPill>
        );

        // Should use css modules selector, but our version of react-scripts doesn't support it.
        const addons = wrapper.find(Pill.Addon);
        expect(addons).toHaveLength(1);
      });
    });
  });
});
