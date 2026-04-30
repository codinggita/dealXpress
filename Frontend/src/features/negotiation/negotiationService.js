import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const API_URL = `${BACKEND_URL}/api/negotiations/`;

// Start/Get negotiation
const startNegotiation = async (negotiationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, negotiationData, config);
  return response.data;
};

// Get my negotiations
const getMyNegotiations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}my`, config);
  return response.data;
};

// Get negotiation messages
const getNegotiationMessages = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}${id}/messages`, config);
  return response.data;
};

// Send text message
const sendMessage = async (id, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}${id}/message`, { text }, config);
  return response.data;
};

// Submit offer
const submitOffer = async (id, value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}${id}/offer`, { value }, config);
  return response.data;
};

// Respond to offer
const respondToOffer = async (id, action, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}/respond`, { action }, config);
  return response.data;
};

const negotiationService = {
  startNegotiation,
  getMyNegotiations,
  getNegotiationMessages,
  sendMessage,
  submitOffer,
  respondToOffer,
};

export default negotiationService;
