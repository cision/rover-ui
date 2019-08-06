import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Dropdown from './';
import Readme from './README.md';

storiesOf('Star Systems/Dropdown', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  /*
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  */
  .add(
    'Overview',
    () => (
      <Dropdown
        className={text('className', '')}
        disabled={boolean('disabled', false)}
        isOpen={boolean('isOpen', false)}
        onToggle={action('onToggle')}
      >
        {text('children', 'Dropdown children')}
      </Dropdown>
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
    () => {
      const OpenableDropdown = ({ buttonProps, menuProps, ...passedProps }) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleToggle = () => {
          setIsOpen(!isOpen);
        };

        return (
          <Dropdown {...passedProps} isOpen={isOpen} onToggle={handleToggle}>
            <button {...buttonProps} type="button" onClick={handleToggle}>
              {buttonProps.children || 'Click me'}
            </button>
            <Dropdown.Menu {...menuProps}>
              {menuProps.children || 'Menu'}
            </Dropdown.Menu>
          </Dropdown>
        );
      };

      OpenableDropdown.propTypes = {
        buttonProps: PropTypes.object,
        menuProps: PropTypes.object,
      };

      OpenableDropdown.defaultProps = { buttonProps: {}, menuProps: {} };

      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ margin: '20px' }}>
            <OpenableDropdown
              menuProps={{
                children: (
                  <div>
                    <div>Clicking Escape closes the dropdown</div>
                    <div>Clicking outside the dropdown also closes it</div>
                  </div>
                ),
                style: { minWidth: '300px' },
              }}
              style={{ display: 'inline' }}
            />
          </div>
          <div style={{ margin: '20px' }}>
            <OpenableDropdown
              buttonProps={{
                children: 'Top-left positioned',
              }}
              menuProps={{
                children: 'Up here, look at me!',
                position: 'topLeft',
                style: { padding: '10px' },
              }}
              style={{ display: 'inline' }}
            />
          </div>
          <div style={{ margin: '20px' }}>
            <OpenableDropdown
              buttonProps={{
                children: 'Disabled',
                disabled: true,
              }}
              disabled
              style={{ display: 'inline' }}
            />
          </div>
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
