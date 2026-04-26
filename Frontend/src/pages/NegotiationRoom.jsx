import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrder } from '../features/orders/ordersSlice';
import ProductSidebar from '../components/negotiations/ProductSidebar';
import ChatBox from '../components/negotiations/ChatBox';
import CheckoutModal from '../components/negotiations/CheckoutModal';

const NegotiationRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const messagesEndRef = useRef(null);

  const deal = location.state?.deal || null;

  useEffect(() => {
    if (!deal) {
      navigate('/marketplace');
      return;
    }

    setMessages([
      {
        id: 1,
        sender: 'seller',
        text: `Hi there! Thanks for your interest in the ${deal.title || deal.product?.name}. The current price is ${deal.price || '$' + deal.originalPrice}. What's your best offer?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [deal, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.sender === 'user') {
      setIsTyping(true);

      const botReplyDelay = setTimeout(() => {
        setIsTyping(false);
        let botResponse = '';
        const userText = lastMessage.text.toLowerCase();
        
        if (lastMessage.isOffer) {
          const offer = parseFloat(lastMessage.offerValue);
          const originalPriceRaw = deal?.price || deal?.originalPrice || 0;
          const originalPrice = parseFloat(String(originalPriceRaw).replace(/[^0-9.]/g, ''));
          
          if (offer >= originalPrice * 0.85) {
            botResponse = `I see your offer of $${lastMessage.offerValue}. That sounds like a fair deal to me. I accept it!`;
            setIsAccepted(true);
          } else if (offer >= originalPrice * 0.70) {
            botResponse = `I see your offer of $${lastMessage.offerValue}. We are getting closer, but can you do a little better?`;
          } else {
            botResponse = `I see your offer of $${lastMessage.offerValue}. That's too low for me. We need to be closer to the original price.`;
          }
        } else if (userText.includes('deal') || userText.includes('agree')) {
          botResponse = "Alright, you've got a deal! I'll accept the offer.";
          setIsAccepted(true);
        } else if (userText.includes('final')) {
          botResponse = "That's my final price too. Take it or leave it.";
        } else {
          botResponse = "I'm open to negotiation, but let's be reasonable. What price did you have in mind?";
        }

        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'seller',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

      }, 1500 + Math.random() * 1000);

      return () => clearTimeout(botReplyDelay);
    }
  }, [messages, deal]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !offerAmount) return;

    const isOffer = !!offerAmount;
    const text = isOffer 
      ? `I'd like to make an offer: $${offerAmount}${inputMessage ? '. ' + inputMessage : ''}`
      : inputMessage;

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text,
      isOffer,
      offerValue: offerAmount,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputMessage('');
    setOfferAmount('');
  };

  const handleBookingComplete = (addressDetails) => {
    const newOrder = {
      id: `DX-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      product: {
        name: deal?.title || deal?.product?.name || 'Item',
        image: deal?.image || deal?.product?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200',
      },
      status: 'Processing',
      statusColor: 'amber',
      courier: 'Assigning Courier...',
      trackingId: 'Pending',
      location: `${addressDetails.city}, ${addressDetails.state}`,
      estDelivery: 'In 3-5 Business Days',
      progress: 10
    };
    
    dispatch(addOrder(newOrder));
    navigate('/delivery');
  };

  if (!deal) return null;

  return (
    <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      <ProductSidebar deal={deal} onBack={() => navigate(-1)} />
      <ChatBox 
        messages={messages}
        isTyping={isTyping}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        offerAmount={offerAmount}
        setOfferAmount={setOfferAmount}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
        isAccepted={isAccepted}
        onCheckoutClick={() => setShowCheckoutModal(true)}
      />
      <CheckoutModal 
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        deal={deal}
        offerAmount={messages.slice().reverse().find(m => m.isOffer)?.offerValue}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default NegotiationRoom;
