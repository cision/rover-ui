import React from 'react';
import { mount, shallow } from 'enzyme';
import { TestComponent } from '../../../setupTests';
import Container from '../Container';
import Element from '.';

describe('<Element />', () => {
  it('renders without error', () => {
    shallow(<Element />);
  });

  describe('with children', () => {
    describe('without responsive context', () => {
      const wrapper = mount(
        <Element>
          <TestComponent />
        </Element>
      );

      it('gets undefined as context', () => {
        expect(wrapper.find(TestComponent).props().responsiveContext).toEqual(
          undefined
        );
      });
    });

    describe('inside responsive context', () => {
      const wrapper = mount(
        <Container>
          <Element>
            <TestComponent />
          </Element>
        </Container>
      );

      it('gets responsive context', () => {
        expect(wrapper.find(TestComponent).props().responsiveContext).toEqual(
          []
        );
      });
    });
  });
});
