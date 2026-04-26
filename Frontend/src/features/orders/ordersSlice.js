import { createSlice } from '@reduxjs/toolkit';

const MOCK_SHIPMENTS = [
  {
    id: 'DX-ORD-7721',
    product: {
      name: 'MacBook Pro 16" M3 Max',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200',
    },
    status: 'In Transit',
    statusColor: 'blue',
    courier: 'FedEx Express',
    trackingId: '772144558890',
    location: 'Chicago, IL',
    estDelivery: 'Tomorrow, Oct 25',
    progress: 65
  },
  {
    id: 'DX-ORD-6542',
    product: {
      name: 'Herman Miller Aeron Chair',
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=200',
    },
    status: 'Processing',
    statusColor: 'amber',
    courier: 'UPS Ground',
    trackingId: 'Pending',
    location: 'Warehouse - TX',
    estDelivery: 'Oct 28, 2026',
    progress: 15
  },
  {
    id: 'DX-ORD-4412',
    product: {
      name: 'Sony A7IV Mirrorless Camera',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200',
    },
    status: 'Delivered',
    statusColor: 'emerald',
    courier: 'DHL Express',
    trackingId: 'DHL-99228833',
    location: 'Mumbai, MH',
    estDelivery: 'Oct 22, 2026',
    progress: 100
  }
];

const loadOrdersFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('dealXpress_orders');
    if (serializedState === null) {
      return MOCK_SHIPMENTS;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load orders from local storage", err);
    return MOCK_SHIPMENTS;
  }
};

const initialState = {
  items: loadOrdersFromStorage(),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add the new order at the beginning of the list
      state.items.unshift(action.payload);
      try {
        localStorage.setItem('dealXpress_orders', JSON.stringify(state.items));
      } catch (err) {
        console.error("Could not save orders to local storage", err);
      }
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
