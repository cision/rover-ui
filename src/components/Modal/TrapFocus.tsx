import React, { useCallback, useEffect } from 'react';

const getFocusableElements = (element: HTMLElement) => {
  return element?.querySelectorAll(
    'a, button, textarea, input, input[type="radio"], input[type="checkbox"], select'
  );
};

const getFirstFocusableElement = (element: HTMLElement) => {
  const focusableElements = getFocusableElements(element);
  return focusableElements && focusableElements[0];
};

const getLastFocusableElement = (element: HTMLElement) => {
  const focusableElements = getFocusableElements(element);
  return focusableElements && focusableElements[focusableElements.length - 1];
};

const TrapFocus = ({ elementRef, isOpen = true }) => {
  console.log('Element coming in ', elementRef);
  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      const element = elementRef?.current;
      console.log('Tabbing ');
      const focusableElements = getFocusableElements(element);
      if (focusableElements) {
        const firstFocusableElement = getFirstFocusableElement(element);
        const lastFocusableElement = getLastFocusableElement(element);

        if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          console.log('Tabbing in not shiftkey ');
          (firstFocusableElement as HTMLElement)?.focus();
          return e.preventDefault();
        }

        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          console.log('Tabbing with shiftkey');
          (lastFocusableElement as HTMLElement)?.focus();
          return e.preventDefault();
        }
      }

      return null;
    },
    [elementRef]
  );

  useEffect(() => {
    console.log('Trap focus use effect');
    const keyListenerMap = new Map([['Tab', handleTabKey]]);
    const keyListener = (e: KeyboardEvent) => {
      console.log('wiring up tab');
      const listener = keyListenerMap.get(e.code);
      return listener && listener(e);
    };

    if (isOpen) {
      window.addEventListener('keydown', keyListener);
    }

    if (!isOpen) {
      window.removeEventListener('keydown', keyListener);
    }

    return () => {
      if (isOpen) window.removeEventListener('keydown', keyListener);
    };
  }, [handleTabKey, isOpen]);

  return null;
};

const AutoFocusElement = ({ element }) => {
  useEffect(() => {
    const firstElement = getFirstFocusableElement(element);
    (firstElement as HTMLElement)?.focus();
  }, [element]);
};

export { TrapFocus, AutoFocusElement };
