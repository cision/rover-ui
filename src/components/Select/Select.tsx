import React, {
  Children,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { FC, ReactElement, ReactNode } from 'react';

import classNames from 'classnames';
import { nanoid } from 'nanoid';

import EasyDropdown from '../EasyDropdown';
import type { EasyDropdownProps, MenuItem } from '../EasyDropdown/EasyDropdown';
import styles from './Select.module.css';
import type { OptionProps } from './Option';
import Toggle from './Toggle';

type OptionishElement = ReactElement<OptionProps>;

interface OptionishProps extends OptionProps {
  label: string;
}

const parseOptionProps = ({
  props: { children, value, ...passedProps } = {},
}: ReactElement) =>
  !value && !children
    ? null
    : {
        ...passedProps,
        children,
        label: (typeof children === 'string' && children) || value,
        value,
      };

const makeMenuItemConfigFromChild = ({ handleSelectOption, value }) => (
  item: OptionishProps
) => ({
  ...item,
  onSelect: undefined,
  'aria-selected': value === item.value || value === item.label,
  forwardedRef: React.createRef<HTMLButtonElement>(),
  role: 'option',
  value: item.value === 'string' ? item.value : item.label,
  onClick: () =>
    handleSelectOption(item.value === 'string' ? item.value : item.label),
});

const keysToWatch = ['ArrowUp', 'ArrowDown'];

export interface SelectProps
  extends Omit<EasyDropdownProps, 'onChange' | 'placeholder'> {
  autoFocus?: boolean;
  className?: string;
  children?: OptionishElement | OptionishElement[];
  defaultValue?: string;
  disabled?: boolean;
  fauxDisabled?: boolean;
  forwardedRef?: React.Ref<HTMLButtonElement>;
  id?: string;
  onChange?: (arg0: string) => void;
  placeholder?: ReactNode;
  position?: 'top' | 'bottom';
}

const Select: FC<SelectProps> = ({
  autoFocus = false,
  children = undefined,
  className = '',
  defaultValue,
  disabled = false,
  fauxDisabled = false,
  forwardedRef: forwardedToggleRef,
  id: unsafeId = '',
  menuProps,
  onBlur,
  onChange,
  onFocus,
  placeholder = 'Choose something',
  position = 'bottom',
  ...props
}) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const transitioning = useRef(false);

  const toggleRef = useRef<HTMLButtonElement>(null) as MutableRefObject<
    HTMLButtonElement
  >;

  useImperativeHandle(forwardedToggleRef, () => toggleRef.current);

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  const handleBlur = useCallback(
    (e) => {
      if (!onBlur) return;
      if (transitioning.current) return;
      if (e.currentTarget.contains(e.relatedTarget)) return;

      onBlur(e);
    },
    [onBlur]
  );

  const handleFocus = useCallback(
    (e) => {
      if (!onFocus) return;
      if (transitioning.current) return;
      if (e.currentTarget.contains(e.relatedTarget)) return;

      onFocus(e);
    },
    [onFocus]
  );

  const handleSelectOption = useCallback(
    (nextValue) => {
      setValue(nextValue);
      transitioning.current = true;
      toggleRef?.current?.focus();
      transitioning.current = false;

      if (onChange) {
        onChange(nextValue);
      }
    },
    [onChange]
  );

  const id = useMemo(() => unsafeId || nanoid(), [unsafeId]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        'aria-selected': value === '',
        className: styles.placeholder,
        forwardedRef: React.createRef<HTMLButtonElement>(),
        children: placeholder,
        label:
          typeof placeholder === 'string' ? placeholder : 'Choose something',
        role: 'option',
        value: '',
        onClick: () => handleSelectOption(''),
      },
      ...Children.map(children || [], parseOptionProps)
        .filter(Boolean)
        .map(
          makeMenuItemConfigFromChild({
            handleSelectOption,
            value,
          })
        ),
    ],
    [children, handleSelectOption, placeholder, value]
  );

  const handleToggleOpen = useCallback(
    (_: Event, nextIsOpen?: boolean) => {
      setIsOpen(nextIsOpen || false);

      if (!nextIsOpen) {
        transitioning.current = true;
        toggleRef?.current?.focus();
        transitioning.current = false;
        return;
      }

      const firstSelected = menuItems.find(
        (i) => value === i.value || value === i.label
      );

      transitioning.current = true;

      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: Swear forwardedRef.current is a button here.
        firstSelected?.forwardedRef?.current?.focus();
        transitioning.current = false;
      }, 200);
    },
    [menuItems, value]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const { key } = e;
      if (keysToWatch.indexOf(key) < 0) return;
      if (!toggleRef?.current?.parentElement) return;

      const isToggleFocused = toggleRef.current === document.activeElement;

      const isItemFocused =
        !isToggleFocused &&
        toggleRef.current.parentElement.contains(document.activeElement);

      if (isItemFocused) {
        if (key === 'ArrowUp') {
          const currentSelection: MenuItem | undefined = menuItems.find(
            (item) =>
              (item.forwardedRef?.current as HTMLElement) ===
              document.activeElement
          );

          const enabledItems = menuItems.filter((item) => !item.disabled);

          if (currentSelection && enabledItems.indexOf(currentSelection) > 0) {
            const nextSelection =
              enabledItems[enabledItems.indexOf(currentSelection) - 1];

            nextSelection.forwardedRef?.current?.focus();
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    },
    [menuItems]
  );

  const selectedItem = useMemo(
    () => menuItems.find((i) => value === (i.value || i.label)),
    [menuItems, value]
  );

  const selectionDescriptor =
    selectedItem?.children || selectedItem?.value || placeholder;

  return (
    <EasyDropdown
      {...props}
      className={classNames(styles.Select, className)}
      defaultIsOpen={false}
      menuItems={menuItems}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onToggle={handleToggleOpen}
      menuProps={{
        role: 'listbox',
        className: styles.menu,
        position: position === 'top' ? 'topRight' : 'bottomRight',
        ...menuProps,
      }}
    >
      <Toggle
        autoFocus={autoFocus}
        id={id}
        isDisabled={disabled || fauxDisabled}
        isOpen={isOpen}
        isPlaceholder={!selectedItem || selectedItem.value === ''}
        label={selectionDescriptor}
        ref={toggleRef}
      />
    </EasyDropdown>
  );
};

export const WithRef = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => <Select {...props} forwardedRef={ref} />
);

export default Select;
