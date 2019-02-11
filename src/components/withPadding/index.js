import React from 'react';
import pickBy from 'lodash/pickBy';

/**
  Takes padding props and turns them into a style block. Really just enforces
  Extends the className prop of the passed component with BEM-style modifier classes.
*/
export const withPadding = (BaseComponent, customDefaultPadding) => {
  const PaddedComponent = ({
    style,
    forwardedRef,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    ...otherProps
  }) => {
    const customPadding = pickBy({
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
    });

    const defaultPadding = pickBy({
      padding: '20px',
      paddingBottom: null,
      paddingLeft: null,
      paddingRight: null,
      paddingTop: null,
      ...customDefaultPadding,
    });

    const modifiedStyle = {
      ...defaultPadding,
      ...customPadding,
      ...style,
    };

    const wrappedComponent = (
      <BaseComponent {...otherProps} style={modifiedStyle} ref={forwardedRef} />
    );

    return wrappedComponent;
  };

  PaddedComponent.displayName = `withPadding(${BaseComponent.displayName ||
    BaseComponent.name ||
    'BaseComponent'})`;

  return React.forwardRef((props, ref) => (
    <PaddedComponent {...props} forwardedRef={ref} />
  ));
};

export default withPadding;
