import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  
  return {
    user,
    isLoading,
    isError,
    message,
    isAuthenticated: !!user,
  };
};
