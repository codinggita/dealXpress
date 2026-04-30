import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, HelpCircle, Settings, X, MessageSquare, Info, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardNavbar = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const notifications = [
    { id: 1, title: 'New Offer Received', time: '5m ago', type: 'offer' },
    { id: 2, title: 'Price Accepted', time: '1h ago', type: 'success' },
    { id: 3, title: 'Welcome to DealXpress', time: '2h ago', type: 'info' }
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200/75 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search Bar - Hidden on extra small mobile, or shown as icon? For now, keep it with flex-1 */}
        <div className="hidden sm:block flex-1 min-w-[200px] md:min-w-[400px]">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search marketplace..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-[#F8F9FA] border border-gray-200/50 rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none placeholder:text-gray-400 text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Right Utilities */}
      <div className="flex items-center gap-0.5 md:gap-1.5 relative">
        <button 
          className="sm:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          onClick={() => navigate('/marketplace')}
        >
          <Search className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all relative cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <button 
          onClick={() => navigate('/account')}
          className="hidden md:flex p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="h-6 w-px bg-gray-200 mx-1 md:mx-2" />
        
        {/* Profile Avatar */}
        <button 
          onClick={() => navigate('/account')}
          className="flex items-center gap-3 pl-1 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white group-hover:shadow-md transition-all">
            DX
          </div>
        </button>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h4 className="font-black text-gray-900">Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 flex gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        notif.type === 'offer' ? 'bg-amber-50 text-amber-600' :
                        notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {notif.type === 'offer' ? <MessageSquare className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{notif.title}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {navigate('/negotiations'); setShowNotifications(false);}}
                  className="w-full py-3 bg-gray-50 text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  View all negotiations
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default DashboardNavbar;
