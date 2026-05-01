import { useState, useEffect } from 'react';

/**
 * useDebounce — Delays updating a value until after a specified wait period.
 * Useful for search inputs to avoid firing API calls on every keystroke.
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 400ms)
 * @returns {*} The debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchQuery, 400);
 * useEffect(() => { fetchResults(debouncedSearch); }, [debouncedSearch]);
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timer if value changes before delay is up
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
