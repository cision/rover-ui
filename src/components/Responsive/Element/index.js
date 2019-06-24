import React from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

const Element = ({ children, ...passedProps }) => {
  return (
    <Context.Consumer>
      {context => {
        return React.Children.map(children, child =>
          React.cloneElement(child, {
            ...passedProps,
            responsiveContext: context,
          })
        );
      }}
    </Context.Consumer>
  );
};

Element.propTypes = {
  children: PropTypes.node,
};

Element.defaultProps = {
  children: null,
};

export default Element;
