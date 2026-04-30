import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Negotiations from './pages/Negotiations';
import NegotiationRoom from './pages/NegotiationRoom';
import Delivery from './pages/Delivery';
import Analytics from './pages/Analytics';
import Contact from './pages/Contact';
import Account from './pages/Account';
import ForgotPassword from './pages/ForgotPassword';
import DashboardLayout from './components/layouts/DashboardLayout';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          className: 'mobile-toast',
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.85)',
            color: '#111827',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '24px',
            padding: '16px 24px',
            fontSize: '15px',
            fontWeight: '700',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            width: '90%',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/negotiations" element={<Negotiations />} />
          <Route path="/negotiation-room" element={<NegotiationRoom />} />
          <Route path="/negotiation-room/:id" element={<NegotiationRoom />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          {/* Redirect to marketplace by default for dashboard */}
          <Route path="/dashboard" element={<Navigate to="/marketplace" replace />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
