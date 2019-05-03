import React from 'react';
import { withTheme } from 'styled-components';
import defaultTheme from '../../shared/theme';

const withDefaultTheme = WrappedComponent => {
  class Themed extends React.Component {
    static displayName = `Themed(${WrappedComponent.displayName})`;
    render() {
      const C = withTheme(WrappedComponent);
      return <C theme={{ ...defaultTheme }} {...this.props} />;
    }
  }

  return Themed;
};

export default withDefaultTheme;
