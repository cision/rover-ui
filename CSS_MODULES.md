# CSS Modules, BEM, and CSS-in-JS

In RoverUI, you'll see a (sometimes unfortunate) mixture of patterns for styling.

RoverUI uses

- CSS modules
- CSS custom properties.
- styled-system
- styled-components
- CSS-in-JS

Here's the major philosophy.

> CSS modules and CSS-in-JS don't absolve developers of organizing their styles into readable, predictably named units.

## TLDR

- Use **CSS custom properties** to define theme variables, and non-themed re-usable styles.
- Use **postcssCustomProperties** to export the theme variables for ingestion into src/shared/theme.js
- Use **styled-system** to turn the theme.js into a consistent set of props across the app for setting colors, fonts, and spacing.
- Use **styled-component** to attach specific themed props to specific components, which allowing RoverUI consumers to override themes at runtime.
- Use **CSS modules** to apply component-specific, non-themed styles.
- Use **CSS --calc()** to apply calculated style properties.
- Use **CSS-in-JS** to apply calculated style properties that require dynamic input.

Here are the major pros and cons of each.

## CSS Modules

CSS modules are a way of importing CSS rules to be implied locally, to a single component or element, without applying them in the normal, cascading, cross-cutting way.

RoverUI uses CSS modules via webpack's [css-loader](https://github.com/webpack-contrib/css-loader), and it mainly works by obfuscating CSS class names and making those class names importable into JavaScript files for use in templates.

- [Official docs](https://github.com/css-modules/css-modules)
- [Here's a primer from the folks at Invision](https://engineering.invisionapp.com/post/introduction-css-modules/)
- The real rocket fuel - [ICSS](https://github.com/css-modules/icss)

### Usage

style.css

```css
.Component {
  background: pink;
}
```

Component.js

```js
import React from 'react';
import style from './style.css';

export const Component = () => (
  <div className={style.Component}>Your text here</div>
);
```

Output

```html
<style>
  .Component--1udx5 {
    background: pink;
  }
</style>
<div class="Component--1udx5">Your text here</div>
```

### Pros

- Allow for short, readable class names.
- Avoid style conflicts.
- Guard against accidental style re-use that. With regular CSS, your new button component won't look like your old button by default. _This is good_ because it means you can refactor and kill old styles without worrying about breaking some unrelated part of your app.
- Approximately as easy to use as plain old CSS.
- Allow importing properties from CSS into JavaScript.

### Cons

- Bad at what CSS was _originally_ designed for, which is applying semantic style rules that can handle any arbitrary content you throw at them.
- Enable crappy naming conventions because you don't have to standardize and namespace them.
- Make it harder to use CSS custom properties, since those are global, or scoped with plain old class names.

## CSS custom properties

CSS custom properties are a way to define and re-use variables across CSS.

RoverUI uses them instead of Sass because they're a spec. They don't have all the niceties of Sass, but they do enough for us.

[Official docs](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

They aren't a technology for which we'll do pros and cons, but they're worth mentioning because they require special handling with CSS modules.

## Bringing it all together

This component uses a themed set of initial colors.
It has an `active` state that switches the color set.
It allows for overriding the theme at runtime.
It has some component-specific styles.
It uses CSS calc to account for its border size.
It uses dynamic JS calculation to handle a customer-controlled zoom level.

**TODO**: Write it.
