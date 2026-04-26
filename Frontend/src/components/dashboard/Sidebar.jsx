import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Handshake, 
  Truck, 
  BarChart3, 
  Plus, 
  HelpCircle, 
  UserCircle
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Marketplace', path: '/marketplace' },
    { icon: Handshake, label: 'Negotiations', path: '/negotiations' },
    { icon: Truck, label: 'Delivery Tracking', path: '/delivery' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ];

  const footerItems = [
    { icon: HelpCircle, label: 'Support', path: '/support' },
    { icon: UserCircle, label: 'Account', path: '/account' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200/75 flex flex-col h-screen sticky top-0 hidden lg:flex">
      {/* Logo Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-black text-indigo-600 tracking-tighter">DealXpress</span>
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Enterprise SaaS</span>
      </div>

      {/* Action Button */}
      <div className="px-4 mb-6">
        <button className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          New Offer
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
              ${isActive 
                ? 'bg-indigo-50/80 text-indigo-700 font-semibold shadow-sm ring-1 ring-indigo-100/50' 
                : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon className={`w-5 h-5 ${item.path === '/marketplace' ? 'text-indigo-600' : ''} transition-colors`} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer Links */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        {footerItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <item.icon className="w-5 h-5 text-gray-400" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
