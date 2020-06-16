import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, object } from '@storybook/addon-knobs';

import Icon from '../../Icon';
import Header from '.';
import Readme from './README.md';

import { Wrap, Title } from '../../../stories/storybook-helpers';
import Badge from '../../Badge';

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
      const expanded = boolean('expanded', false);
      const customClassnames = text(
        'className',
        'mb-5 py-3 px-4 border-b bg-gray-300'
      );

      return (
        <>
          <Wrap>
            <Title>Simple</Title>
            <Header expanded={expanded}>Header</Header>
          </Wrap>

          <Wrap>
            <Title>Custom Expand icon</Title>
            <Header expanded={expanded} expandIcon={<Icon name="chevron-up" />}>
              Header
            </Header>
            <Header expanded={expanded} expandIcon={<Icon name="ellipsis-v" />}>
              Header
            </Header>
          </Wrap>

          <Wrap>
            <Title>Custom styling</Title>
            <Header
              expanded={expanded}
              expandIcon={<Icon name="chevron-down" />}
              className={customClassnames}
            >
              Header
            </Header>
          </Wrap>

          <Wrap>
            <Title>Children as function for further customization</Title>
            <Header
              expanded={expanded}
              expandIcon={<Icon name="chevron-down" />}
              className={customClassnames}
            >
              {(expandIcon) => (
                <>
                  <span>
                    Header{' '}
                    <Badge className="ml-3" variant="success">
                      Hey there
                    </Badge>
                  </span>
                  {expandIcon}
                </>
              )}
            </Header>
          </Wrap>
        </>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
