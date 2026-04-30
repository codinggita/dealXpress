import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Negotiation from '../models/Negotiation.js';

// @desc    Get seller analytics
// @route   GET /api/analytics/seller
// @access  Private/Seller
const getSellerAnalytics = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const totalSales = await Order.aggregate([
    { $match: { seller: sellerId, paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
  ]);

  const activeNegotiations = await Negotiation.countDocuments({ 
    seller: sellerId, 
    status: { $in: ['pending', 'active'] } 
  });

  const acceptedNegotiations = await Negotiation.countDocuments({ 
    seller: sellerId, 
    status: 'accepted' 
  });

  const totalNegotiations = await Negotiation.countDocuments({ seller: sellerId });
  const conversionRate = totalNegotiations > 0 
    ? ((acceptedNegotiations / totalNegotiations) * 100).toFixed(2) 
    : 0;

  res.json({
    revenue: totalSales[0]?.total || 0,
    salesCount: totalSales[0]?.count || 0,
    activeNegotiations,
    conversionRate
  });
});

// @desc    Get buyer analytics
// @route   GET /api/analytics/buyer
// @access  Private
const getBuyerAnalytics = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;

  const totalSpent = await Order.aggregate([
    { $match: { user: buyerId, paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);

  const negotiationSuccess = await Negotiation.countDocuments({ 
    buyer: buyerId, 
    status: 'accepted' 
  });

  const totalNegotiations = await Negotiation.countDocuments({ buyer: buyerId });

  res.json({
    totalSpent: totalSpent[0]?.total || 0,
    negotiationSuccess,
    successRate: totalNegotiations > 0 
      ? ((negotiationSuccess / totalNegotiations) * 100).toFixed(2) 
      : 0
  });
});

export { getSellerAnalytics, getBuyerAnalytics };
