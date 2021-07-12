import { useCallback, useRef } from 'react';

const useSuppressFocusEvents = () => {
  const transitioning = useRef(false);

  const setIsFocusing = useCallback((value) => {
    transitioning.current = value;
  }, []);

  const shouldSuppress = useCallback(
    (e) => transitioning.current || e.currentTarget.contains(e.relatedTarget),
    []
  );

  return { shouldSuppress, setIsFocusing };
};

export default useSuppressFocusEvents;
