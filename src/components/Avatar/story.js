import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

import Avatar from './';
import Paper from '../Paper';
import Readme from './README.md';

const badgeStyle = {
  backgroundColor: 'green',
  border: '1px solid black',
  width: '14px',
  height: '14px',
  borderRadius: '50%',
};

const positionOptions = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
];

/* eslint-disable react/prop-types */
const BadgeExample = ({ size, color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        border: '2px solid white',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
      }}
    />
  );
};

storiesOf('Planets/Avatar', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Avatar
        loading={boolean('loading', false)}
        name={text('name', 'Helter Skelter')}
        imageUrl={text('imageUrl', 'https://picsum.photos/40')}
        size={text('size', 'small')}
      />
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => (
      <div>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>Loading</h1>
          <Avatar loading />
        </Paper>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>Name, no image</h1>
          <Avatar name="Helter Skelter" />
        </Paper>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>Name and image</h1>
          <Avatar name="Helter Skelter" imageUrl="https://picsum.photos/40" />
        </Paper>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>Small, Medium, Large</h1>
          <Avatar size="small" imageUrl="https://picsum.photos/40" />
          <Avatar size="medium" imageUrl="https://picsum.photos/60" />
          <Avatar size="large" imageUrl="https://picsum.photos/100" />
        </Paper>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>Any Size</h1>
          <Avatar size={67} imageUrl="https://picsum.photos/40" />
        </Paper>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>With Addon (default)</h1>
          <Avatar name="Helter Skelter">
            <Avatar.Addon>
              <div style={badgeStyle} />
            </Avatar.Addon>
          </Avatar>
        </Paper>
        <Paper style={{ marginBottom: '10px' }}>
          <h1>With Addon (position)</h1>
          <Avatar name="Helter Skelter">
            <Avatar.Addon position="bottom-left">
              <div style={badgeStyle} />
            </Avatar.Addon>
          </Avatar>
        </Paper>
      </div>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );

storiesOf('Planets/Avatar/Moons', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Avatar
        name="Helter Skelter"
        imageUrl={text('Avatar imageUrl', 'https://picsum.photos/60')}
        size={text('Avatar size', 'medium')}
      >
        <Avatar.Addon
          offset={text('offset', '-3')}
          position={select('position', positionOptions, 'bottom-right')}
        >
          <BadgeExample size={text('badge example size', 20)} color="#00f" />
        </Avatar.Addon>
      </Avatar>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
