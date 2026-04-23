import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-indigo-600 w-8 h-8" />
              <span className="text-xl font-black tracking-tighter">DEALXPRESS</span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              The modern standard for global commerce. Secure, fast, and transparent.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Product</h4>
            <ul className="flex flex-col gap-4 text-gray-500 font-bold">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Company</h4>
            <ul className="flex flex-col gap-4 text-gray-500 font-bold">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-gray-500 font-medium mb-4">Stay updated with the latest in trade.</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Email" className="bg-white border border-gray-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none w-full" />
              <Button className="px-4 py-2 rounded-xl"><ArrowRight className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-sm">© 2026 DealXpress Inc. All rights reserved.</p>
          <div className="flex gap-8 text-gray-400 font-bold text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Dribbble</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
