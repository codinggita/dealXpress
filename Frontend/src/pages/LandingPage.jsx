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
  Target
} from 'lucide-react';

// Modular Components (Divided into 3 as requested)
import Navbar from '../components/Landing/Navbar';
import Features from '../components/Landing/Features';
import Footer from '../components/Landing/Footer';

// Common Components
import Button from '../components/common/Button';

// --- Internal Components (The rest remains here) ---

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Discover amazing products, negotiate directly for the best price, 
            and get fast delivery straight to your door.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button to="/signup" className="w-full sm:w-auto px-10 py-5 text-lg rounded-2xl">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto px-10 py-5 text-lg rounded-2xl">
              Book a Demo
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass rounded-[2.5rem] p-4 shadow-2xl border-white/50">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 aspect-[16/9] relative shadow-inner">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white/50" />
               <div className="absolute top-0 left-0 w-full h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-amber-400" />
                   <div className="w-3 h-3 rounded-full bg-emerald-400" />
                 </div>
               </div>
               <div className="pt-20 px-8 grid grid-cols-3 gap-6 relative z-10">
                 {/* Mock Product Cards */}
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-36 rounded-2xl bg-white border border-gray-200 shadow-sm p-3 flex flex-col">
                     <div className="w-full h-16 bg-indigo-50/50 rounded-xl mb-3" />
                     <div className="w-2/3 h-3 bg-gray-200 rounded-full mb-2" />
                     <div className="w-1/3 h-3 bg-gray-100 rounded-full mt-auto" />
                   </div>
                 ))}
                 {/* Mock Bottom Section (Table or large card) */}
                 <div className="col-span-3 h-48 rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex flex-col">
                    <div className="w-48 h-4 bg-gray-200 rounded-full mb-4" />
                    <div className="flex-1 w-full bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                       <div className="w-1/2 h-2 bg-gray-200 rounded-full" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Floating Element */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 -right-12 hidden lg:block glass p-6 rounded-3xl shadow-2xl border-white/80 w-72"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="text-emerald-600 w-7 h-7" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Secure Payments</div>
                <div className="text-xl font-black text-gray-900">Verified Sellers</div>
              </div>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 2, delay: 1 }}
                className="bg-emerald-500 h-full"
              />
            </div>
          </motion.div>
        </motion.div>
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
