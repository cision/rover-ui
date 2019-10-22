import React from 'react';
import { withTheme } from 'styled-components';
import defaultTheme from '../../shared/theme';

const withDefaultTheme = WrappedComponent => {
  const ThemedComponent = withTheme(WrappedComponent);

  const Themed = props => (
    <ThemedComponent {...props} theme={{ ...defaultTheme }} />
  );

  Themed.displayName = `Themed(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return Themed;
};

export default withDefaultTheme;
