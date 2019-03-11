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

storiesOf('Planets/Button', module)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .addDecorator(storyFn => (
    <div
      style={
        boolean('darkMode', false)
          ? { backgroundColor: 'black', padding: '5px' }
          : { padding: '5px' }
      }
    >
      {storyFn()}
    </div>
  ))
  .add(
    'Overview',
    () => (
      <Button
        className={text('className', '')}
        darkMode={boolean('darkMode', false)}
        disabled={boolean('disabled', false)}
        level={select('level', levels, 'secondary')}
        onClick={action('clicked')}
        size={select('size', sizes, 'lg')}
        tabIndex={0}
        tag={
          select('tag', tags, 'button') === '&lt;MyComponent /&gt;'
            ? MyComponent
            : select('tag', tags, 'button')
        }
      >
        {text('children', 'Hello Button')}
      </Button>
    ),
    {
      info: {
        text: `
              Here's some custom information about my component

              ~~~js
              <Button>Click Here</Button>
              ~~~

              As you can see, it supports markdown
            `,
      },
    }
  );
