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
const mediaFactory = (name, cssClass) => {
  const MediaComponent = props => {
    const newprops = {
      ...props,
      className: classNames(cssClass, props.className),
    };
    return <FlexSpacer {...newprops} />;
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

const Media = mediaFactory('Media', styles.Media);
const Body = mediaFactory('Media.Body', styles.Body);
const Item = mediaFactory('Media.Item', styles.Item);

Media.Body = Body;
Media.Item = Item;

export default Media;
