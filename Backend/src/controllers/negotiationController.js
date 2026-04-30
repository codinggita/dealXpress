import asyncHandler from 'express-async-handler';
import Negotiation from '../models/Negotiation.js';
import Message from '../models/Message.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import * as negotiationService from '../services/negotiationService.js';

// @desc    Create or get negotiation
// @route   POST /api/negotiations
// @access  Private
const startNegotiation = asyncHandler(async (req, res) => {
  let { productId, sellerId, originalPrice, productName, productImage } = req.body;

  // Handle external product IDs (e.g., from FakeStoreAPI)
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    let localProduct = await Product.findOne({ externalId: productId });
    if (!localProduct) {
      // Find a default seller if sellerId is invalid
      let actualSellerId = sellerId;
      if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        const admin = await User.findOne({ role: 'admin' }) || await User.findOne({});
        actualSellerId = admin?._id || req.user._id;
      }

      localProduct = await Product.create({
        name: productName || 'External Product',
        price: originalPrice || 0,
        image: productImage || '',
        category: 'External',
        description: 'External product imported for negotiation',
        seller: actualSellerId,
        stock: 99,
        externalId: productId
      });
    }
    productId = localProduct._id;
    sellerId = localProduct.seller;
  }

  let negotiation = await Negotiation.findOne({
    buyer: req.user._id,
    product: productId
  });

  if (!negotiation) {
    negotiation = await Negotiation.create({
      buyer: req.user._id,
      seller: sellerId,
      product: productId,
      productData: {
        name: productName,
        image: productImage,
        price: originalPrice
      },
      originalPrice,
    });
  }

  res.status(201).json(negotiation);
});

// @desc    Add text message
// @route   POST /api/negotiations/:id/message
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const negotiationId = req.params.id;

  const message = await Message.create({
    negotiation: negotiationId,
    sender: req.user._id,
    text,
    messageType: 'text'
  });

  const io = req.app.get('io');
  io.to(negotiationId).emit('new_message', message);

  res.status(201).json(message);
});

// @desc    Submit new offer
// @route   POST /api/negotiations/:id/offer
// @access  Private
const submitOffer = asyncHandler(async (req, res) => {
  const { value } = req.body;
  const io = req.app.get('io');
  
  const result = await negotiationService.submitOffer(
    req.params.id,
    req.user._id,
    value,
    io
  );

  res.json(result);
});

// @desc    Respond to offer
// @route   PUT /api/negotiations/:id/respond
// @access  Private
const respondToOffer = asyncHandler(async (req, res) => {
  const { action } = req.body; // 'accept' or 'reject'
  const io = req.app.get('io');

  const result = await negotiationService.respondToOffer(
    req.params.id,
    req.user._id,
    action,
    io
  );

  res.json(result);
});

// @desc    Get negotiation messages
// @route   GET /api/negotiations/:id/messages
// @access  Private
const getNegotiationMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ negotiation: req.params.id })
    .sort({ createdAt: 1 });
  res.json(messages);
});

// @desc    Get user negotiations
// @route   GET /api/negotiations/my
// @access  Private
const getMyNegotiations = asyncHandler(async (req, res) => {
  const negotiations = await Negotiation.find({
    $or: [{ buyer: req.user._id }, { seller: req.user._id }]
  })
    .populate('seller', 'name email')
    .populate('buyer', 'name email')
    .sort({ updatedAt: -1 });
  res.json(negotiations);
});

export {
  startNegotiation,
  sendMessage,
  submitOffer,
  respondToOffer,
  getNegotiationMessages,
  getMyNegotiations
};
