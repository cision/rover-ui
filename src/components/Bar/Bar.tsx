import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Bar.module.css';

type BarProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
};

type BarType = React.FC<BarProps> & {
  Fill: React.FC<BarProps>;
};

const BarGenerator = (
  name: string,
  barClassname: string
): React.FC<BarProps> => {
  const GeneratedBar: React.FC<BarProps> = ({
    className = '',
    width: widthProp = undefined,
    style: styleProp = {},
    ...props
  }) => {
    let width = widthProp;

    if (widthProp) {
      width = typeof widthProp === 'number' ? `${widthProp}px` : widthProp;
    }

    const style: CSSProperties = {
      width,
      ...styleProp,
    };

    return (
      <div
        {...props}
        style={style}
        className={classNames(barClassname, className)}
      />
    );
  };

  GeneratedBar.displayName = name;

  return GeneratedBar;
};

const Fill = BarGenerator('Bar.Fill', styles.Fill);
const Bar = BarGenerator('Bar', styles.Bar) as BarType;

Bar.Fill = Fill;

export default Bar;
