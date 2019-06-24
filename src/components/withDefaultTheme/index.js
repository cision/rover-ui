import React from 'react';
import { withTheme } from 'styled-components';
import defaultTheme from '../../shared/theme';

const withDefaultTheme = WrappedComponent => {
  const Themed = props =>
    React.createElement(withTheme(WrappedComponent), {
      ...props,
      theme: { ...defaultTheme },
    });

  Themed.displayName = `Themed(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return Themed;
};

export default withDefaultTheme;
