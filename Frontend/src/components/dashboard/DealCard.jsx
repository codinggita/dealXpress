import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const DealCard = ({ deal }) => {
  const navigate = useNavigate();
  const { title, category, price, image, badge, type = 'price' } = deal;

  const handleMakeOffer = (e) => {
    e.stopPropagation();
    navigate('/negotiation-room', { state: { deal } });
  };

  return (
    <motion.div 
      onClick={handleMakeOffer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-200/75 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-44 bg-[#F8F9FA] p-4 flex items-center justify-center border-b border-gray-100 shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide text-gray-800 shadow-sm border border-gray-100/50">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-1.5 block line-clamp-1">
          {category}
        </span>
        <h3 className="text-[14px] font-semibold text-gray-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2" title={title}>
          {title}
        </h3>

        <div className="mt-auto pt-3">
          <div className="flex flex-col gap-0.5 mb-4">
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              {type === 'bid' ? 'Current Bid' : 'Price'}
            </span>
            <div className="text-xl font-bold text-gray-900">
              {price}
            </div>
          </div>

          <button 
            onClick={handleMakeOffer}
            className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/40 active:scale-[0.98] transition-all duration-200"
          >
            Make Offer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;
