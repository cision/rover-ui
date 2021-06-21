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
  onChange,
  placeholder = 'Choose something',
  position = 'bottom',
  ...props
}) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null) as MutableRefObject<
    HTMLButtonElement
  >;

  useImperativeHandle(forwardedToggleRef, () => toggleRef.current);

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectOption = useCallback(
    (nextValue) => {
      setValue(nextValue);
      toggleRef?.current?.focus();

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
        .map(makeMenuItemConfigFromChild({ handleSelectOption, value })),
    ],
    [children, handleSelectOption, placeholder, value]
  );

  const handleToggleOpen = useCallback(
    (_: Event, nextIsOpen?: boolean) => {
      setIsOpen(nextIsOpen || false);

      if (!nextIsOpen) {
        toggleRef?.current?.focus();
        return;
      }

      const firstSelected = menuItems.find(
        (i) => value === i.value || value === i.label
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: Swear forwardedRef.current is a button here.
      setTimeout(() => firstSelected?.forwardedRef?.current?.focus(), 200);
    },
    [menuItems, value]
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
      onToggle={handleToggleOpen}
      menuProps={{
        role: 'listbox',
        className: styles.menu,
        position: position === 'top' ? 'topRight' : 'bottomRight',
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
