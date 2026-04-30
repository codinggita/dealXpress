import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const getStatusBadge = (status) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
          <Clock className="w-3.5 h-3.5" /> Awaiting Response
        </span>
      );
    case 'counter':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
          <AlertCircle className="w-3.5 h-3.5" /> Action Required
        </span>
      );
    case 'accepted':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" /> Offer Accepted
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
          <XCircle className="w-3.5 h-3.5" /> Offer Rejected
        </span>
      );
    default:
      return null;
  }
};

const NegotiationCard = ({ item, index, onViewChat }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-900 border border-gray-200/75 dark:border-gray-800 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all group"
    >
      <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
        
        {/* Product Info */}
        <div className="flex gap-4 flex-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0 border border-gray-100 dark:border-gray-700">
            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1 tracking-wider uppercase">{item.id}</div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {item.product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Seller: <span className="text-gray-700 dark:text-gray-200">{item.seller}</span></p>
          </div>
        </div>

        {/* Price Info */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:gap-1 lg:w-48 py-4 border-y lg:border-y-0 lg:border-x border-gray-100 dark:border-gray-800 px-0 lg:px-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5 lg:text-right">Original Price</span>
            <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 line-through lg:text-right">
              ${(item.originalPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="hidden lg:block w-full h-px bg-gray-100 dark:bg-gray-800 my-2" />
          <div className="flex flex-col items-end">
            <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold mb-0.5">Your Offer</span>
            <span className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400">
              ${(item.currentOffer || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-center lg:items-end justify-between lg:w-48 gap-4">
          <div className="w-full sm:w-auto lg:w-full flex justify-between sm:flex-col gap-2 items-center lg:items-end">
            {getStatusBadge(item.status)}
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
              Updated {item.lastUpdated}
            </span>
          </div>

          <button 
            onClick={() => onViewChat(item)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm rounded-xl transition-colors border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-100 dark:hover:border-indigo-500/50 group/btn cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            View Chat
            {item.messages > 0 && (
              <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-black px-1.5 py-0.5 rounded-md ml-1">
                {item.messages}
              </span>
            )}
            <ChevronRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default NegotiationCard;
