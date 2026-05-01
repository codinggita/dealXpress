import { useSelector } from 'react-redux';

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
