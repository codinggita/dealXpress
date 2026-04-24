import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import DashboardNavbar from '../dashboard/DashboardNavbar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar - Fixed on desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNavbar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
