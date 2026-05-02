import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  const updateQty = (item, qty) => {
    if (qty < 1) return;
    dispatch(addToCart({ ...item, qty }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">Your Cart</h2>
                  <p className="text-xs text-gray-400 font-medium">{cartItems.length} items selected</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item._id}
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-black text-gray-900 dark:text-white truncate">{item.name}</h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">${item.price}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-100 dark:border-gray-700">
                          <button
                            onClick={() => updateQty(item, (item.qty || 1) - 1)}
                            className="p-1 hover:text-indigo-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center dark:text-white">{item.qty || 1}</span>
                          <button
                            onClick={() => updateQty(item, (item.qty || 1) + 1)}
                            className="p-1 hover:text-indigo-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-black text-gray-900 dark:text-white">
                          ${(item.price * (item.qty || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-gray-300 dark:text-gray-700" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 max-w-[200px] mt-2">Looks like you haven't added anything yet.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    navigate('/checkout');
                    onClose();
                  }}
                  className="w-full py-4 bg-gray-900 dark:bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 group"
                >
                  Checkout Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
