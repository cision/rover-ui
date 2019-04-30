import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Responsive from './';

const MyComponent = ({ responsiveContext }) => {
  return (
    <div>
      My component&apos;s `responsiveContext` prop:
      <pre style={{ whiteSpace: 'wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(responsiveContext)
          .replace(/","/g, '",\n  "')
          .replace(/\[/g, '[\n  ')
          .replace(/"\]/g, '"\n]')}
      </pre>
    </div>
  );
};

MyComponent.propTypes = {
  responsiveContext: PropTypes.arrayOf(PropTypes.string),
};

MyComponent.defaultProps = {
  responsiveContext: [],
};

storiesOf('Planets/Responsive', module).add(
  'Overview',
  () => (
    <Responsive.Container readOnly style={{ resize: 'both' }}>
      <Responsive.Element>
        <MyComponent />
      </Responsive.Element>
    </Responsive.Container>
  ),
  {
    info: {
      inline: true,
      source: true,
      text: ``,
    },
  }
);
