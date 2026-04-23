import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Identity",
      desc: "Every business on our platform undergoes a rigorous multi-step verification process.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      desc: "No more waiting for weeks. Execute payments and settle accounts in real-time.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Globe,
      title: "Global Logistics",
      desc: "Built-in tracking and management for international shipping and customs.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Lock,
      title: "Smart Escrow",
      desc: "Funds are only released once both parties fulfill their contractual obligations.",
      color: "bg-violet-100 text-violet-600"
    }
  ];

  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Built for Scale</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Powerful tools to help you manage global trade with confidence and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6 shadow-lg`}>
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
