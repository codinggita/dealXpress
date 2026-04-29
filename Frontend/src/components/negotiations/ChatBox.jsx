import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const ChatBox = ({ 
  messages, 
  isTyping, 
  inputMessage, 
  setInputMessage, 
  offerAmount, 
  setOfferAmount, 
  handleSendMessage, 
  handleTyping,
  messagesEndRef,
  isAccepted,
  onCheckoutClick,
  currentUserId
}) => {
  const onInputChange = (e) => {
    setInputMessage(e.target.value);
    if (handleTyping) handleTyping();
  };
  return (
    <div className="lg:w-2/3 bg-white rounded-2xl border border-gray-200/75 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Offer Room</h3>
          <p className="text-xs text-gray-500 font-medium">Messages are end-to-end encrypted</p>
        </div>
        <div className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 shadow-sm">
          Live Chat
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FCFCFD]">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id || msg._id || Math.random()}
              className={`flex flex-col max-w-[80%] ${msg.senderId === currentUserId ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`
                px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                ${msg.senderId === currentUserId 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'}
              `}>
                {msg.text}
              </div>
              <span className="text-[11px] text-gray-400 mt-1.5 font-medium px-1">
                {msg.timestamp}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-start mr-auto"
          >
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input or Checkout Action */}
      <div className="p-4 bg-white border-t border-gray-100">
        {isAccepted ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-900">Offer Accepted!</h4>
              <p className="text-sm text-gray-500">Proceed to checkout to secure your deal.</p>
            </div>
            <button
              onClick={onCheckoutClick}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
            {/* Quick Offer Row */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm font-bold">$</span>
                </div>
                <input
                  type="number"
                  placeholder="Offer amount"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="pl-7 pr-3 py-2 w-full bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              {offerAmount && (
                <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                  Ready to offer ${offerAmount}
                </div>
              )}
            </div>

            {/* Message Input Row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message or add a note to your offer..."
                value={inputMessage}
                onChange={onInputChange}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button 
                type="submit"
                disabled={!inputMessage.trim() && !offerAmount}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-600/20 flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
