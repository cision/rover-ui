import React from 'react';
import classNames from 'classnames';

import styles from './Item.module.css';

export type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

type DivElementProps = React.AllHTMLAttributes<HTMLDivElement>;

export type ItemProps =
  | ButtonElementProps
  | AnchorElementProps
  | DivElementProps;

// Guard to check if href exists in props
const hasHref = (props: ItemProps): props is AnchorElementProps =>
  'href' in props && props.href !== undefined;

const Item: React.FC<ItemProps> = ({ className = '', ...passedProps }) => {
  /**
   * If an `href` prop is passed, the rendered element automatically renders
   * as a bare <a> element with default styles
   */
  if (hasHref(passedProps as AnchorElementProps)) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        className={classNames(styles.Item, styles.link, className)}
        {...(passedProps as AnchorElementProps)}
      />
    );
  }

  /**
   * If an `onClick` prop is passed, the rendered element automatically renders
   * as a bare <button> element with some default styles
   */
  if (!hasHref(passedProps as AnchorElementProps) && passedProps.onClick) {
    return (
      <button
        className={classNames(styles.Item, styles.button, className)}
        type="button"
        {...(passedProps as ButtonElementProps)}
      />
    );
  }

  /**
   * If a no `href` or `onClick` props are passed, the rendered element simply renders
   * as a <div> element with some default styles
   */
  return (
    <div
      className={classNames(styles.Item, styles.content, className)}
      {...(passedProps as DivElementProps)}
    />
  );
};

export default Item;
