import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Media.module.css';

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
    return <div {...rest} className={classNames(cssClass, className)} />;
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
Media.Body = MediaGenerator('Media.Body', styles.Body);
Media.Item = MediaGenerator('Media.Item', styles.Item);

export default Media;
