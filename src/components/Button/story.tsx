import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Button, { levels, sizes, states } from './Button';
import ButtonReadme from './README.md';
import AddonReadme from './Addon/README.md';

const MyComponent = ({ className = '', ...props }) => (
  <button
    type="button"
    className={classNames(className, 'shadow-xl transform rotate-180')}
    {...props}
  />
);

MyComponent.propTypes = { className: PropTypes.string };
MyComponent.defaultProps = { className: '' };

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
        circle={boolean('circle', false)}
        hollow={boolean('hollow', false)}
        disabled={boolean('disabled', false)}
        href={text('href', '') || undefined}
        level={select('level', levels, 'secondary')}
        onClick={action('Button clicked')}
        size={select('size', sizes, 'lg')}
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
      return (
        <div>
          <h2>Sizes</h2>
          <div style={{ marginBottom: '20px' }}>
            {sizes.map((size) => (
              <span
                key={size}
                style={{
                  display: 'inline-block',
                  marginRight: '20px',
                  marginBottom: '10px',
                }}
              >
                <Button size={size}>
                  {size !== 'lg' ? size : `${size} (default)`}
                </Button>
              </span>
            ))}
          </div>
          <hr />
          <h2>Render with a custom component</h2>
          <div style={{ marginBottom: '20px' }}>
            <Button tag={MyComponent} href="#">
              MyComponent
            </Button>
          </div>
          <hr />
          <h2>Tags</h2>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button href="#" tag="a">
                a
              </Button>
            </span>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button tag="button" type="button">
                button (default)
              </Button>
            </span>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button tag="input" type="button" value="input type=button" />
            </span>
          </div>
          <h2>Custom type</h2>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button type="submit">type=&quot;submit&quot;</Button>
            </span>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button type="reset">type=&quot;reset&quot;</Button>
            </span>
          </div>
          <hr />
          <h2>Add-ons</h2>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button level="secondary" size="sm">
                <Button.Addon>
                  <Icon
                    fill="currentColor"
                    height="16"
                    name="check"
                    style={{ display: 'block' }}
                    width="16"
                  />
                </Button.Addon>
                Small, with left addon
              </Button>
            </span>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button level="primary" size="lg">
                Large, with 2 right addons
                <Button.Addon>
                  <Icon
                    fill="currentColor"
                    height="16"
                    name="check"
                    style={{ display: 'block' }}
                    width="16"
                  />
                </Button.Addon>
                <Button.Addon>
                  <Icon
                    fill="currentColor"
                    height="16"
                    name="check"
                    style={{ display: 'block' }}
                    width="16"
                  />
                </Button.Addon>
              </Button>
            </span>
          </div>
          <hr />
          <h2>Circle</h2>
          <div style={{ marginBottom: '20px' }}>
            {sizes.map((size) => (
              <span
                key={size}
                style={{
                  display: 'inline-block',
                  marginRight: '20px',
                  marginBottom: '10px',
                }}
              >
                <Button circle size={size}>
                  <Icon
                    fill="currentColor"
                    height="16"
                    name="check"
                    style={{ display: 'block' }}
                    width="16"
                  />
                </Button>
              </span>
            ))}
          </div>
          <hr />
          <h2>Levels</h2>
          {levels.map((level) => {
            return (
              <div key={level}>
                <h3>{level}</h3>
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      marginRight: '20px',
                      marginBottom: '10px',
                    }}
                  >
                    <Button level={level}>default</Button>
                  </span>
                  {states.map((state) => (
                    <span key={state} style={{ marginRight: '20px' }}>
                      <Button level={level} {...{ [state]: true }}>
                        {state}
                      </Button>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          <hr />
          <h2>Hollow</h2>
          <div
            style={{
              background: 'black',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button hollow>(default)</Button>
            </span>
            {states.map((state) => (
              <span key={state} style={{ marginRight: '20px' }}>
                <Button hollow {...{ [state]: true }}>
                  {state}
                </Button>
              </span>
            ))}
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
