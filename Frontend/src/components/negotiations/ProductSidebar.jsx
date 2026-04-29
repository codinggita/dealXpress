import React from 'react';
import { ArrowLeft, UserCircle2, ShieldCheck, Info } from 'lucide-react';

const ProductSidebar = ({ deal, negotiation, currentOffer, onBack, onRespond }) => {
  if (!deal) return null;

  const productTitle = deal.title || deal.product?.name;
  const productImage = deal.image || deal.product?.image;
  const productPrice = deal.price || `$${deal.originalPrice?.toLocaleString()}`;
  const sellerName = deal.seller?.name || deal.seller || 'Verified Seller';

  return (
    <div className="lg:w-1/3 flex flex-col gap-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-2xl border border-gray-200/75 p-6 shadow-sm flex flex-col">
        <div className="w-full h-48 bg-gray-50 rounded-xl mb-6 p-4 flex items-center justify-center border border-gray-100">
          <img 
            src={productImage} 
            alt={productTitle} 
            className="max-w-full max-h-full object-contain mix-blend-multiply"
          />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">{productTitle}</h2>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-500">Listing Price:</span>
          <span className="text-xl font-black text-indigo-600">{productPrice}</span>
        </div>

        {currentOffer && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-6 animate-in zoom-in duration-300">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Active Offer</div>
            <div className="text-2xl font-black text-amber-700">${currentOffer.amount}</div>
            <div className="text-[10px] text-amber-500 mt-1 font-medium italic">
              Expires: {new Date(currentOffer.expiresAt).toLocaleTimeString()}
            </div>
            
            {/* Logic to show Respond buttons if user is not the one who made the offer */}
            {/* For now, assuming if it's 'pending' and we are seeing it, we can respond */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => onRespond(currentOffer._id, 'accepted')}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-sm"
              >
                Accept
              </button>
              <button 
                onClick={() => onRespond(currentOffer._id, 'rejected')}
                className="flex-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold py-2 rounded-lg transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
              <UserCircle2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{sellerName}</div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Identity
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 hidden lg:block">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-800 font-medium leading-relaxed">
            <strong>Negotiation Tips:</strong> Start with a reasonable offer. Sellers are more likely to respond positively if your initial bid is within 10-15% of the asking price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
