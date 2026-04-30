import mongoose from 'mongoose';

const offerHistorySchema = mongoose.Schema({
  offeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'countered', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  }
});

const negotiationSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    productData: { 
      name: String,
      image: String,
      price: Number
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'active', 'accepted', 'rejected', 'expired', 'completed'],
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    lastOffer: {
      value: Number,
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      expiresAt: Date
    },
    offerHistory: [offerHistorySchema],
    isFinal: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Index for performance
negotiationSchema.index({ buyer: 1, seller: 1, product: 1 });
negotiationSchema.index({ status: 1 });

const Negotiation = mongoose.model('Negotiation', negotiationSchema);

export default Negotiation;
