import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  MousePointer2,
  Users,
  CreditCard,
  Target,
  Loader2
} from 'lucide-react';

// Modular Components (Divided into 3 as requested)
import Navbar from '../components/Landing/Navbar';
import Features from '../components/Landing/Features';
import Footer from '../components/Landing/Footer';

// Common Components
import Button from '../components/common/Button';

// --- Internal Components (The rest remains here) ---

import Spline from '@splinetool/react-spline';
import { Suspense, useState } from 'react';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Hero = () => {
  const [splineError, setSplineError] = useState(false);

  const SplineFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10 text-indigo-600" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">Premium 3D Experience</h3>
        <p className="text-gray-500 text-sm font-medium">Interactive visualization is loading or temporarily unavailable.</p>
      </div>
    </div>
  );

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                SHOPPING REVOLUTION
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-[1.05]">
              Shop Smart.<br />
              <span className="text-gradient">Save More.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-xl mb-12 font-medium leading-relaxed">
              Discover amazing products, negotiate directly for the best price, 
              and get fast delivery straight to your door.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-10">
              <Button to="/signup" className="w-full sm:w-auto px-10 py-5 text-lg rounded-2xl shadow-xl shadow-indigo-200">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto px-10 py-5 text-lg rounded-2xl">
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 text-gray-500 font-medium">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <span className="text-sm"><strong className="text-gray-900">2.5k+</strong> users joined this week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[500px] lg:h-[600px] w-full"
          >
            {/* Spline 3D Scene with Robust Error Handling */}
            <div className="absolute inset-0 z-0 rounded-[3rem] overflow-hidden bg-indigo-50/30 border border-indigo-100/50">
              <ErrorBoundary fallback={<SplineFallback />}>
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
                  <Spline 
                    scene="https://prod.spline.design/kZ6uO6uE7MBjHpwW/scene.splinecode" 
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
            
            {/* Floating UI Elements over 3D */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-4 glass p-4 rounded-2xl shadow-2xl border-white/50 w-48 hidden md:block z-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase">Current Offer</div>
              </div>
              <div className="text-xl font-black text-gray-900">$1,250.00</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ ACCEPTED BY SELLER</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 -left-8 glass p-4 rounded-2xl shadow-2xl border-white/50 w-56 hidden md:block z-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase">Savings Tracked</div>
              </div>
              <div className="text-xl font-black text-gray-900">$18,240.50</div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full w-3/4" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  const steps = [
    { icon: Users, title: "Browse", desc: "Explore thousands of products from trusted sellers." },
    { icon: MousePointer2, title: "Make Offer", desc: "Spot something you like? Make an offer and get a better deal instantly." },
    { icon: CreditCard, title: "Delivery", desc: "Pay securely and track your order right to your doorstep." }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Three Steps to Success</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Shopping made simple. We've made it easier than ever to get exactly what you want at the price you want.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10">
              <div className="mb-10 relative inline-block">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center border border-gray-100 relative z-10">
                  <step.icon className="w-10 h-10 text-indigo-600" />
                </div>
                <div className="absolute -top-6 -right-6 text-8xl font-black text-gray-100/80 -z-10">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">{step.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-100 to-transparent z-0" />
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden bg-indigo-600 py-24 px-8 md:px-20 text-center shadow-2xl shadow-indigo-200"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-full h-full -z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-400/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-400/20 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight">
              Ready to Grab <br className="hidden md:block" /> the Best Deal?
            </h2>
            <p className="text-indigo-100 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium">
              Join thousands of smart shoppers and start saving today. 
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button to="/signup" className="w-full sm:w-auto !bg-white !text-indigo-600 hover:!bg-indigo-50 px-12 py-6 text-xl shadow-2xl shadow-indigo-800/20">
                Explore Deals
              </Button>
              <div className="flex items-center gap-2 text-white/80 font-bold tracking-wide">
                <ShieldCheck className="w-6 h-6" />
                100% SECURE CHECKOUT
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Page Component ---

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
