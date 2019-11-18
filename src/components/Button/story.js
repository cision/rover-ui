import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button, { levels, sizes } from './';
import ButtonReadme from './README.md';
import AddonReadme from './Addon/README.md';

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
        active={boolean('active', false)}
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
  )
  .add(
    'Examples',
    () => {
      const sections = levels.map(level => {
        return (
          <div>
            <h2>{level}</h2>
            {sizes.map(size => {
              return (
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ marginRight: '20px' }}>{size}</span>
                  <span style={{ marginRight: '20px' }}>
                    <Button level={level} onClick={() => {}} size={size}>
                      Normal
                    </Button>
                  </span>
                  <span style={{ marginRight: '20px' }}>
                    <Button level={level} onClick={() => {}} size={size}>
                      <Button.Addon>
                        <span role="img" aria-label="Rocket">
                          🚀
                        </span>
                      </Button.Addon>
                      With addon
                    </Button>
                  </span>
                  <span style={{ marginRight: '20px' }}>
                    <Button active level={level} onClick={() => {}} size={size}>
                      Hover
                    </Button>
                  </span>
                  <span style={{ marginRight: '20px' }}>
                    <Button
                      disabled
                      level={level}
                      onClick={() => {}}
                      size={size}
                    >
                      Disabled
                    </Button>
                  </span>
                </div>
              );
            })}
          </div>
        );
      });

      return (
        <div>
          {sections}
          <div style={{ background: 'black', color: 'white', padding: '1em' }}>
            <h2>darkMode</h2>
            {sizes.map(size => {
              return (
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ marginRight: '20px' }}>{size}</span>
                  <span style={{ marginRight: '20px' }}>
                    <Button darkMode onClick={() => {}} size={size}>
                      Normal
                    </Button>
                  </span>
                  <span style={{ marginRight: '20px' }}>
                    <Button darkMode onClick={() => {}} size={size}>
                      <Button.Addon>
                        <span role="img" aria-label="Rocket">
                          🚀
                        </span>
                      </Button.Addon>
                      With addon
                    </Button>
                  </span>
                  <span style={{ marginRight: '20px' }}>
                    <Button active darkMode onClick={() => {}} size={size}>
                      Hover
                    </Button>
                  </span>
                  <span style={{ marginRight: '20px' }}>
                    <Button darkMode disabled onClick={() => {}} size={size}>
                      Disabled
                    </Button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
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
