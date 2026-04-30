import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePieChart, Pie } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, Loader2, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Analytics = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/my');
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.amount || 0), 0);
  const activeNegotiations = 24; 
  
  const chartData = [
    { name: 'Jan', value: 4500 },
    { name: 'Feb', value: 5200 },
    { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 6100 },
    { name: 'May', value: 5900 },
    { name: 'Jun', value: totalRevenue > 0 ? totalRevenue : 7200 },
  ];

  const categoriesData = [
    { name: 'Electronics', value: 45, color: '#6366f1' },
    { name: 'Office', value: 25, color: '#8b5cf6' },
    { name: 'Furniture', value: 20, color: '#10b981' },
    { name: 'Others', value: 10, color: '#94a3b8' },
  ];

  const stats = [
    { label: 'Total Revenue', value: `$${(totalRevenue || 0).toLocaleString()}`, change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', value: orders.length.toString(), change: '+8.2%', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Deals', value: activeNegotiations.toString(), change: '+24.1%', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'New Users', value: '1,284', change: '-3.4%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Platform Analytics</h1>
          <p className="text-[15px] text-gray-500 font-medium">Real-time insights into your business performance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900">Revenue Overview</h3>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-500 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4F46E5" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-gray-900 mb-8">Category Distribution</h3>
          <div className="h-64 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {categoriesData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-bold text-gray-600">{cat.name}</span>
                </div>
                <span className="text-sm font-black text-gray-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 mb-8">Recent Transactions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.slice(0, 6).map((order) => (
            <div key={order.orderId} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200">
                  <img src={order.product.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-black text-gray-900 line-clamp-1">{order.product.name}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.orderId}</div>
                </div>
              </div>
              <div className="text-sm font-black text-emerald-600">+${order.amount || 0}</div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-sm font-bold text-gray-400">No recent transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
