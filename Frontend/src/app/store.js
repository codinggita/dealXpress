import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ordersReducer from '../features/orders/ordersSlice';
import negotiationReducer from '../features/negotiation/negotiationSlice';
import uiReducer from '../features/ui/uiSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    negotiation: negotiationReducer,
    ui: uiReducer,
    cart: cartReducer,
  },
  devTools: true,
});
