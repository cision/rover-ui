import '../shared/colors.css';
import '../shared/sizing.css';
import '../shared/buttons.css';
import '../shared/variables.css';

import './rover-ui';
import './colors/colors';

/*
 * PLANETS
 * Planets are the smallest level of component in our universe.
 * Components in this category must be stateless, include only one
 * DOM element, and pass all props (including children and DOM event handlers)
 * eg: Paper, Typography, Button, simple text input
 */

import '../components/Badge/story';
import '../components/Button/story';
import '../components/Icon/story';
import '../components/Paper/story';
import '../components/Avatar/story';
import '../components/Tooltip/story';
import '../components/Input/story';
import '../components/Input/Checkbox/story';
import '../components/InputTime/story';
import '../components/Typography/story';
import '../components/Loader/story';

/*
 * STAR SYSTEMS
 * Star systems consume one or more planets, and can have state as needed
 * but should be minimal.
 * eg: Button group, dropdown toggle, checkbox group
 */

import '../components/Bar/story';
import '../components/Callout/story';
import '../components/Collapse/story';
import '../components/Dropdown/story';
import '../components/Dropdown/Menu/story';
import '../components/Dropdown/Menu/Item/story';
import '../components/ExpansionPanel/story';
import '../components/ExpansionPanel/Body/story';
import '../components/ExpansionPanel/Header/story';
import '../components/Pill/story';
import '../components/TabMenu/story';

/*
 * GALAXIES
 * Has one or more star systems, and can also include planets.
 * eg: form, calendar range picker
 */

import '../components/EasyDropdown/story';
import '../components/DeletablePill/story';
import '../components/EasyPill/story';
import '../components/SideTray/story';
import '../components/Accordion/story';
import '../components/Modal/story';

/*
 * DARK MATTER
 * These components aren't opinionated about the children's appearance,
 * just the layout.
 * eg: Responsive layout
 */

import '../components/Grid/story';
import '../components/Media/story';
import '../components/Responsive/story';
import '../components/Responsive/Grid/story';
import '../components/Responsive/Hidden/story';
import '../components/Responsive/Visible/story';

/*
 * NEW & UNCATEGORIZED
 * Move these to a section above before committing
 */
import '../components/Kite/story';
/** INJECTOR */
