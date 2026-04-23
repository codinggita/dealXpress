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
import { register, reset } from '../features/auth/authSlice';
import Button from '../components/common/Button';

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
        navigate('/');
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-50 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="glass rounded-[3rem] p-8 md:p-12 shadow-2xl border-white/50 bg-white/40 backdrop-blur-xl">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
                DEAL<span className="text-indigo-600">XPRESS</span>
              </span>
            </Link>
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Create Account</h1>
            <p className="text-gray-500 font-medium">Join 10,000+ businesses globally today.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-900 shadow-sm"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Business Email"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-900 shadow-sm"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-900 shadow-sm"
                  required
                />
              </div>

              {/* Role Select */}
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={onChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-900 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="user">Individual User</option>
                  <option value="buyer">Buyer / Importer</option>
                  <option value="supplier">Supplier / Exporter</option>
                  <option value="admin">Platform Administrator</option>
                </select>
              </div>
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

            <div className="text-center mt-8">
              <p className="text-gray-500 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              ISO 27001 SECURE PLATFORM
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
