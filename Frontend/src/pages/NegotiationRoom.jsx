import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import { toast } from 'react-hot-toast';
import { 
  getNegotiationMessages, 
  addMessage, 
  updateNegotiation,
  startNegotiation,
  sendMessage,
  submitOffer,
  respondToOffer 
} from '../features/negotiation/negotiationSlice';
import { 
  initiateSocketConnection, 
  disconnectSocket, 
  joinRoom, 
  subscribeToMessages, 
  subscribeToOffers, 
  subscribeToResponses,
  subscribeToTyping,
  emitTyping 
} from '../app/socket';
import negotiationService from '../features/negotiation/negotiationService';
import SEO from '../components/common/SEO';

import ProductSidebar from '../components/negotiations/ProductSidebar';
import ChatBox from '../components/negotiations/ChatBox';
import CheckoutModal from '../components/negotiations/CheckoutModal';

const TYPING_LOTTIE = "https://lottie.host/76672322-19e4-44b4-8f92-563b7e4113e1/Y2N9z7m0tC.json";
const SUCCESS_LOTTIE = "https://lottie.host/80e9a7e6-773a-449e-8c3b-715132537c68/qK6uG7pX9O.json";

const NegotiationRoom = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { messages, currentNegotiation, isLoading } = useSelector((state) => state.negotiation);
  
  const [inputMessage, setInputMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [isRemoteTyping, setIsRemoteTyping] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  const [typingAnimation, setTypingAnimation] = useState(null);
  const [successAnimation, setSuccessAnimation] = useState(null);

  const deal = location.state?.deal || currentNegotiation;

  // Fetch Lottie JSONs with safety
  useEffect(() => {
    const fetchLotties = async () => {
      try {
        const tRes = await fetch(TYPING_LOTTIE);
        if (tRes.ok) setTypingAnimation(await tRes.json());
        const sRes = await fetch(SUCCESS_LOTTIE);
        if (sRes.ok) setSuccessAnimation(await sRes.json());
      } catch (e) {
        console.warn("Lottie fetch failed");
      }
    };
    fetchLotties();
  }, []);

  // Socket Connection
  useEffect(() => {
    if (user?.token) {
      initiateSocketConnection(user.token);
      
      subscribeToMessages((err, msg) => {
        if (msg) dispatch(addMessage(msg));
      });
      
      subscribeToOffers((err, data) => {
        if (data) {
          dispatch(updateNegotiation(data.negotiation));
          dispatch(addMessage(data.message));
          toast.success("New offer received!");
        }
      });
      
      subscribeToResponses((err, data) => {
        if (data) {
          dispatch(updateNegotiation(data.negotiation));
          dispatch(addMessage(data.message));
          toast(data.action === 'accept' ? "Offer Accepted!" : "Offer Rejected", {
            icon: data.action === 'accept' ? '🎉' : '❌'
          });
        }
      });

      subscribeToTyping((err, data) => {
        if (data.userId !== user._id) {
          setIsRemoteTyping(data.isTyping);
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [user, dispatch]);

  // Join room and fetch history
  useEffect(() => {
    const negotiationId = id || currentNegotiation?._id;
    if (negotiationId) {
      joinRoom(negotiationId);
      dispatch(getNegotiationMessages(negotiationId));
    } else if (deal) {
      // If we don't have an ID but have a deal, it might be a new negotiation
      const cleanPrice = typeof (deal.price || deal.originalPrice) === 'string' 
        ? parseFloat((deal.price || deal.originalPrice).replace(/[^0-9.]/g, ''))
        : (deal.price || deal.originalPrice);

      dispatch(startNegotiation({
        productId: deal.id || deal._id,
        sellerId: deal.sellerId || deal.seller?._id || deal.seller,
        productName: deal.title || deal.productData?.name,
        productImage: deal.image || deal.productData?.image,
        originalPrice: cleanPrice
      }));
    }
  }, [id, currentNegotiation?._id, deal, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isRemoteTyping]);

  const handleTyping = (e) => {
    setInputMessage(e.target.value);
    
    emitTyping(currentNegotiation?._id, true);
    
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setTimeout(() => {
      emitTyping(currentNegotiation?._id, false);
    }, 2000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const negId = id || currentNegotiation?._id;
    if (!negId) return;

    if (offerAmount) {
      dispatch(submitOffer({ id: negId, value: offerAmount }));
      setOfferAmount('');
    } else if (inputMessage.trim()) {
      dispatch(sendMessage({ id: negId, text: inputMessage }));
      setInputMessage('');
    }
  };

  const handleOfferResponse = async (action) => {
    const negId = id || currentNegotiation?._id;
    if (!negId) return;
    dispatch(respondToOffer({ id: negId, action }));
  };

  if (!deal && !currentNegotiation) return <div className="p-8 text-center">Loading negotiation...</div>;

  const isAccepted = currentNegotiation?.status === 'accepted';
  const isSeller = (currentNegotiation?.seller?._id || currentNegotiation?.seller)?.toString() === user?._id?.toString();

  return (
    <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-4 lg:gap-6 relative p-2 md:p-6 lg:p-0">
      <SEO 
        title={`Negotiation: ${deal?.title || 'Room'}`} 
        description={`Real-time price negotiation for ${deal?.title || 'products'} on DealXpress. Chat directly with the seller.`} 
      />
      {isAccepted && successAnimation && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 md:w-96 md:h-96">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
        </div>
      )}
      
      <ProductSidebar deal={deal} onBack={() => navigate(-1)} />
      
      <div className="flex-1 flex flex-col relative min-h-0">
        <ChatBox 
          messages={messages.map(m => ({
            ...m,
            sender: (m.sender?._id || m.sender)?.toString() === user?._id?.toString() ? 'user' : 'other',
            timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }))}
          isTyping={isRemoteTyping}
          inputMessage={inputMessage}
          setInputMessage={handleTyping}
          offerAmount={offerAmount}
          setOfferAmount={setOfferAmount}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isAccepted={isAccepted}
          onCheckoutClick={() => setShowCheckoutModal(true)}
          currentNegotiation={currentNegotiation}
          isSeller={isSeller}
          onRespond={handleOfferResponse}
          isLoading={isLoading}
        />
        
        {isRemoteTyping && typingAnimation && (
          <div className="absolute bottom-28 md:bottom-32 left-4 md:left-8 flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl shadow-md border border-gray-100 z-10 scale-90 md:scale-100 origin-left">
            <div className="w-10 h-5">
              <Lottie animationData={typingAnimation} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Typing...</span>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        deal={deal}
        negotiation={currentNegotiation}
        negotiationId={currentNegotiation?._id}
        offerAmount={currentNegotiation?.lastOffer?.value}
        onBookingComplete={() => navigate('/delivery')}
      />
    </div>
  );
};

export default NegotiationRoom;


