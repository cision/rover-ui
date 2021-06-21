import React, { useEffect /*, useMemo */ } from 'react';

// import classNames from 'classnames';

import Dropdown from '../../Dropdown';
// import styles from './Option.module.css';

export interface OptionProps {
  children: React.ReactNode;
  // className?: string;
  disabled?: boolean;
  // onClick?: (arg0?: React.MouseEvent<HTMLButtonElement>) => void;
  // selectedValue?: string;
  value?: string;
}

export const Option: React.FC<OptionProps> = ({
  children = null,
  // className = '',
  // disabled = undefined,
  // selectedValue,
  value: customValue,
  ...props
}) => {
  useEffect(() => {
    if (typeof children !== 'string' && !customValue) {
      console.warn(
        'Option requires a `value` prop when `children` is not a string.'
      );
    }
  }, [children, customValue]);

  // const value = useMemo(
  //   () => customValue || (typeof children === 'string' && children) || '',
  //   [children, customValue]
  // );

  return (
    <Dropdown.Menu.Item
      {
        ...{} /*
        disabled={disabled}
        className={classNames(styles.Option, className, {
          [styles.disabled]: disabled,
          [styles.selected]: selectedValue === value,
        })}
        */
      }
      {...props}
    >
      {children}
    </Dropdown.Menu.Item>
  );
};

export default Option;
