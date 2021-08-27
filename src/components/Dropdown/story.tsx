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
        className={text('className', 'm-5')}
        disabled={boolean('disabled', false)}
        isOpen={boolean('isOpen', false)}
        onToggle={action('onToggle')}
      >
        {text('children', 'Dropdown children')}
        <Dropdown.Menu>
          <Dropdown.Menu.Item>
            {text('Dropdown.Menu children', 'Dropdown menu children')}
          </Dropdown.Menu.Item>
        </Dropdown.Menu>
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
                    <Dropdown.Menu.Item>
                      Clicking Escape closes the dropdown
                    </Dropdown.Menu.Item>
                    <Dropdown.Menu.Item>
                      Clicking outside the dropdown also closes it
                    </Dropdown.Menu.Item>
                  </>
                ),
                style: { minWidth: '300px' },
              }}
            />
          </div>
          <div className="m-5">
            <OpenableDropdown
              buttonProps={{
                children: 'Top-left positioned',
              }}
              menuProps={{
                children: (
                  <Dropdown.Menu.Item>Up here, look at me!</Dropdown.Menu.Item>
                ),
                position: 'topLeft',
              }}
            />
          </div>
          <div className="m-5">
            <OpenableDropdown
              buttonProps={{
                children: "With `menuProps.style.max-height: '115px'`",
              }}
              menuProps={{
                // Too lazy to type out a story example
                /* eslint-disable @typescript-eslint/no-explicit-any, react/no-array-index-key */
                children: new Array(20)
                  .fill(null)
                  .map((props: any, i: number) => (
                    <Dropdown.Menu.Item key={i} {...props}>
                      Item {i + 1}
                    </Dropdown.Menu.Item>
                  )),
                /* eslint-enable @typescript-eslint/no-explicit-any, react/no-array-index-key */
                style: {
                  maxHeight: '115px',
                },
              }}
            />
          </div>
          <div className="m-5">
            <OpenableDropdown
              buttonProps={{
                children: 'Disabled',
                disabled: true,
              }}
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
