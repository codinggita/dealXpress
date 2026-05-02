import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';

const ChatBox = ({ 
  messages, 
  isTyping, 
  inputMessage, 
  setInputMessage, 
  offerAmount, 
  setOfferAmount, 
  handleSendMessage, 
  messagesEndRef,
  isAccepted,
  onCheckoutClick,
  currentNegotiation,
  isSeller,
  onRespond,
  isLoading
}) => {
  
  const lastOffer = currentNegotiation?.lastOffer;

  // Determine if current user can respond to the last offer
  const sellerId = (currentNegotiation?.seller?._id || currentNegotiation?.seller)?.toString();
  const buyerId = (currentNegotiation?.buyer?._id || currentNegotiation?.buyer)?.toString();
  const lastOfferById = (lastOffer?.by?._id || lastOffer?.by)?.toString();

  const showResponseButtons = lastOffer && 
    ((isSeller && lastOfferById !== sellerId) || 
     (!isSeller && lastOfferById !== buyerId)) &&
    currentNegotiation.status === 'active';
  return (
    <div className="w-full flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/75 dark:border-gray-800 shadow-sm flex flex-col h-full overflow-hidden transition-colors duration-300">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Negotiation Room</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Status: <span className="capitalize text-indigo-600 dark:text-indigo-400">{currentNegotiation?.status || 'Pending'}</span>
          </p>
        </div>
        <div className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold text-gray-600 dark:text-gray-400 shadow-sm">
          Live
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FCFCFD] dark:bg-gray-950">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg._id || idx}
              className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`
                px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                ${msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'}
                ${msg.messageType === 'offer' || msg.messageType === 'counter_offer' ? 'border-2 border-amber-400 dark:border-amber-500' : ''}
              `}>
                {msg.text}
                {msg.offerValue && (
                  <div className="mt-2 pt-2 border-t border-white/20 dark:border-gray-700 font-bold text-lg">
                    Amount: ${msg.offerValue}
                  </div>
                )}
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium px-1">
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
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Response Bar */}
      {showResponseButtons && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border-t border-amber-100 dark:border-amber-900/30 flex items-center justify-between">
          <span className="text-sm font-bold text-amber-800 dark:text-amber-300">New offer received: ${lastOffer.value}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => onRespond('reject')}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1 cursor-pointer"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
            <button 
              onClick={() => onRespond('accept')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Accept
            </button>
          </div>
        </div>
      )}

      {/* Chat Input or Checkout Action */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        {isAccepted ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Deal Secured!</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">The price is locked at ${currentNegotiation?.lastOffer?.value}.</p>
            </div>
            {!isSeller && (
              <button
                onClick={onCheckoutClick}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto cursor-pointer"
              >
                Proceed to Checkout
              </button>
            )}
            {isSeller && (
              <div className="px-6 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold rounded-lg border border-green-200 dark:border-green-800">
                Waiting for buyer to complete payment
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
            {/* Quick Offer Row */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm font-bold">$</span>
                </div>
                <input
                  type="number"
                  placeholder="Offer amount"
                  value={offerAmount}
                  disabled={isLoading}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="pl-7 pr-3 py-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
              </div>
              {offerAmount && (
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md border border-indigo-100 dark:border-indigo-800">
                  Submit {isSeller ? 'Counter-Offer' : 'Offer'} of ${offerAmount}
                </div>
              )}
            </div>

            {/* Message Input Row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={setInputMessage}
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button 
                type="submit"
                disabled={(!inputMessage && !offerAmount) || isLoading}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-600/20 flex-shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
