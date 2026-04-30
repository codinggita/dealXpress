import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    negotiation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Negotiation',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ['text', 'offer', 'counter_offer', 'system'],
      default: 'text',
    },
    offerValue: {
      type: Number,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster message retrieval
messageSchema.index({ negotiation: 1, createdAt: 1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;
