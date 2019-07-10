// import './shared/colors.css';
// import './shared/sizing.css';
// import './shared/variables.css';
// import './shared/reset.css';

/*
 * PLANETS
 * Planets are the smallest level of component in our universe.
 * Components in this category must be stateless, include only one
 * DOM element, and pass all props (including children and DOM event handlers)
 * eg: Paper, Typography, Button, simple text input
 */

/** INJECTOR */
import './components/Badge/story';
import './components/Button/story';
import './components/Paper/story';

/*
 * STAR SYSTEMS
 * Star systems consume one or more planets, and can have state as needed
 * but should be minimal.
 * eg: Button group, dropdown toggle, checkbox group
 */

import './components/Bar/story';

/*
 * GALAXIES
 * Has one or more star systems, and can also include planets.
 * eg: form, calendar range picker
 */

/*
 * DARK MATTER
 * These components aren't opinionated about the children's appearance,
 * just the layout.
 * eg: Responsive layout
 */

import './components/Grid/story';
import './components/Media/story';
import './components/Responsive/Grid/story';
import './components/Responsive/story';
