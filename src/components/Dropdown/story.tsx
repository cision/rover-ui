import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Dropdown from '.';
import Readme from './README.md';
import { MenuProps } from './Menu/Menu';
import { DropdownProps } from './Dropdown';
import { Tailwind, Wrap } from '../../stories/storybook-helpers';

interface Props extends DropdownProps {
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
  };
  menuProps?: MenuProps;
}

const ExampleDropdownWrapper: React.FC<Props> = ({
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
        <Dropdown.Menu.Item>{menuProps.children || 'Menu'}</Dropdown.Menu.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ExampleDropdownWrapper.defaultProps = { buttonProps: {}, menuProps: {} };

storiesOf('Star Systems/Dropdown', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Wrap>
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
      </Wrap>
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
        <Wrap className="text-center">
          <Tailwind />
          <div className="m-5">
            <ExampleDropdownWrapper
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
            <ExampleDropdownWrapper
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
            <ExampleDropdownWrapper
              buttonProps={{
                children: "With `menuProps.style.max-height: '100px'`",
              }}
              className="inline"
              menuProps={{
                // Too lazy to type out a story example
                /* eslint-disable @typescript-eslint/no-explicit-any, react/no-array-index-key */
                children: new Array(20)
                  .fill(null)
                  .map((props: any, i: number) => (
                    <div key={i} {...props}>
                      Item {i + 1}
                    </div>
                  )),
                /* eslint-enable @typescript-eslint/no-explicit-any, react/no-array-index-key */
                style: {
                  maxHeight: '100px',
                },
              }}
            />
          </div>
          <div className="m-5">
            <ExampleDropdownWrapper
              buttonProps={{
                children: 'Disabled',
                disabled: true,
              }}
              className="inline"
              disabled
            />
          </div>
        </Wrap>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
