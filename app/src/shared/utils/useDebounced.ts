import { useEffect, useRef, useState } from 'react';

export function useDebounced<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [value]);

  return debouncedValue;
}
