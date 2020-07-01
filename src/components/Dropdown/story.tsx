import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Dropdown from '.';
import Readme from './README.md';
import { MenuProps } from './Menu/Menu';
import { DropdownProps } from './Dropdown';
import { Tailwind } from '../../stories/storybook-helpers';

interface Props extends DropdownProps {
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
  };
  menuProps?: MenuProps;
}

const OpenableDropdown: React.FC<Props> = ({
  buttonProps = {},
  menuProps = {},
  ...passedProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((open) => !open);
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

OpenableDropdown.defaultProps = { buttonProps: {}, menuProps: {} };

storiesOf('Star Systems/Dropdown', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
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
      return (
        <div className="text-center">
          <Tailwind />
          <div className="m-5">
            <OpenableDropdown
              menuProps={{
                children: (
                  <>
                    <div className="mb-2">
                      Clicking Escape closes the dropdown
                    </div>
                    <div className="mb-2">
                      Clicking outside the dropdown also closes it
                    </div>
                  </>
                ),
                className: 'mt-2 p-3 rounded shadow-xl',
                style: { minWidth: '300px' },
              }}
              className="inline"
            />
          </div>
          <div className="m-5">
            <OpenableDropdown
              buttonProps={{
                children: 'Top-left positioned',
              }}
              menuProps={{
                children: 'Up here, look at me!',
                position: 'topLeft',
                className: 'p-3',
              }}
              className="inline"
            />
          </div>
          <div className="m-5">
            <OpenableDropdown
              buttonProps={{
                children: 'Disabled',
                disabled: true,
              }}
              className="inline"
              disabled
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
