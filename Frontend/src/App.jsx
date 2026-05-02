import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './routes/ProtectedRoute';
import { trackPageView } from './utils/analytics';

// ─────────────────────────────────────────────
// Code Splitting — Lazy-loaded Routes
// ─────────────────────────────────────────────
const LandingPage     = lazy(() => import('./pages/LandingPage'));
const SignUp          = lazy(() => import('./pages/SignUp'));
const Login           = lazy(() => import('./pages/Login'));
const ForgotPassword  = lazy(() => import('./pages/ForgotPassword'));
const Marketplace     = lazy(() => import('./pages/Marketplace'));
const Negotiations    = lazy(() => import('./pages/Negotiations'));
const NegotiationRoom = lazy(() => import('./pages/NegotiationRoom'));
const Delivery        = lazy(() => import('./pages/Delivery'));
const Analytics       = lazy(() => import('./pages/Analytics'));
const Contact         = lazy(() => import('./pages/Contact'));
const Account         = lazy(() => import('./pages/Account'));
const Checkout        = lazy(() => import('./pages/Checkout'));
const DashboardLayout = lazy(() => import('./components/layouts/DashboardLayout'));

// ─────────────────────────────────────────────
// Route-level Loading Fallback
// ─────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
    <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
  </div>
);

// ─────────────────────────────────────────────
// GA4 Page Tracking Component
// ─────────────────────────────────────────────
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);
  return null;
};

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
      {/* GA4 Page Tracking */}
      <RouteTracker />

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
            iconTheme: { primary: '#10B981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />

      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ── Public Dashboard-style Routes (No Login Required) ── */}
            <Route element={<DashboardLayout />}>
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* ── Protected Dashboard Routes (Login Required) ── */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/negotiations" element={<Negotiations />} />
              <Route path="/negotiation-room" element={<NegotiationRoom />} />
              <Route path="/negotiation-room/:id" element={<NegotiationRoom />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Navigate to="/marketplace" replace />} />
            </Route>

            {/* ── Catch-all 404 ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
}

export default App;
