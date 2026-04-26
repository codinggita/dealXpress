import React from 'react';
import { ArrowLeft, UserCircle2, ShieldCheck, Info } from 'lucide-react';

const ProductSidebar = ({ deal, onBack }) => {
  if (!deal) return null;

  const productTitle = deal.title || deal.product?.name;
  const productImage = deal.image || deal.product?.image;
  const productPrice = deal.price || `$${deal.originalPrice?.toLocaleString()}`;
  const sellerName = deal.seller || 'Verified Seller';

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
