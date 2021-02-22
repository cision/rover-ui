import React, { useMemo } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.css';

export type Tag = React.ComponentType | React.ElementType;
export type Color = 'inherit' | 'primary' | 'primary-alt' | 'black';
export type Weight = 'inherit' | 'normal' | 'bold';
export type Size = 'inherit' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3';

interface TypographyProps {
  children?: React.ReactNode;
  color?: Color;
  className?: string;
  tag?: Tag;
  weight?: Weight;
  size?: Size;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type TypographyType = React.FC<TypographyProps> & {
  Block: React.FC<TypographyProps>;
};
const Typography: TypographyType = ({
  color = 'primary',
  className: passedClassName = '',
  size = 'md',
  tag: Tag = 'span',
  weight = 'normal',
  ...props
}) => {
  const className = useMemo(
    () =>
      classNames(
        {
          [styles[`color--${color}`]]: color,
          [styles[`weight--${weight}`]]: weight,
          [styles[`size--${size}`]]: size,
        },
        passedClassName
      ),
    [color, passedClassName, weight, size]
  );

  return <Tag {...props} className={className} />;
};

const TypographyBlock: React.FC<TypographyProps> = (props) => (
  <Typography Tag="div" {...props} />
);

Typography.Block = TypographyBlock;
export default Typography;
