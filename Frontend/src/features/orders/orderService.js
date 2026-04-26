import axios from 'axios';

const API_URL = '/api/orders/';

// Create new order
const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

// Get user orders
const getMyOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
};

export default orderService;
