import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    negotiation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Negotiation',
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    deliveryDetails: {
      distance: Number, // in km
      cost: Number,
      courierPartner: String,
      trackingNumber: String,
      estimatedDeliveryDate: Date,
    },
    status: {
      type: String,
      required: true,
      default: 'placed',
      enum: ['placed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
    },
    paymentStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid', 'failed', 'refunded'],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    timeline: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        description: String,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
