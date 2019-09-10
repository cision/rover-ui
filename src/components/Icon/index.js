import React from 'react';
import PropTypes from 'prop-types';

import Chevron from './icons/Chevron';
import EllipsisV from './icons/EllipsisV';
import TimesCircle from './icons/TimesCircle';
import Trash from './icons/Trash';
/* Logo Icons */
import Facebook from './icons/Facebook';
import GooglePlus from './icons/GooglePlus';
import Instagram from './icons/Instagram';
import LinkedIn from './icons/LinkedIn';
import Reddit from './icons/Reddit';
import Twitch from './icons/Twitch';
import Twitter from './icons/Twitter';
import YouTube from './icons/YouTube';

export const iconsMap = {
  chevron: Chevron,
  'times-circle': TimesCircle,
  trash: Trash,
  'ellipsis-v': EllipsisV,
  facebook: Facebook,
  googleplus: GooglePlus,
  instagram: Instagram,
  linkedin: LinkedIn,
  reddit: Reddit,
  twitch: Twitch,
  twitter: Twitter,
  youtube: YouTube,
};

const Icon = ({ name, ...passedProps }) =>
  iconsMap[name] ? React.createElement(iconsMap[name], passedProps) : null;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
