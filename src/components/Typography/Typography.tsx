import React, { useMemo } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.css';

type TagType =
  | keyof JSX.IntrinsicElements
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.FC<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ComponentClass<any>;

type Color = 'primary' | 'primary-alt' | 'black';
type Weight = 'normal' | 'bold';
type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3';

interface TypographyProps {
  align?: Align;
  children?: React.ReactNode;
  color?: Color;
  className?: string;
  tag?: TagType;
  weight?: Weight;
  size?: Size;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type TypographyType = React.FC<TypographyProps> & {
  Block: React.FC<TypographyProps>;
};
const Typography: TypographyType = ({
  align = 'inherit',
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
        styles[color],
        styles[weight],
        styles[align],
        styles[size],
        passedClassName
      ),
    [align, color, passedClassName, weight, size]
  );

  return <Tag {...props} className={className} />;
};

const TypographyBlock = (props) => <Typography Tag="div" {...props} />;

Typography.Block = TypographyBlock;
export default Typography;
