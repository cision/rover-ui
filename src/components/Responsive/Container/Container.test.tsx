import React from 'react';
import { mount, shallow } from 'enzyme';
import { ContainerQuery } from '@cision/react-container-query';

import { TestComponent, TestComponentProps } from '../../../setupTests';

import Container from '.';
import Context from '../Context';

const TestComponentWithContext = (props: TestComponentProps) => (
  <Context.Consumer>
    {(context) => <TestComponent {...props} testcontext={context} />}
  </Context.Consumer>
);

describe('Responsive.Container', () => {
  it('renders', () => {
    shallow(<Container>Boom</Container>);
  });

  it('passes props', () => {
    const wrapper = mount(<Container className="foo">Boom</Container>);
    const inner = wrapper.find('div').first();
    expect(inner.hasClass('foo')).toEqual(true);
  });

  describe('Responsive `Context`', () => {
    describe('without `props.customBreakpoints`', () => {
      it('passes default query to ContainerQuery', () => {
        const wrapper = mount(
          <Container>
            <TestComponent />
          </Container>
        );

        const containerQuery = wrapper.find(ContainerQuery);
        expect(containerQuery.length).toEqual(1);
        expect(containerQuery.props().query).toEqual({
          'container-lg-down': { maxWidth: 1799.8 },
          'container-lg-only': { minWidth: 1200, maxWidth: 1799.8 },
          'container-lg-up': { minWidth: 1200 },
          'container-md-down': { maxWidth: 1199.8 },
          'container-md-only': { minWidth: 900, maxWidth: 1199.8 },
          'container-md-up': { minWidth: 900 },
          'container-sm-down': { maxWidth: 899.8 },
          'container-sm-only': { minWidth: 600, maxWidth: 899.8 },
          'container-sm-up': { minWidth: 600 },
          'container-xl-down': {},
          'container-xl-only': { minWidth: 1800 },
          'container-xl-up': { minWidth: 1800 },
          'container-xs-down': { maxWidth: 599.8 },
          'container-xs-only': { maxWidth: 599.8 },
          'container-xs-up': {},
        });
      });

      describe('when `ContainerQuery` indicates medium breakpoint', () => {
        it('`Container` provides correct context', () => {
          const wrapper = shallow(
            <Container>
              <TestComponentWithContext />
            </Container>
          );

          const testChildrenAsFunction = wrapper.props().children;

          const testComponentWithContextWrapper = mount(
            testChildrenAsFunction({
              'container-lg-down': true,
              'container-lg-only': false,
              'container-lg-up': false,
              'container-md-down': true,
              'container-md-only': true,
              'container-md-up': true,
              'container-sm-down': false,
              'container-sm-only': false,
              'container-sm-up': true,
              'container-xl-down': true,
              'container-xl-only': false,
              'container-xl-up': false,
              'container-xs-down': false,
              'container-xs-only': false,
              'container-xs-up': true,
            })
          );

          const testComponent = testComponentWithContextWrapper.find(
            TestComponent
          );

          expect(testComponent.props().testcontext).toEqual([
            'container-lg-down',
            'container-md-down',
            'container-md-only',
            'container-md-up',
            'container-sm-up',
            'container-xl-down',
            'container-xs-up',
          ]);
        });

        describe('when `ContainerQuery` indicates extra small breakpoint', () => {
          it('`Container` provides correct context', () => {
            const wrapper = shallow(
              <Container>
                <TestComponentWithContext />
              </Container>
            );

            const testChildrenAsFunction = wrapper.props().children;

            const testComponentWithContextWrapper = mount(
              testChildrenAsFunction({
                'container-lg-down': true,
                'container-lg-only': false,
                'container-lg-up': false,
                'container-md-down': true,
                'container-md-only': false,
                'container-md-up': false,
                'container-sm-down': true,
                'container-sm-only': false,
                'container-sm-up': false,
                'container-xl-down': true,
                'container-xl-only': false,
                'container-xl-up': false,
                'container-xs-down': true,
                'container-xs-only': true,
                'container-xs-up': true,
              })
            );

            const testComponent = testComponentWithContextWrapper.find(
              TestComponent
            );

            expect(testComponent.props().testcontext).toEqual([
              'container-lg-down',
              'container-md-down',
              'container-sm-down',
              'container-xl-down',
              'container-xs-down',
              'container-xs-only',
              'container-xs-up',
            ]);
          });
        });

        describe('when `ContainerQuery` indicates extra large breakpoint', () => {
          it('`Container` provides correct context', () => {
            const wrapper = shallow(
              <Container>
                <TestComponentWithContext />
              </Container>
            );

            const testChildrenAsFunction = wrapper.props().children;

            const testComponentWithContextWrapper = mount(
              testChildrenAsFunction({
                'container-lg-down': false,
                'container-lg-only': false,
                'container-lg-up': true,
                'container-md-down': false,
                'container-md-only': false,
                'container-md-up': true,
                'container-sm-down': false,
                'container-sm-only': false,
                'container-sm-up': true,
                'container-xl-down': true,
                'container-xl-only': true,
                'container-xl-up': true,
                'container-xs-down': false,
                'container-xs-only': false,
                'container-xs-up': true,
              })
            );

            const testComponent = testComponentWithContextWrapper.find(
              TestComponent
            );

            expect(testComponent.props().testcontext).toEqual([
              'container-lg-up',
              'container-md-up',
              'container-sm-up',
              'container-xl-down',
              'container-xl-only',
              'container-xl-up',
              'container-xs-up',
            ]);
          });
        });
      });
    });

    describe('with `props.customBreakpoints`', () => {
      it('passes default query to ContainerQuery', () => {
        const wrapper = mount(
          <Container
            customBreakpoints={[
              { name: 'foo', minWidth: 0 },
              { name: 'bar', minWidth: 512 },
            ]}
          >
            <TestComponent />
          </Container>
        );

        const containerQuery = wrapper.find(ContainerQuery);
        expect(containerQuery.length).toEqual(1);
        expect(containerQuery.props().query).toEqual({
          'container-foo-down': { maxWidth: 511.8 },
          'container-foo-only': { maxWidth: 511.8 },
          'container-foo-up': {},
          'container-bar-down': {},
          'container-bar-only': { minWidth: 512 },
          'container-bar-up': { minWidth: 512 },
        });
      });

      describe('when `ContainerQuery` indicates foo breakpoint', () => {
        it('`Container` provides correct context', () => {
          const wrapper = shallow(
            <Container>
              <TestComponentWithContext />
            </Container>
          );

          const testChildrenAsFunction = wrapper.props().children;

          const testComponentWithContextWrapper = mount(
            testChildrenAsFunction({
              'container-foo-down': true,
              'container-foo-only': true,
              'container-foo-up': true,
              'container-bar-down': true,
              'container-bar-only': false,
              'container-bar-up': false,
            })
          );

          const testComponent = testComponentWithContextWrapper.find(
            TestComponent
          );

          expect(testComponent.props().testcontext).toEqual([
            'container-foo-down',
            'container-foo-only',
            'container-foo-up',
            'container-bar-down',
          ]);
        });
      });
    });
  });
});
