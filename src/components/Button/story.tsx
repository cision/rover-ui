import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Wrap } from '../../stories/storybook-helpers';
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
    () => {
      const outline = boolean('outline', false);

      return (
        <Wrap style={outline ? { backgroundColor: '#00607f' } : {}}>
          <Button
            active={boolean('active', false)}
            className={text('className', '')}
            circle={boolean('circle', false)}
            disabled={boolean('disabled', false)}
            href={text('href', '') || undefined}
            level={select('level', levels, 'secondary')}
            onClick={action('Button clicked')}
            outline={outline}
            size={select('size', sizes, 'lg')}
          >
            {text('children', 'Click me!')}
          </Button>
        </Wrap>
      );
    },
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
          <Wrap>
            <h3>Sizes</h3>
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
          </Wrap>
          <Wrap>
            <h3>With a custom React component</h3>
            <Button tag={MyComponent} href="#">
              MyComponent
            </Button>
          </Wrap>
          <Wrap>
            <h3>With custom HTML tags</h3>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button href="#">a</Button>
            </span>
            <span
              style={{
                display: 'inline-block',
                marginRight: '20px',
                marginBottom: '10px',
              }}
            >
              <Button>button (default)</Button>
            </span>
          </Wrap>
          <Wrap>
            <h3>With HTML button types other than &quot;button&quot;</h3>
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
          </Wrap>
          <Wrap>
            <h3>With add-ons</h3>
            <Button>
              <Button.Addon>
                <Icon
                  fill="currentColor"
                  height="16"
                  name="check"
                  style={{ display: 'block' }}
                  width="16"
                />
              </Button.Addon>
              With left addon
            </Button>
          </Wrap>
          <Wrap>
            <h3>Circle</h3>
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
          </Wrap>
          <Wrap>
            <h3>Color variants</h3>
            {levels.map((level) => (
              <div key={level}>
                <h4>{level}</h4>
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
                  {[...states.map((state) => [state]), ['hover', 'focus']].map(
                    (stateCombo) => {
                      const key = stateCombo.join('-');

                      const trueStates = stateCombo.reduce(
                        (result, state) => ({
                          ...result,
                          [state]: true,
                        }),
                        {}
                      );

                      return (
                        <span key={key} style={{ marginRight: '20px' }}>
                          <Button level={level} {...trueStates}>
                            {key}
                          </Button>
                        </span>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </Wrap>
          <Wrap style={{ backgroundColor: '#00607f' }}>
            <h3 style={{ color: 'white' }}>
              Color variants with the `outline` prop
            </h3>
            {levels.map((level) => (
              <div key={level}>
                <h4 style={{ color: 'white' }}>{level}</h4>
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      marginRight: '20px',
                      marginBottom: '10px',
                    }}
                  >
                    <Button level={level} outline>
                      default
                    </Button>
                  </span>
                  {[...states.map((state) => [state]), ['hover', 'focus']].map(
                    (stateCombo) => {
                      const key = stateCombo.join('-');

                      const trueStates = stateCombo.reduce(
                        (result, state) => ({
                          ...result,
                          [state]: true,
                        }),
                        {}
                      );

                      return (
                        <span key={key} style={{ marginRight: '20px' }}>
                          <Button level={level} outline {...trueStates}>
                            {key}
                          </Button>
                        </span>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </Wrap>
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
      <Wrap>
        <Button size={select('<Button/> size', sizes, 'lg')}>
          <Button.Addon className={text('className', '')}>
            {text('children', '😸')}
          </Button.Addon>
          Click me!
        </Button>
      </Wrap>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
