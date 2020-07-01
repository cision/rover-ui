import React, { ReactElement } from 'react';
import Context from '../Context';

const Element: React.FC = ({ children, ...passedProps }) => (
  <Context.Consumer>
    {(context) => {
      return React.Children.map(children, (child) =>
        React.cloneElement(child as ReactElement, {
          ...passedProps,
          responsiveContext: context,
        })
      );
    }}
  </Context.Consumer>
);

export default Element;
