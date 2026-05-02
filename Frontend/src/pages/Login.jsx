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
import { useGoogleLogin } from '@react-oauth/google';
import SEO from '../components/common/SEO';

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

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(googleLoginThunk({ access_token: tokenResponse.access_token }));
    },
    onError: () => {
      toast.error('Google Login Failed');
    },
  });

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
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden">
      <SEO 
        title="Login" 
        description="Sign in to your DealXpress account to manage your negotiations, orders, and business dashboard." 
      />
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-50 dark:bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="glass rounded-[1.5rem] p-6 md:p-10 shadow-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl">
          <div className="flex justify-between items-start mb-6">
            <Link to="/" className="p-2.5 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-100 dark:border-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="text-right">
              <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
                  DEAL<span className="text-indigo-600 dark:text-indigo-400">XPRESS</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-base text-pretty">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white"
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
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" size="sm" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 text-base rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.99] transition-all"
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

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-[0.2em]">
                <span className="bg-white dark:bg-gray-900 px-4 text-[10px] text-gray-400 dark:text-gray-500 transition-colors">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                className="w-full py-3.5 px-6 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50/50 dark:hover:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all active:scale-[0.98] group shadow-sm"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="text-[#4285F4]"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="text-[#34A853]"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    className="text-[#FBBC05]"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="text-[#EA4335]"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="text-center mt-6 pt-4 border-t border-gray-50 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Don't have an account yet?{' '}
                <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            END-TO-END ENCRYPTED AUTH
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
