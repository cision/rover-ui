import React from 'react';
import PropTypes from 'prop-types';

/* Main Icons */
import AdEquiv from './icons/AdEquiv';
import Add from './icons/Add';
import AddCircle from './icons/AddCircle';
import AddDocument from './icons/AddDocument';
import AddToGroup from './icons/AddToGroup';
import ArrowBack from './icons/ArrowBack';
import ArrowDown from './icons/ArrowDown';
import ArrowDropDown from './icons/ArrowDropDown';
import ArrowDropUp from './icons/ArrowDropUp';
import ArrowForward from './icons/ArrowForward';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import ArrowUp from './icons/ArrowUp';
import Attach from './icons/Attach';
import Bell from './icons/Bell';
import Blocked from './icons/Blocked';
import Blog from './icons/Blog';
import Bolt from './icons/Bolt';
import Bookmark from './icons/Bookmark';
import Business from './icons/Business';
import Calendar from './icons/Calendar';
import Campaign from './icons/Campaign';
import ChartArea from './icons/ChartArea';
import ChartBarsHorz from './icons/ChartBarsHorz';
import ChartBarsStacked from './icons/ChartBarsStacked';
import ChartBarsVert from './icons/ChartBarsVert';
import ChartBarsBorder from './icons/ChartBarsBorder';
import ChartBubble from './icons/ChartBubble';
import ChartDonut from './icons/ChartDonut';
import ChartPie from './icons/ChartPie';
import ChartSparkAndBar from './icons/ChartSparkAndBar';
import ChartSparkline from './icons/ChartSparkline';
import Chat from './icons/Chat';
import Check from './icons/Check';
import Chevron from './icons/Chevron';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import ChevronUp from './icons/ChevronUp';
import Clear from './icons/Clear';
import Clock from './icons/Clock';
import Close from './icons/Close';
import Coffee from './icons/Coffee';
import ContactList from './icons/ContactList';
import Copy from './icons/Copy';
import Dashboard from './icons/Dashboard';
import Delete from './icons/Delete';
import Download from './icons/Download';
import Dinner from './icons/Dinner';
import Drinks from './icons/Drinks';
import Edit from './icons/Edit';
import EllipsisV from './icons/EllipsisV';
import Enlarge from './icons/Enlarge';
import Filter from './icons/Filter';
import Flag from './icons/Flag';
import Folder from './icons/Folder';
import FolderOpen from './icons/FolderOpen';
import FormatBold from './icons/FormatBold';
import FormatBulletNumbered from './icons/FormatBulletNumbered';
import FormatBulletPlain from './icons/FormatBulletPlain';
import FormatClear from './icons/FormatClear';
import FormatCode from './icons/FormatCode';
import FormatItalic from './icons/FormatItalic';
import FormatParagraphCenter from './icons/FormatParagraphCenter';
import FormatParagraphJustify from './icons/FormatParagraphJustify';
import FormatParagraphLeft from './icons/FormatParagraphLeft';
import FormatParagraphRight from './icons/FormatParagraphRight';
import Paper from './icons/Paper';

/* Logo Icons */
import Exchange from './icons/Exchange';
import Facebook from './icons/Facebook';
import Google from './icons/Google';
import GooglePlus from './icons/GooglePlus';
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
  add: Add,
  'add-circle': AddCircle,
  'add-Paper': AddDocument,
  'add-to-group': AddToGroup,
  'arrow-back': ArrowBack,
  'arrow-down': ArrowDown,
  'arrow-drop-down': ArrowDropDown,
  'arrow-drop-up': ArrowDropUp,
  'arrow-forward': ArrowForward,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  attach: Attach,
  bell: Bell,
  blocked: Blocked,
  blog: Blog,
  bolt: Bolt,
  bookmark: Bookmark,
  business: Business,
  calendar: Calendar,
  campaign: Campaign,
  'chart-area': ChartArea,
  'chart-bars-border': ChartBarsBorder,
  'chart-bars-horz': ChartBarsHorz,
  'chart-bars-stacked': ChartBarsStacked,
  'chart-bars-vert': ChartBarsVert,
  'chart-bubble': ChartBubble,
  'chart-donut': ChartDonut,
  'chart-pie': ChartPie,
  'chart-spark-and-bar': ChartSparkAndBar,
  'chart-sparkline': ChartSparkline,
  chat: Chat,
  check: Check,
  'chevron-down': Chevron,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  clear: Clear,
  clock: Clock,
  close: Close,
  coffee: Coffee,
  'contact-list': ContactList,
  copy: Copy,
  dashbord: Dashboard,
  delete: Delete,
  dinner: Dinner,
  drinks: Drinks,
  download: Download,
  edit: Edit,
  'ellipsis-v': EllipsisV,
  enlarge: Enlarge,
  filter: Filter,
  flag: Flag,
  folder: Folder,
  'folder-open': FolderOpen,
  'format-bold': FormatBold,
  'format-bullet-numbered': FormatBulletNumbered,
  'format-bullet-plain': FormatBulletPlain,
  'format-clear': FormatClear,
  'format-code': FormatCode,
  'format-italic': FormatItalic,
  'format-paragraph-center': FormatParagraphCenter,
  'format-paragraph-justify': FormatParagraphJustify,
  'format-paragraph-left': FormatParagraphLeft,
  'format-paragraph-right': FormatParagraphRight,
  paper: Paper,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: LinkedIn,
  reddit: Reddit,
  twitch: Twitch,
  twitter: Twitter,
  youtube: YouTube,
  exchange: Exchange,
  google: Google,
  googleplus: GooglePlus,
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
