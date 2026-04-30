import React, { useState } from 'react';
import { ArrowLeft, UserCircle2, ShieldCheck, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductSidebar = ({ deal, onBack }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!deal) return null;

  const productTitle = deal.title || deal.product?.name || deal.productData?.name;
  const productImage = deal.image || deal.product?.image || deal.productData?.image;
  const productPrice = deal.price || (deal.originalPrice ? `$${deal.originalPrice.toLocaleString()}` : deal.productData?.price);
  const sellerName = deal.seller || deal.seller?.name || 'Verified Seller';

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Product Card */}
      <div className="bg-white rounded-2xl border border-gray-200/75 shadow-sm overflow-hidden flex flex-col transition-all">
        {/* Mobile Toggle Header */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden w-full p-4 flex items-center gap-4 bg-gray-50/50 border-b border-gray-100"
        >
          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
            <img src={productImage} alt="" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Item Details</div>
            <div className="text-sm font-bold text-gray-900 truncate">{productTitle}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm font-black text-indigo-600">{productPrice}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </button>

        {/* Content - Hidden on mobile unless expanded */}
        <AnimatePresence>
          {(isExpanded || window.innerWidth >= 1024) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden lg:!h-auto lg:!opacity-100"
            >
              <div className="p-6">
                <div className="hidden lg:flex w-full h-48 bg-gray-50 rounded-xl mb-6 p-4 items-center justify-center border border-gray-100 shadow-inner">
                  <img 
                    src={productImage} 
                    alt={productTitle} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
                
                <h2 className="text-xl font-black text-gray-900 mb-2">{productTitle}</h2>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Listing Price:</span>
                  <span className="text-xl font-black text-indigo-600">{productPrice}</span>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center ring-1 ring-indigo-100">
                      <UserCircle2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-gray-900">{sellerName}</div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Identity
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tip Card - Only on Desktop */}
      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 hidden lg:block shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm ring-1 ring-indigo-100">
            <Info className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-sm text-indigo-900 font-bold leading-relaxed">
            Negotiation Tip: <span className="font-medium text-indigo-700">Start with a reasonable offer. Sellers respond best to bids within 15% of the asking price.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
