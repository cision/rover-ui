import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { space, flex } from 'styled-system';

import styles from './style.css';
import withDefaultTheme from '../withDefaultTheme';

const FlexSpacer = withDefaultTheme(styled.div(flex, space));

// Factory to build the components for the Media component
// Since all three are very basic and use basically the same basis
// underneath, we can construct these components programatically.
const MediaGenerator = (name, cssClass) => {
  const MediaComponent = props => {
    const { className, ...rest } = props;
    return (
      <FlexSpacer {...rest} className={classNames(cssClass, props.className)} />
    );
  };

  MediaComponent.propTypes = {
    className: PropTypes.string,
  };

  MediaComponent.defaultProps = {
    className: '',
  };

  MediaComponent.displayName = name;
  return MediaComponent;
};

const Media = MediaGenerator('Media', styles.Media);
const Body = MediaGenerator('Media.Body', styles.Body);
const Item = MediaGenerator('Media.Item', styles.Item);

Media.Body = Body;
Media.Item = Item;

export default Media;
