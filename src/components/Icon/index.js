import React from 'react';
import PropTypes from 'prop-types';

import EllipsisV from './icons/EllipsisV';
import TimesCircle from './icons/TimesCircle';
import Trash from './icons/Trash';

export const iconsMap = {
  'times-circle': TimesCircle,
  trash: Trash,
  'ellipsis-v': EllipsisV,
};

const Icon = ({ name, ...passedProps }) =>
  iconsMap[name] ? React.createElement(iconsMap[name], passedProps) : null;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
