import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './';

const levels = ['tertiary', 'teal', 'secondary', 'primary'];
const sizes = ['sm', 'md', 'lg'];

const MyComponent = props => (
  <button {...props} className={classNames(props.className, 'MyComponent')} />
);

MyComponent.propTypes = { className: PropTypes.string };
MyComponent.defaultProps = { className: '' };

const tags = ['a', 'button', '<MyComponent />'];

storiesOf('Planets/Button', module).add(
  'Overview',
  () => (
    <Button
      className={text('className', '')}
      darkMode={boolean('darkMode', false)}
      disabled={boolean('disabled', false)}
      href={select('tag', tags, 'button') === 'a' ? '#' : null}
      level={select('level', levels, 'secondary')}
      onClick={action('clicked')}
      size={select('size', sizes, 'lg')}
      tag={
        select('tag', tags, 'button') === '&lt;MyComponent /&gt;'
          ? MyComponent
          : select('tag', tags, 'button')
      }
    >
      {text('children', 'Click me!')}
    </Button>
  ),
  {
    info: {
      inline: true,
      source: true,
      text: `
        The \`<Button/>\` component can wrap any kind of node.

        By default, it creates a \`<button>\` tag, and it propagates down all
        the props it doesn't use for appearance.

        That means it will propagate all DOM events that react supports, like
        \`onClick\`, \`onFocus\`, etc.

        You can change the tag name (aka DOM element) to something like \`a\`
        or \`div\`. If you do, React will allow different props. It's up to
        you to not put an \`href\` on a \`button\`.
      `,
    },
  }
);

storiesOf('Planets/Button/Addon', module).add(
  'Overview',
  () => (
    <Button size={select('<Button/> size', sizes, 'lg')}>
      <Button.Addon className={text('className', '')}>
        {text('children', '😸')}
      </Button.Addon>
      Click me!
    </Button>
  ),
  {
    info: {
      inline: true,
      source: true,
      text: `
        The \`<Button.Addon/>\` component can wrap any kind of node.

        If your \`<Button/>\` includes one or more \`<Button.Addon/>\`s, then
        the \`<Button/>\` will do two additional things.

        1. \`<Button/>\` will propagate its \`size\` prop down to any
        \`<Button.Addon/>\` children.
        2. \`<Button/>\` will wrap any bare text node children in
        \`<span/>\`s.

        These 2 changes allow \`<Button/>\` to coordinate vertical alignment
        and horizontal margins between the \`<Button.Addon/>\`s and their
        siblings with CSS.
      `,
    },
  }
);
