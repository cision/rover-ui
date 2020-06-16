import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object } from '@storybook/addon-knobs';

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
            <Title>Children as render prop</Title>
            <Header
              expanded={expanded}
              expandIcon={<Icon name="chevron-down" />}
              className="mb-5 py-3 px-4 border-b bg-gray-300"
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

          <Wrap>
            <Title>Custom styling and function</Title>
            <Header
              expanded={expanded}
              expandIcon={<Icon name="chevron-down" />}
              className="mb-5 py-3 px-4 border-b bg-gray-300"
            >
              Header
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
