import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './';
import ButtonReadme from './README.md';
import AddonReadme from './Addon/README.md';

const levels = ['tertiary', 'teal', 'secondary', 'primary'];
const sizes = ['sm', 'md', 'lg'];

const MyComponent = props => (
  <button {...props} className={classNames(props.className, 'MyComponent')} />
);

MyComponent.propTypes = { className: PropTypes.string };
MyComponent.defaultProps = { className: '' };

const tags = ['a', 'button', '<MyComponent />'];

storiesOf('Planets/Button', module)
  .addParameters({
    readme: {
      sidebar: ButtonReadme,
    },
  })
  .add(
    'Overview',
    () => (
      <Button
        className={text('className', '')}
        darkMode={boolean('darkMode', false)}
        disabled={boolean('disabled', false)}
        href={select('tag', tags, 'button') === 'a' ? '#' : null}
        level={select('level', levels, 'secondary')}
        onClick={action('Button clicked')}
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
        inline: false,
        source: true,
      },
    }
  );

storiesOf('Planets/Button/Addon', module)
  .addParameters({
    readme: {
      sidebar: AddonReadme,
    },
  })
  .add(
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
        inline: false,
        source: true,
      },
    }
  );
