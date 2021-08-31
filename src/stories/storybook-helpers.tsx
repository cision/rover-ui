import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type HelperTags = keyof Pick<
  JSX.IntrinsicElements,
  'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;
type HelperProps = React.HTMLAttributes<HTMLElement>;
type Helper = React.FC<HelperProps>;

export const BuildHelper = (
  name: string,
  classes: string,
  Tag: HelperTags = 'div'
): Helper => {
  const HelperComp: Helper = ({ className = '', ...props }) => {
    return <Tag className={classNames(className, classes)} {...props} />;
  };

  HelperComp.displayName = name;
  return HelperComp;
};

export const Tailwind = () => {
  const ID = 'tailwind-link';
  const cleanup = () => {};

  useEffect(() => {
    const $link = document.getElementById(ID);

    if ($link) {
      // Moves external TailwindCSS to end of <head>
      document.head.appendChild($link);
      return cleanup;
    }

    const $style = document.createElement('link');
    $style.id = 'tailwind-link';
    $style.href = 'https://unpkg.com/tailwindcss@1.4.6/dist/tailwind.min.css';
    $style.rel = 'stylesheet';

    document.head.appendChild($style);

    return cleanup;
  }, []);

  return null;
};

export const Label = BuildHelper('Label', 'text-xs', 'span');
export const Wrap = BuildHelper('Wrap', 'm-5 rounded bg-white shadow-md p-4');
export const WrapClear = BuildHelper('WrapClear', 'm-5');
export const Spacer = BuildHelper('Spacer', 'mb-5');
export const Title = BuildHelper('Title', 'text-xl mb-5 border-b', 'h3');

type InputValue = string | string[] | number | undefined;

interface InteractiveInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: InputValue;
  fauxDisabled?: boolean;
  InputRenderer: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

export const InteractiveInput: React.FC<InteractiveInputProps> = ({
  InputRenderer,
  onChange = () => {},
  checked: defaultChecked = undefined,
  defaultValue,
  ...passedProps
}) => {
  const [value, setValue] = useState<InputValue>(defaultValue);
  const [checked, setChecked] = useState<boolean | undefined>(defaultChecked);

  return (
    <InputRenderer
      {...passedProps}
      checked={checked !== undefined ? checked : undefined}
      onChange={(e) => {
        setValue(e.target.value);
        setChecked(e.target.checked);
        onChange(e);
      }}
      value={value !== undefined ? value : undefined}
    />
  );
};
