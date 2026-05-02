import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck,
  Briefcase,
  Loader2
} from 'lucide-react';
import { register, reset, googleLogin as googleLoginThunk } from '../features/auth/authSlice';
import Button from '../components/common/Button';
import { GoogleLogin } from '@react-oauth/google';
import SEO from '../components/common/SEO';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const { name, email, password, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success('Account Created Successfully!');
      setTimeout(() => {
        navigate('/marketplace');
        dispatch(reset());
      }, 2000); // Small delay to let the user see the message
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden">
      <SEO 
        title="Create Account" 
        description="Join DealXpress today to start negotiating deals, tracking shipments, and growing your business in a smart marketplace." 
      />
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-50 dark:bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="glass rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
                DEAL<span className="text-indigo-600 dark:text-indigo-400">XPRESS</span>
              </span>
            </Link>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Join 10,000+ businesses globally today.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Business Email"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm"
                  required
                />
              </div>

              {/* Role Select */}
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={onChange}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm appearance-none cursor-pointer"
                >
                  <option value="user" className="bg-white dark:bg-gray-900">Individual User</option>
                  <option value="buyer" className="bg-white dark:bg-gray-900">Buyer / Importer</option>
                  <option value="supplier" className="bg-white dark:bg-gray-900">Supplier / Exporter (Seller)</option>
                  <option value="admin" className="bg-white dark:bg-gray-900">Platform Administrator</option>
                </select>
              </div>

              {/* Shop Details for Sellers */}
              {role === 'supplier' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-2"
                >
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName || ''}
                      onChange={onChange}
                      placeholder="Shop / Business Name"
                      className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber || ''}
                        onChange={onChange}
                        placeholder="GST Number"
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm text-sm"
                      />
                    </div>
                    <div className="relative group">
                      <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                      <select
                        name="businessCategory"
                        value={formData.businessCategory || ''}
                        onChange={onChange}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white shadow-sm appearance-none cursor-pointer text-sm"
                        required
                      >
                        <option value="">Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full py-5 text-lg rounded-2xl flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-[0.2em]">
                <span className="bg-white dark:bg-gray-950 px-4 text-gray-400 dark:text-gray-500 transition-colors">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  dispatch(googleLoginThunk(credentialResponse.credential));
                }}
                onError={() => {
                  toast.error('Google Sign-up Failed');
                }}
                useOneTap
                theme="outline"
                shape="pill"
                size="large"
              />
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-center gap-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              ISO 27001 SECURE PLATFORM
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
