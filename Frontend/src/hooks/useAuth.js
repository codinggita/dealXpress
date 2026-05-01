import { useSelector } from 'react-redux';

/**
 * useAuth — Custom hook for authentication state
 *
 * Returns the current user, loading state, and authentication status.
 * This is the single source of truth for auth across the app.
 *
 * @returns {{ user: object|null, isLoading: boolean, isAuthenticated: boolean }}
 *
 * @example
 * const { user, isAuthenticated } = useAuth();
 */
const useAuth = () => {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  return {
    user,
    isLoading,
    isError,
    message,
    isAuthenticated: !!user,
  };
};

export default useAuth;
