import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const API_URL = `${BACKEND_URL}/api/orders/`;

// Create new order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
};

export default orderService;
