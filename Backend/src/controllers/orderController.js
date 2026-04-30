import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import * as deliveryService from '../services/deliveryService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { 
    productId, 
    productName, 
    productImage, 
    amount, 
    shippingAddress,
    sellerId,
    negotiationId 
  } = req.body;

  // Simulate distance calculation (in a real app, use Maps API)
  const distance = Math.floor(Math.random() * 500) + 10; // 10 to 510 km
  const deliveryCost = deliveryService.calculateDeliveryCost(distance);
  const totalAmount = amount + deliveryCost;

  const orderId = `DX-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const order = await Order.create({
    user: req.user._id,
    seller: sellerId || '65f1234567890abcdef12345', // Fallback for demo
    negotiation: negotiationId,
    orderId,
    product: {
      id: productId,
      name: productName,
      image: productImage,
    },
    shippingAddress,
    deliveryDetails: {
      distance,
      cost: deliveryCost,
      courierPartner: 'Pending Assignment',
      estimatedDeliveryDate: deliveryService.getEstimatedDeliveryDate(distance),
    },
    totalAmount,
    timeline: [{
      status: 'placed',
      description: 'Order has been placed successfully.'
    }]
  });

  res.status(201).json(order);
});

// @desc    Update order status (Internal/Seller)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, description } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    
    // Add to timeline
    order.timeline.push({
      status,
      description: description || `Order status updated to ${status}`
    });

    // If shipped, assign courier and tracking
    if (status === 'shipped' && !order.deliveryDetails.trackingNumber) {
      order.deliveryDetails.courierPartner = deliveryService.assignDeliveryPartner();
      order.deliveryDetails.trackingNumber = deliveryService.generateTrackingId();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get user orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order && (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin')) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  createOrder,
  updateOrderStatus,
  getMyOrders,
  getOrderById
};
