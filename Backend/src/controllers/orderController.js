import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const {
    orderId,
    product,
    location,
    status,
    statusColor,
    courier,
    trackingId,
    estDelivery,
    progress,
  } = req.body;

  if (!product || !product.name || !product.image) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    user: req.user._id,
    orderId,
    product,
    location,
    status,
    statusColor,
    courier,
    trackingId,
    estDelivery,
    progress,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export {
  createOrder,
  getMyOrders,
};
