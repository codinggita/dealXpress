import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Truck, MapPin } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Tag,
      title: "Make an Offer",
      desc: "Love a product but want a better price? Negotiate directly with sellers to grab the best deal instantly.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Truck,
      title: "Fast & Easy Delivery",
      desc: "Get your favorite items delivered safely and straight to your doorstep with our trusted shipping partners.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: MapPin,
      title: "Live Order Tracking",
      desc: "Know exactly where your package is. Track your order in real-time from the warehouse to your home.",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Shop Smart & Easy</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Everything you need to find great products, negotiate prices, and get them delivered fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
