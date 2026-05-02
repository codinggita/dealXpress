import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { toast } from 'react-hot-toast';
import Button from '../common/Button';

const DealCard = ({ deal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, category, price, image, badge, type = 'price' } = deal;

  const { user } = useSelector((state) => state.auth);

  const handleMakeOffer = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login', { state: { from: '/marketplace', deal } });
      return;
    }
    navigate('/negotiation-room', { state: { deal } });
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Parse numeric price from string like "$12.00"
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace('$', '')) 
      : price;
      
    dispatch(addToCart({ 
      _id: deal.id || deal._id, 
      name: title, 
      price: numericPrice, 
      image, 
      category 
    }));
    toast.success('Added to Cart!');
  };

  return (
    <motion.div 
      onClick={handleMakeOffer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/75 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-44 bg-[#F8F9FA] dark:bg-gray-800/50 p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-800 shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {badge && (
          <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100/50 dark:border-gray-700">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block line-clamp-1">
          {category}
        </span>
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2" title={title}>
          {title}
        </h3>

        <div className="mt-auto pt-3">
          <div className="flex flex-col gap-0.5 mb-4">
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {type === 'bid' ? 'Current Bid' : 'Price'}
            </span>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {price}
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleMakeOffer}
              className="flex-1 py-2.5 text-[13px] font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/40 active:scale-[0.98] transition-all duration-200 uppercase tracking-wider"
            >
              Negotiate
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-750 transition-all active:scale-95 border border-gray-200/50 dark:border-gray-700"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;
