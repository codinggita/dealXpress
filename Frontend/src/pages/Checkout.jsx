import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight, 
  ShieldCheck, 
  Truck,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { clearCart } from '../features/cart/cartSlice';
import SEO from '../components/common/SEO';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const formik = useFormik({
    initialValues: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required'),
      phone: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const orderData = {
          orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty || 1,
            image: item.image,
            price: item.price,
            product: item._id,
            seller: item.sellerId
          })),
          shippingAddress: {
            street: values.address,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            country: 'India'
          },
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice
        };

        await axios.post((import.meta.env.VITE_BACKEND_URL || '') + '/api/orders', orderData, config);
        
        setOrderSuccess(true);
        dispatch(clearCart());
        toast.success('Order placed successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to place order');
      }
    }
  });

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-3xl flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">Add some items to your cart before checking out.</p>
        <button 
          onClick={() => navigate('/marketplace')}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
        >
          Go to Marketplace
        </button>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </motion.div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/delivery')}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            Track My Order <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate('/marketplace')}
            className="px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <SEO title="Checkout" description="Securely complete your purchase on DealXpress." />
      
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Form */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Shipping Details</h2>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Street Address</label>
                <input 
                  type="text" 
                  name="address"
                  {...formik.getFieldProps('address')}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">City</label>
                <input 
                  type="text" 
                  name="city"
                  {...formik.getFieldProps('city')}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">State</label>
                <input 
                  type="text" 
                  name="state"
                  {...formik.getFieldProps('state')}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">ZIP Code</label>
                <input 
                  type="text" 
                  name="zipCode"
                  {...formik.getFieldProps('zipCode')}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="10001"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  {...formik.getFieldProps('phone')}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </form>
          </section>

          <section className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm opacity-60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Payment Method</h2>
            </div>
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/20 rounded-2xl flex items-center gap-4">
               <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                 <ShieldCheck className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-sm font-black text-indigo-900 dark:text-indigo-300">Secure Payment</p>
                 <p className="text-[11px] text-indigo-600/70 dark:text-indigo-400/70 font-bold uppercase tracking-widest">Mock Transaction Mode Enabled</p>
               </div>
            </div>
          </section>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-900 dark:bg-indigo-950/20 p-8 rounded-[2.5rem] text-white sticky top-24 shadow-2xl shadow-indigo-900/20">
            <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-indigo-400" /> Order Summary
            </h2>

            <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item._id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border-2 border-indigo-500/20 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">{item.name}</p>
                    <p className="text-xs text-indigo-300 font-bold mt-1">{item.qty || 1} x ${item.price}</p>
                  </div>
                  <p className="text-sm font-black">${((item.qty || 1) * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10 text-sm font-bold">
              <div className="flex justify-between text-indigo-200">
                <span className="uppercase tracking-widest text-[11px]">Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-indigo-200">
                <span className="uppercase tracking-widest text-[11px]">Shipping</span>
                <span>${shippingPrice === 0 ? 'FREE' : `$${shippingPrice}`}</span>
              </div>
              <div className="flex justify-between text-indigo-200">
                <span className="uppercase tracking-widest text-[11px]">Estimated Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-white/10">
                <span className="uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-indigo-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl mt-10 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {formik.isSubmitting ? (
                <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Place My Order <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/40 font-black uppercase tracking-widest">
              <Truck className="w-3 h-3" /> Fast Delivery Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
