import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, MapPin, User, Phone, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutModal = ({ isOpen, onClose, deal, offerAmount, onBookingComplete }) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string().matches(/^[0-9]{5,6}$/, 'Must be a valid ZIP code').required('ZIP code is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number').required('Phone is required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Simulate API Call
      setTimeout(() => {
        setSubmitting(false);
        toast.success('Order placed successfully!');
        if (onBookingComplete) onBookingComplete(values);
        onClose();
      }, 1500);
    }
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Checkout & Delivery</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  Complete your purchase for ${offerAmount || deal?.price || deal?.originalPrice}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" /> Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`}
                        placeholder="John Doe"
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`}
                        placeholder="1234567890"
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" /> Shipping Address
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${formik.touched.address && formik.errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`}
                      placeholder="123 Main St, Apt 4B"
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formik.touched.city && formik.errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`}
                        placeholder="New York"
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.city}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formik.touched.state && formik.errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`}
                        placeholder="NY"
                      />
                      {formik.touched.state && formik.errors.state && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.state}</p>
                      )}
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formik.values.zipCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formik.touched.zipCode && formik.errors.zipCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`}
                        placeholder="10001"
                      />
                      {formik.touched.zipCode && formik.errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer / Submit */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-70"
                  >
                    {formik.isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
