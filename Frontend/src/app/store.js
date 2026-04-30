import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ordersReducer from '../features/orders/ordersSlice';
import negotiationReducer from '../features/negotiation/negotiationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    negotiation: negotiationReducer,
  },
  devTools: true,
});
