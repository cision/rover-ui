import React from 'react';
import { mount, shallow } from 'enzyme';
import Grid from './';

import { TestComponent } from '../../setupTests';

describe('<Grid />', () => {
  it('renders', () => {
    shallow(<Grid />);
  });

  describe('with theme-based `gutter` prop', () => {
    it('renders', () => {
      mount(<Grid gutter="md" />);
    });
  });

  describe('with css units in `gutter` prop', () => {
    it('renders', () => {
      mount(<Grid gutter="42%" />);
    });
  });

  describe('with number in `gutter` prop', () => {
    it('renders', () => {
      mount(<Grid gutter={42} />);
    });
  });

  describe('with unitless number string in `gutter` prop', () => {
    it('renders', () => {
      mount(<Grid gutter="42" />);
    });
  });

  describe('with garbage string in `gutter` prop', () => {
    it('renders', () => {
      mount(<Grid gutter="garbage-string" />);
    });
  });

  describe('with html element child', () => {
    it('renders', () => {
      mount(
        <Grid>
          <TestComponent>Boom</TestComponent>
        </Grid>
      );
    });
  });

  describe('with React component child', () => {
    describe('`columns` prop', () => {
      it('renders', () => {
        mount(
          <Grid columns={2}>
            <TestComponent>Boom</TestComponent>
          </Grid>
        );
      });

      describe('of zero', () => {
        it('renders', () => {
          mount(
            <Grid columns={0}>
              <TestComponent>Boom</TestComponent>
            </Grid>
          );
        });
      });
    });
  });
});
