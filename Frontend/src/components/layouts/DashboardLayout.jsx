import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import DashboardNavbar from '../dashboard/DashboardNavbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
