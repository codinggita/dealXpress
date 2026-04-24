import React from 'react';
import { Search, Bell, HelpCircle, Settings } from 'lucide-react';

const DashboardNavbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200/75 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search marketplace..." 
            className="w-full bg-[#F8F9FA] border border-gray-200/50 rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </div>

      {/* Right Utilities */}
      <div className="flex items-center gap-1.5">
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="h-6 w-px bg-gray-200 mx-2" />
        
        {/* Profile Avatar */}
        <button className="flex items-center gap-3 pl-1 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white group-hover:shadow-md transition-all">
            DX
          </div>
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
