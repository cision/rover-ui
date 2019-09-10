import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object } from '@storybook/addon-knobs';

import Icon from '../../Icon';
import Header from './';
import Readme from './README.md';

storiesOf('Galaxies/ExpansionPanel/Header', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => <Header style={object('style', {})}>Header</Header>, {
    info: {
      inline: true,
      source: true,
    },
  })
  .add(
    'Examples',
    () => {
      const style = {
        backgroundColor: '#edf1f2',
        borderBottom: '1px solid #c3cbcf',
        padding: '10px 15px',
        marginBottom: '20px',
      };

      return (
        <div style={{ width: '250px' }}>
          <h2>Simple</h2>
          <Header expanded={boolean('expanded', false)}>Header</Header>
          <h2>Expand icon</h2>
          <Header
            expanded={boolean('expanded', false)}
            expandIcon={<Icon name="chevron" />}
          >
            Header
          </Header>
          <Header
            expanded={boolean('expanded', false)}
            expandIcon={<Icon name="ellipsis-v" />}
          >
            Header
          </Header>
          <h2>Children as render prop</h2>
          <Header
            expanded={boolean('expanded', false)}
            expandIcon={<Icon name="chevron" />}
          >
            {expandIcon => <span>{expandIcon} Header</span>}
          </Header>
          <h2>Custom styling</h2>
          <Header
            expanded={boolean('expanded', false)}
            expandIcon={<Icon name="chevron" />}
            style={style}
          >
            Header
          </Header>
        </div>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
