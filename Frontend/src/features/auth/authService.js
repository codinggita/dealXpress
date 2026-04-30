import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Update user profile
const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + 'profile', userData, config);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Change password
const changePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + 'password', passwordData, config);
  return response.data;
};

// Google Login
const googleLogin = async (credential) => {
  const response = await axios.post(API_URL + 'google', { credential });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Forgot Password - Send OTP
const forgotPassword = async (email) => {
  const response = await axios.post(API_URL + 'forgot-password', { email });
  return response.data;
};

// Verify OTP
const verifyOTP = async (otpData) => {
  const response = await axios.post(API_URL + 'verify-otp', otpData);
  return response.data;
};

// Reset Password
const resetPassword = async (resetData) => {
  const response = await axios.post(API_URL + 'reset-password', resetData);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  googleLogin,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};

export default authService;
