import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import colorNamesMap from './colorNamesMap';
import colorsReadme from './README.md';

const ColorSwatch = ({ colorName }) => {
  const backgroundColor = colorName ? `var(${colorName})` : '#000';

  return (
    <div
      style={{
        borderRadius: '4px',
        border: `1px solid var(${colorNamesMap['Full color palette']['--rvr-gray-40']})`,
      }}
    >
      <div
        style={{
          color: 'white',
          display: 'block',
          padding: '8px 16px',
          backgroundColor,
          borderRadius: '4px 4px 0 0',
          height: '42px',
          textShadow:
            '0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      />
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0 0 4px 4px',
          borderTop: `1px solid var(${colorNamesMap['Full color palette']['--rvr-gray-40']})`,
          padding: '8px',
        }}
      >
        <code>{colorName}</code>
      </div>
    </div>
  );
};

ColorSwatch.propTypes = {
  colorName: PropTypes.string.isRequired,
};

storiesOf('/RoverUI', module)
  .addParameters({
    readme: {
      sidebar: colorsReadme,
    },
  })
  .add(
    'Colors',
    () => (
      <div>
        {Object.entries(colorNamesMap).map(([typeKey, typeValue]) => (
          <div
            key={typeKey}
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
            }}
          >
            <h4 style={{ flex: '0 0 100%', margin: '1rem' }}>{typeKey}</h4>
            {typeValue.map(colorKey => (
              <div
                key={colorKey}
                style={{
                  display: 'block',
                  margin: '1rem',
                  flex: '0 0 140px',
                  minWidth: '0',
                }}
              >
                <ColorSwatch colorName={colorKey} />
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
    {
      info: {
        inline: true,
        source: false,
      },
    }
  );
