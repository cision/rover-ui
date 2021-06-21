import React from 'react';
import classNames from 'classnames';

import Button from '../../../Button';

import type {
  AnchorElementProps,
  ButtonElementProps,
} from '../../../Button/Button';

import styles from './Item.module.css';

interface DivItemProps extends React.AllHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
}
interface AnchorItemProps extends AnchorElementProps {
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

interface ButtonItemProps extends ButtonElementProps {
  forwardedRef?: React.Ref<HTMLButtonElement>;
}

export type ItemProps = ButtonItemProps | AnchorItemProps | DivItemProps;

// Guard to check if href exists in props
const hasHref = (props: ItemProps): props is AnchorElementProps =>
  'href' in props && props.href !== undefined;

const Item: React.FC<ItemProps> = ({
  className = '',
  forwardedRef,
  ...passedProps
}) => {
  /**
   * If an `href` prop is passed, the rendered element automatically renders
   * as a bare <a> element with default styles
   */
  if (hasHref(passedProps) || passedProps.onClick) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <Button.WithRef
        className={classNames(styles.Item, styles.button, className, {
          [styles.disabled]: passedProps.disabled,
        })}
        level="text"
        ref={forwardedRef}
        size="md"
        {...(passedProps as ButtonElementProps)}
      />
    );
  }

  /**
   * If a no `href` or `onClick` props are passed, the rendered element simply renders
   * as a <div> element with some default styles
   */
  return (
    <Button.WithRef
      className={classNames(styles.Item, styles.content, className)}
      level="text"
      ref={forwardedRef}
      size="md"
      tag="div"
      {...(passedProps as ButtonElementProps)}
    />
  );
};

// Temporary
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default React.forwardRef<any, any>((props, ref) => (
  <Item {...props} forwardedRef={ref} />
));
