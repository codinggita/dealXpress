import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';

/**
 * useFetch — Generic data fetching hook with loading, error, and refetch support.
 *
 * @param {string} url - API endpoint to fetch (relative to baseURL)
 * @param {object} [options] - Optional: { immediate: bool, deps: array }
 * @returns {{ data, loading, error, refetch }}
 *
 * @example
 * const { data: orders, loading, error } = useFetch('/api/orders/my');
 */
const useFetch = (url, options = {}) => {
  const { immediate = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
