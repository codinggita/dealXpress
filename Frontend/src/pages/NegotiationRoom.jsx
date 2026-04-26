import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductSidebar from '../components/negotiations/ProductSidebar';
import ChatBox from '../components/negotiations/ChatBox';

const NegotiationRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
          botResponse = `I see your offer of $${lastMessage.offerValue}. That's a bit low for me. Can you do a little better?`;
        } else if (userText.includes('deal') || userText.includes('agree')) {
          botResponse = "Alright, you've got a deal! I'll accept the offer.";
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
  }, [messages]);

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
      />
    </div>
  );
};

export default NegotiationRoom;
