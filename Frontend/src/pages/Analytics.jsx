import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    { label: 'Total Spending', value: '$124,500', trend: '+12%', isPositive: false, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Savings', value: '$18,240', trend: '+18%', isPositive: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Discount', value: '14.6%', trend: '+2.4%', isPositive: true, icon: PieChart, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Active Deals', value: '24', trend: '-4%', isPositive: false, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const categories = [
    { name: 'Electronics', value: 45, color: 'bg-indigo-500' },
    { name: 'Office Supplies', value: 25, color: 'bg-violet-500' },
    { name: 'Furniture', value: 20, color: 'bg-emerald-500' },
    { name: 'Others', value: 10, color: 'bg-gray-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Business Analytics</h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Get a comprehensive overview of your procurement performance.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Savings vs Spending Chart (Visual Representation) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Spending Overview</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="w-3 h-3 bg-indigo-500 rounded-full" /> Spending
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="w-3 h-3 bg-emerald-500 rounded-full" /> Savings
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 60, 35, 80, 55, 90, 70, 85, 40, 65, 50, 75].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="w-full max-w-[30px] bg-indigo-100 group-hover:bg-indigo-500 rounded-t-lg transition-all relative overflow-hidden"
                >
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val * 0.3}%` }}
                    className="absolute bottom-0 left-0 right-0 bg-emerald-500 opacity-80"
                   />
                </motion.div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Value: {val}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Category Distribution</h3>
          
          <div className="space-y-6">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700">{cat.name}</span>
                  <span className="font-black text-gray-900">{cat.value}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className={`h-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-900">Savings Insight</span>
            </div>
            <p className="text-xs text-indigo-700 font-medium leading-relaxed">
              Your savings on Electronics have increased by <strong>12.4%</strong> this month due to better negotiations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
