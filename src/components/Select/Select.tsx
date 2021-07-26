import React, {
  Children,
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  MutableRefObject,
  RefAttributes,
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
import useMenuArrowKeys from './useMenuArrowKeys';
import useSuppressFocusEvents from './useSuppressFocusEvents';

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

const getItemSelectionValue = (item: MenuItem) =>
  typeof item.value === 'string' ? item.value : item.label;

const getDoesItemMatchValue = ({ item, value }) =>
  value === getItemSelectionValue(item);

const makeMenuItemConfigFromChild =
  ({ handleSelectOption, value }) =>
  (item: OptionishProps) => {
    const itemSelectionValue = getItemSelectionValue(item);

    return {
      ...item,
      onSelect: undefined,
      'aria-selected': getDoesItemMatchValue({ item, value }),
      forwardedRef: React.createRef<HTMLButtonElement>(),
      role: 'option',
      value: itemSelectionValue,
      onClick: () => handleSelectOption(itemSelectionValue),
    };
  };

export interface SelectProps
  extends Omit<EasyDropdownProps, 'onChange' | 'placeholder'> {
  autoFocus?: boolean;
  className?: string;
  children?: OptionishElement | OptionishElement[];
  defaultValue?: string;
  disabled?: boolean;
  fauxDisabled?: boolean;
  id?: string;
  nativeSelectRef?: React.Ref<HTMLSelectElement>;
  onChange?: (arg0: HTMLSelectElement) => void;
  placeholder?: ReactNode;
  position?: 'top' | 'bottom';
  required?: boolean;
  toggleRef?: React.Ref<HTMLButtonElement>;
}

type WithRefType = ForwardRefExoticComponent<
  SelectProps & RefAttributes<HTMLButtonElement>
>;

interface SelectComponentType extends FC<SelectProps> {
  WithRef: WithRefType;
}

const Select: SelectComponentType = ({
  autoFocus = false,
  children = undefined,
  className = '',
  defaultValue,
  disabled = false,
  fauxDisabled = false,
  id: unsafeId = '',
  menuProps,
  nativeSelectRef: forwardedNativeSelectRef,
  onBlur,
  onChange,
  onFocus,
  placeholder = 'Choose something',
  position = 'bottom',
  required = false,
  toggleRef: forwardedToggleRef,
  ...props
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const transitioning = useRef(false);

  const nativeSelectRef = useRef<HTMLSelectElement>(
    null
  ) as MutableRefObject<HTMLSelectElement>;

  const toggleRef = useRef<HTMLButtonElement>(
    null
  ) as MutableRefObject<HTMLButtonElement>;

  useImperativeHandle(forwardedNativeSelectRef, () => nativeSelectRef.current);
  useImperativeHandle(forwardedToggleRef, () => toggleRef.current);

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  const { setIsFocusing, shouldSuppress: shouldSuppressFocusEvents } =
    useSuppressFocusEvents();

  const handleBlur = useCallback(
    (e) => {
      if (!onBlur) return;
      if (shouldSuppressFocusEvents(e)) return;

      onBlur(e);
    },
    [onBlur, shouldSuppressFocusEvents]
  );

  const handleFocus = useCallback(
    (e) => {
      if (!onFocus) return;
      if (shouldSuppressFocusEvents(e)) return;

      onFocus(e);
    },
    [onFocus, shouldSuppressFocusEvents]
  );

  const handleSelectOption = useCallback(
    (nextValue) => {
      if (!nativeSelectRef.current) return;

      setValue(nextValue);
      setIsFocusing(true);
      toggleRef.current?.focus();
      setIsFocusing(false);
    },
    [nativeSelectRef, setIsFocusing, toggleRef]
  );

  useEffect(() => {
    if (!nativeSelectRef.current) return;
    const nativeChangeEvent = new Event('change', { bubbles: true });
    nativeSelectRef.current.value = value;
    setIsInvalid(!nativeSelectRef.current.validity.valid);
    nativeSelectRef.current.dispatchEvent(nativeChangeEvent);

    if (onChange) {
      onChange(nativeSelectRef.current);
    }
  }, [onChange, nativeSelectRef, value]);

  const id = useMemo(() => unsafeId || nanoid(), [unsafeId]);

  const menuItemsWithoutPlaceholder: MenuItem[] = useMemo(
    () =>
      Children.map(children || [], parseOptionProps)
        .filter(Boolean)
        .map(
          makeMenuItemConfigFromChild({
            handleSelectOption,
            value,
          })
        ),
    [children, handleSelectOption, value]
  );

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
      ...menuItemsWithoutPlaceholder,
    ],
    [handleSelectOption, menuItemsWithoutPlaceholder, placeholder, value]
  );

  const handleToggleOpen = useCallback(
    (_: Event, nextIsOpen?: boolean) => {
      setIsOpen(nextIsOpen || false);

      if (!nextIsOpen) {
        setIsFocusing(true);
        // transitioning.current = true;
        toggleRef?.current?.focus();
        setIsFocusing(false);
        // transitioning.current = false;
        return;
      }

      const firstSelected = menuItems.find((item) =>
        getDoesItemMatchValue({ item, value })
      );

      // transitioning.current = true;
      setIsFocusing(true);

      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: Swear forwardedRef.current is a button here.
        firstSelected?.forwardedRef?.current?.focus();
        // transitioning.current = false;
        setIsFocusing(false);
      }, 200);
    },
    [menuItems, setIsFocusing, toggleRef, value]
  );

  const handleKeyDown = useMenuArrowKeys(menuItems);

  const selectedItem = useMemo(
    () => menuItems.find((item) => getDoesItemMatchValue({ item, value })),
    [menuItems, value]
  );

  const selectionDescriptor =
    selectedItem?.children || selectedItem?.value || placeholder;

  return (
    <Fragment>
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
          className={styles.toggle}
          id={id}
          isDisabled={disabled || fauxDisabled}
          isInvalid={isInvalid}
          isOpen={isOpen}
          isPlaceholder={!selectedItem || selectedItem.value === ''}
          label={selectionDescriptor}
          ref={toggleRef}
        />
      </EasyDropdown>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <select aria-hidden hidden required={required} ref={nativeSelectRef}>
        {menuItems.map((item) => (
          <option key={getItemSelectionValue(item)} value={item.value}>
            {item.children}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

const WithRef: WithRefType = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => <Select {...props} toggleRef={ref} />
);

Select.WithRef = WithRef;

export default Select;
