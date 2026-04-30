import Negotiation from '../models/Negotiation.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';

/**
 * @desc    Submit a new offer or counter-offer
 */
export const submitOffer = async (negotiationId, userId, value, io) => {
  const negotiation = await Negotiation.findById(negotiationId);
  if (!negotiation) throw new Error('Negotiation not found');

  if (negotiation.status === 'completed' || negotiation.status === 'rejected') {
    throw new Error('This negotiation is closed');
  }

  const isBuyer = negotiation.buyer.toString() === userId.toString();
  const isSeller = negotiation.seller.toString() === userId.toString();

  if (!isBuyer && !isSeller) throw new Error('Not authorized');

  // Update offer history
  const newOffer = {
    offeredBy: userId,
    value,
    timestamp: new Date(),
    status: 'pending'
  };

  // Mark previous pending offers as countered
  negotiation.offerHistory.forEach(offer => {
    if (offer.status === 'pending') offer.status = 'countered';
  });

  negotiation.offerHistory.push(newOffer);
  negotiation.lastOffer = {
    value,
    by: userId,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h expiry
  };
  negotiation.status = 'active';

  await negotiation.save();

  // Create system message
  const message = await Message.create({
    negotiation: negotiationId,
    sender: userId,
    text: `${isBuyer ? 'Buyer' : 'Seller'} offered $${value}`,
    messageType: isBuyer ? 'offer' : 'counter_offer',
    offerValue: value
  });

  // Create Notification
  const recipient = isBuyer ? negotiation.seller : negotiation.buyer;
  await Notification.create({
    recipient,
    sender: userId,
    type: 'NEW_OFFER',
    content: `New offer of $${value} received for ${negotiation.productData.name}`,
    link: `/negotiation/${negotiationId}`
  });

  // Emit socket events
  io.to(negotiationId.toString()).emit('offer_received', { negotiation, message });
  io.to(recipient.toString()).emit('notification', { 
    type: 'NEW_OFFER', 
    message: `New offer for ${negotiation.productData.name}` 
  });

  // --- DEV SIMULATOR ---
  // If in dev mode and buyer makes an offer, simulate a seller response
  if (isBuyer) {
    console.log(`[SIMULATOR] Buyer made offer: $${value}. Waiting for auto-response...`);
    setTimeout(async () => {
      try {
        const currentNeg = await Negotiation.findById(negotiationId);
        if (!currentNeg || currentNeg.status !== 'active') return;

        // Clean prices for comparison
        const offerVal = parseFloat(value);
        const origPrice = parseFloat(currentNeg.originalPrice);
        
        const action = offerVal >= (origPrice * 0.7) ? 'accept' : 'reject';
        
        await respondToOffer(negotiationId, currentNeg.seller, action, io, true);
        console.log(`[SIMULATOR] Auto-${action}ed offer ($${offerVal} vs $${origPrice}) for negotiation ${negotiationId}`);
      } catch (simErr) {
        console.error('[SIMULATOR] Error:', simErr.message);
      }
    }, 3000);
  }

  return { negotiation, message };
};

/**
 * @desc    Respond to an offer (Accept/Reject)
 */
export const respondToOffer = async (negotiationId, userId, action, io, isSystem = false) => {
  const negotiation = await Negotiation.findById(negotiationId);
  if (!negotiation) throw new Error('Negotiation not found');

  const isRecipient = isSystem || (negotiation.lastOffer.by.toString() !== userId.toString());
  if (!isRecipient) throw new Error('You cannot respond to your own offer');

  if (action === 'accept') {
    negotiation.status = 'accepted';
    negotiation.isFinal = true;
    const lastOffer = negotiation.offerHistory[negotiation.offerHistory.length - 1];
    if (lastOffer) lastOffer.status = 'accepted';
  } else if (action === 'reject') {
    negotiation.status = 'rejected';
    const lastOffer = negotiation.offerHistory[negotiation.offerHistory.length - 1];
    if (lastOffer) lastOffer.status = 'rejected';
  }

  await negotiation.save();

  // Notify
  const recipient = negotiation.lastOffer.by;
  const message = await Message.create({
    negotiation: negotiationId,
    sender: userId,
    text: `Offer ${action === 'accept' ? 'accepted' : 'rejected'}`,
    messageType: 'system'
  });

  io.to(negotiationId.toString()).emit('offer_responded', { negotiation, message, action });
  io.to(recipient.toString()).emit('notification', { 
    type: action === 'accept' ? 'OFFER_ACCEPTED' : 'OFFER_REJECTED',
    message: `Your offer was ${action}ed` 
  });

  return { negotiation, message };
};
