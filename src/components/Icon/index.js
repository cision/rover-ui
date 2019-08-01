import React from 'react';
import PropTypes from 'prop-types';

import TimesCircle from './icons/TimesCircle';

export const iconsMap = {
  'times-circle': TimesCircle,
};

const Icon = ({ name, ...passedProps }) =>
  iconsMap[name] ? React.createElement(iconsMap[name], passedProps) : null;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
