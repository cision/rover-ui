import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Callout, { variants } from './Callout';

import README from './README.md';
import Icon from '../Icon';

const Div = (props) => <div style={{ marginBottom: '15px' }} {...props} />;

storiesOf('Star Systems/Callout', module)
  .addParameters({
    readme: {
      sidebar: README,
    },
  })
  .add(
    'Overview',
    () => {
      const content = text(
        'Children',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
      );

      const onClose = boolean('Closeable', true);
      const compact = boolean('Compact', false);
      const onCancel = onClose ? action('closing callout') : null;
      const borderless = boolean('Borderless', false);
      const variant = select('Variant', variants, 'info');

      if (!content) {
        return <div />;
      }

      return (
        <div style={{ marginBottom: '15px' }}>
          <Callout
            variant={variant}
            borderless={borderless}
            compact={compact}
            onCancel={onCancel}
          >
            {content || ''}
          </Callout>
        </div>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add('Examples', () => {
    return (
      <Fragment>
        <h3>Available variants</h3>
        <Div>
          <Callout variant="info">
            I am an `variant=&quot;info&quot;` Callout
          </Callout>
        </Div>
        <Div>
          <Callout variant="warning">
            I am an `variant=&quot;warning&quot;` Callout
          </Callout>
        </Div>
        <Div>
          <Callout variant="danger">
            I am an `variant=&quot;danger&quot;` Callout
          </Callout>
        </Div>
        <Div>
          <Callout variant="success">
            I am an `variant=&quot;success&quot;` Callout
          </Callout>
        </Div>
        <Div>
          <h3>Don&apos;t want borders?</h3>
          <Callout borderless>I don&apos;t have a border</Callout>
        </Div>
        <Div>
          <h3
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <span>Provide callback and show</span>
            <Icon
              style={{ marginLeft: '10px' }}
              fill="currentColor"
              name="close"
            />
          </h3>
          <Callout onCancel={action('I can be clicked')}>
            I can be closed with a `onCancel` property
          </Callout>
        </Div>
        <Div>
          <h3>Custom Icon</h3>
          <Callout
            onCancel={action('Clicked on the Google icon')}
            iconProps={{ name: 'google' }}
          >
            I&apos;ve got a Google close icon
          </Callout>
        </Div>
        <Div>
          <h3>Make &apos;em tiny!</h3>
          <Callout compact>I can be `compact`, too!</Callout>
        </Div>
        <Div>
          <Callout compact onCancel={action('Compact Callout was closed')}>
            I can be `compact` <em>and </em> cancelable
          </Callout>
        </Div>
      </Fragment>
    );
  });
