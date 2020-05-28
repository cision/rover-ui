import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { alignSelf, space, flex } from 'styled-system';

import styles from './Media.module.css';
import withDefaultTheme from '../withDefaultTheme';

const FlexSpacer = withDefaultTheme(styled.div(alignSelf, flex, space));

type MediaItemType = React.FC<React.HTMLAttributes<HTMLDivElement>>;
type MediaType = MediaItemType & {
  Body: MediaItemType;
  Item: MediaItemType;
};

// Factory to build the components for the Media component
// Since all three are very basic and use basically the same basis
// underneath, we can construct these components programatically.
const MediaGenerator = (name: string, cssClass) => {
  const MediaComponent: MediaItemType = (props) => {
    const { className = '', ...rest } = props;
    return <FlexSpacer {...rest} className={classNames(cssClass, className)} />;
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

const Media = MediaGenerator('Media', styles.Media) as MediaType;
const Body = MediaGenerator('Media.Body', styles.Body);
const Item = MediaGenerator('Media.Item', styles.Item);

Media.Body = Body;
Media.Item = Item;

export default Media;
