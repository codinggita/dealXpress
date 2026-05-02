import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin,
  ExternalLink,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SEO from '../components/common/SEO';

const Delivery = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusProgress = (status) => {
    switch (status) {
      case 'placed': return 15;
      case 'packed': return 40;
      case 'shipped': return 65;
      case 'out_for_delivery': return 85;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 10;
    }
  };

  const getStatusColor = (status) => {
    if (status === 'delivered') return 'text-emerald-600';
    if (status === 'cancelled') return 'text-red-600';
    return 'text-indigo-600';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get((import.meta.env.VITE_BACKEND_URL || '') + '/api/orders/my', config);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => {
    const orderIdMatch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const itemMatch = order.orderItems?.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return orderIdMatch || itemMatch;
  });

  const stats = [
    { label: 'In Transit', count: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length, icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', count: orders.length, icon: Package, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 transition-colors duration-300">
      <SEO 
        title="Delivery Tracking" 
        description="Track your active shipments and orders in real-time on DealXpress. Monitor every step of your delivery." 
      />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">Delivery Tracking</h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium">Track your active shipments in real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all cursor-pointer">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4"
          >
            <div className={`w-14 h-14 ${stat.bg} dark:bg-opacity-10 rounded-2xl flex items-center justify-center`}>
              <stat.icon className={`w-7 h-7 ${stat.color} dark:opacity-90`} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">{stat.label}</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.count}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
              <motion.div 
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-all border-l-4 border-l-indigo-500"
              >
                <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Product Info */}
                  <div className="flex items-center gap-5 lg:w-1/3">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0 shadow-inner relative">
                      <img 
                        src={order.orderItems?.[0]?.image || '/placeholder.png'} 
                        alt={order.orderItems?.[0]?.name} 
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" 
                      />
                      {order.orderItems?.length > 1 && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-white text-xs font-black">
                          +{order.orderItems.length - 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-1">{order.orderId}</div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">
                        {order.orderItems?.[0]?.name || 'Order Details'}
                      </h3>
                      {order.orderItems?.length > 1 && (
                        <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-widest">
                          & {order.orderItems.length - 1} other items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Status
                      </div>
                      <div className={`text-sm font-black ${getStatusColor(order.status)} uppercase`}>
                        {order.status.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Truck className="w-3 h-3" /> Courier
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{order.deliveryDetails?.courierPartner || 'Pending'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Destination
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Package className="w-3 h-3" /> Est. Delivery
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {order.deliveryDetails?.estimatedDeliveryDate ? new Date(order.deliveryDetails.estimatedDeliveryDate).toLocaleDateString() : 'TBD'}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-800 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all shadow-lg shadow-gray-900/10 hover:shadow-indigo-600/20 group/btn cursor-pointer">
                      Track Details
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-8 pb-8">
                  <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className={getStatusProgress(order.status) >= 15 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-600'}>Ordered</span>
                    <span className={getStatusProgress(order.status) >= 65 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-600'}>Shipped</span>
                    <span className={getStatusProgress(order.status) >= 85 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-600'}>Out for Delivery</span>
                    <span className={getStatusProgress(order.status) === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'}>Delivered</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${getStatusProgress(order.status)}%` }}
                      className={`h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-lg`}
                    />
                  </div>
                </div>
              </motion.div>
          ))
        ) : (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 border-dashed transition-colors duration-300">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Package className="w-10 h-10 text-indigo-300 dark:text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No active shipments</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">
              You haven't completed any deals yet. Start negotiating to see your shipments here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivery;
