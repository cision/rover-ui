import React from 'react';
import PropTypes from 'prop-types';

import AdEquiv from './icons/AdEquiv';
import Chevron from './icons/Chevron';
import EllipsisV from './icons/EllipsisV';
import TimesCircle from './icons/TimesCircle';
import Trash from './icons/Trash';

/* Logo Icons */
import Exchange from './icons/Exchange';
import Facebook from './icons/Facebook';
import Google from './icons/Google';
import Instagram from './icons/Instagram';
import LinkedIn from './icons/LinkedIn';
import Outlook from './icons/Outlook';
import Pinterest from './icons/Pinterest';
import Reddit from './icons/Reddit';
import Slack from './icons/Slack';
import Twitch from './icons/Twitch';
import Twitter from './icons/Twitter';
import YouTube from './icons/YouTube';
/* Twitter Icons*/
import Retweet from './icons/Retweet';
import TwitterComment from './icons/TwitterComment';
import TwitterEmail from './icons/TwitterEmail';
import TwitterLike from './icons/TwitterLike';
import TwitterVerified from './icons/TwitterVerified';

export const iconsMap = {
  'ad-equiv': AdEquiv,
  chevron: Chevron,
  'times-circle': TimesCircle,
  trash: Trash,
  'ellipsis-v': EllipsisV,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: LinkedIn,
  reddit: Reddit,
  twitch: Twitch,
  twitter: Twitter,
  youtube: YouTube,
  exchange: Exchange,
  google: Google,
  outlook: Outlook,
  retweet: Retweet,
  slack: Slack,
  pinterest: Pinterest,
  'twitter-comment': TwitterComment,
  'twitter-email': TwitterEmail,
  'twitter-like': TwitterLike,
  'twitter-verified': TwitterVerified,
};

const Icon = ({ name, ...passedProps }) =>
  iconsMap[name] ? React.createElement(iconsMap[name], passedProps) : null;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
