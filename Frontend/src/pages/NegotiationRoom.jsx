import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import axios from 'axios';
import { saveOrder } from '../features/orders/ordersSlice';
import ProductSidebar from '../components/negotiations/ProductSidebar';
import ChatBox from '../components/negotiations/ChatBox';
import CheckoutModal from '../components/negotiations/CheckoutModal';
import { toast } from 'react-hot-toast';
import { 
  initiateSocketConnection, 
  disconnectSocket, 
  joinNegotiationRoom, 
  subscribeToMessages, 
  subscribeToOffers, 
  sendMessage, 
  emitTyping, 
  subscribeToTyping 
} from '../utils/socket';

// Lottie Animations
const TYPING_LOTTIE = "https://lottie.host/76672322-19e4-44b4-8f92-563b7e4113e1/Y2N9z7m0tC.json";
const SUCCESS_LOTTIE = "https://lottie.host/80e9a7e6-773a-449e-8c3b-715132537c68/qK6uG7pX9O.json";

const NegotiationRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const [negotiation, setNegotiation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const [typingAnimation, setTypingAnimation] = useState(null);
  const [successAnimation, setSuccessAnimation] = useState(null);

  const deal = location.state?.deal || null;

  // Lottie Fetch
  useEffect(() => {
    fetch(TYPING_LOTTIE).then(res => res.json()).then(data => setTypingAnimation(data));
    fetch(SUCCESS_LOTTIE).then(res => res.json()).then(data => setSuccessAnimation(data));
  }, []);

  // Socket Connection
  useEffect(() => {
    if (user) {
      initiateSocketConnection(user._id);
    }
    return () => disconnectSocket();
  }, [user]);

  // Initialize Negotiation
  useEffect(() => {
    if (!deal) {
      navigate('/marketplace');
      return;
    }

    const init = async () => {
      try {
        const res = await axios.post('/api/negotiations', {
          productId: deal._id || deal.id,
          sellerId: deal.seller?._id || deal.sellerId,
          originalPrice: deal.price
        });
        
        setNegotiation(res.data);
        setMessages(res.data.messages || []);
        joinNegotiationRoom(res.data._id);
      } catch (err) {
        console.error("Init error:", err);
        toast.error("Failed to start negotiation");
      }
    };

    init();
  }, [deal, navigate]);

  // Socket Subscriptions
  useEffect(() => {
    subscribeToMessages((err, msg) => {
      if (msg) setMessages(prev => [...prev, msg]);
    });

    subscribeToOffers((err, data) => {
      if (data.offer) {
        setNegotiation(prev => ({
          ...prev,
          offers: [...(prev.offers || []), data.offer]
        }));
        toast.success("New offer received!");
      }
      if (data.status) {
        setNegotiation(prev => ({
          ...prev,
          status: data.status === 'accepted' ? 'accepted' : prev.status,
          offers: prev.offers.map(o => o._id === data.offerId ? { ...o, status: data.status } : o)
        }));
        if (data.status === 'accepted') toast.success("Offer accepted!");
      }
    });

    subscribeToTyping((err, data) => {
      if (data.userId !== user?._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });
  }, [user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !offerAmount) return;

    if (offerAmount) {
      try {
        const res = await axios.post(`/api/negotiations/${negotiation._id}/offer`, {
          amount: parseFloat(offerAmount),
          durationHours: 24
        });
        setNegotiation(res.data);
        setOfferAmount('');
      } catch (err) {
        toast.error("Failed to make offer");
      }
    }

    if (inputMessage.trim()) {
      const msgData = {
        negotiationId: negotiation._id,
        senderId: user._id,
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      try {
        await axios.put(`/api/negotiations/${negotiation._id}/message`, { text: inputMessage });
        sendMessage(msgData);
        setMessages(prev => [...prev, { ...msgData, sender: 'user' }]);
        setInputMessage('');
      } catch (err) {
        toast.error("Failed to send message");
      }
    }
  };

  const handleRespondToOffer = async (offerId, status) => {
    try {
      const res = await axios.put(`/api/negotiations/${negotiation._id}/offer/${offerId}`, { status });
      setNegotiation(res.data);
      toast.success(`Offer ${status}`);
    } catch (err) {
      toast.error(`Failed to ${status} offer`);
    }
  };

  const handleTyping = () => {
    if (negotiation) emitTyping(negotiation._id, user._id);
  };

  const currentOffer = negotiation?.offers?.slice().reverse().find(o => o.status === 'pending');
  const isAccepted = negotiation?.status === 'accepted';

  if (!deal || !negotiation) return <div className="h-screen flex items-center justify-center font-bold text-gray-400">Loading Negotiation...</div>;

  return (
    <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6 relative">
      {isAccepted && successAnimation && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="w-96 h-96">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
        </div>
      )}
      
      <ProductSidebar 
        deal={deal} 
        negotiation={negotiation}
        currentOffer={currentOffer}
        onBack={() => navigate(-1)} 
        onRespond={handleRespondToOffer}
      />
      
      <div className="flex-1 flex flex-col relative">
        <ChatBox 
          messages={messages}
          isTyping={isTyping}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          offerAmount={offerAmount}
          setOfferAmount={setOfferAmount}
          handleSendMessage={handleSendMessage}
          handleTyping={handleTyping}
          messagesEndRef={messagesEndRef}
          isAccepted={isAccepted}
          onCheckoutClick={() => setShowCheckoutModal(true)}
          currentUserId={user?._id}
        />
        
        {isTyping && typingAnimation && (
          <div className="absolute bottom-24 left-8 flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-6">
              <Lottie animationData={typingAnimation} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Someone is typing</span>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        deal={deal}
        offerAmount={negotiation.offers.find(o => o.status === 'accepted')?.amount}
        onBookingComplete={() => navigate('/delivery')}
      />
    </div>
  );
};

export default NegotiationRoom;


