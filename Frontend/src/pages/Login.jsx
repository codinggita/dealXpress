import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { login, reset, googleLogin as googleLoginThunk } from '../features/auth/authSlice';
import Button from '../components/common/Button';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

    if (isSuccess || user) {
      toast.success('Welcome back to DealXpress!');
      setTimeout(() => {
        navigate('/marketplace');
        dispatch(reset());
      }, 1500);
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
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-50 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="glass rounded-[3rem] p-8 md:p-12 shadow-2xl border-white/50 bg-white/40 backdrop-blur-xl">
          <div className="flex justify-between items-start mb-10">
            <Link to="/" className="p-3 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-indigo-600">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="text-right">
              <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
                  DEAL<span className="text-indigo-600">XPRESS</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 font-medium text-lg text-pretty">Enter your credentials to access your business dashboard.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email Address"
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
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" size="sm" className="text-sm font-bold text-indigo-600 hover:underline underline-offset-4">
                Forgot password?
              </Link>
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
                  Sign In to Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-[0.2em]">
                <span className="bg-white px-4 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  dispatch(googleLoginThunk(credentialResponse.credential));
                }}
                onError={() => {
                  toast.error('Google Login Failed');
                }}
                useOneTap
                theme="outline"
                shape="pill"
                size="large"
              />
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-50">
              <p className="text-gray-500 font-medium">
                Don't have an account yet?{' '}
                <Link to="/signup" className="text-indigo-600 font-black hover:underline underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-12 flex items-center justify-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            END-TO-END ENCRYPTED AUTH
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
