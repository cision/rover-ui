import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import ResponsiveReadme from './README.md';
import ResponsiveContainerReadme from './Container/README.md';
import ResponsiveElementReadme from './Element/README.md';
import Responsive from './';

const MyComponent = ({ responsiveContext }) => (
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

MyComponent.propTypes = {
  responsiveContext: PropTypes.arrayOf(PropTypes.string),
};

MyComponent.defaultProps = {
  responsiveContext: [],
};

storiesOf('Dark Matter/Responsive', module).add(
  'Examples',
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
    readme: {
      sidebar: ResponsiveReadme,
    },
  }
);

storiesOf('Dark Matter/Responsive/Moons/Container', module).add(
  'Overview',
  () => (
    <Responsive.Container
      customBreakpoints={object(
        'customBreakpoints',
        Responsive.Container.defaultProps.customBreakpoints
      )}
    />
  ),
  {
    info: {
      inline: true,
      source: true,
      text: `
        Use \`<Responsive.Container />\` to wrap a section of the DOM.

        It will measure its width (and watch for changes), and compare it against
        its configured breakpoints.

        It will then provide a list of strings indicating which breakpoints
        it matches to any descendant components via the React Context API as
        \`responsiveContext\`.
      `,
    },
    readme: {
      sidebar: ResponsiveContainerReadme,
    },
  }
);

storiesOf('Dark Matter/Responsive/Moons/Element', module).add(
  'Overview',
  () => <Responsive.Element />,
  {
    info: {
      inline: true,
      source: true,
      text: `
        Use \`<Responsive.Element />\` to wrap any component.
        That component should now have access to the \`responsiveContext\`
        of its closest parent \`<Responsive.Container>\`.
      `,
    },
    readme: {
      sidebar: ResponsiveElementReadme,
    },
  }
);
