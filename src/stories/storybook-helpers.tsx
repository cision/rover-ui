import React from 'react';
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

export const Label = BuildHelper('Label', 'text-xs', 'span');
export const Wrap = BuildHelper('Wrap', 'm-5 rounded bg-white shadow-md p-4');
export const Spacer = BuildHelper('Spacer', 'mb-5');
export const Title = BuildHelper('Title', 'text-xl mb-5 border-b', 'h3');
