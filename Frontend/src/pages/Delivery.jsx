import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin,
  ExternalLink
} from 'lucide-react';

const StatusBadge = ({ status, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    red: 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[color] || colors.blue}`}>
      {status}
    </span>
  );
};

const Delivery = () => {
  const shipments = useSelector((state) => state.orders.items);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = shipments.filter(shipment => 
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.trackingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Delivery & Tracking</h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Monitor your shipments and manage logistics in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Track Order ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'In Transit', count: '12', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Delivered', count: '148', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Action Needed', count: '2', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm flex items-center gap-5"
          >
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-0.5">{stat.label}</div>
              <div className="text-3xl font-black text-gray-900">{stat.count}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shipment List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 px-1">Active Shipments</h2>
        
        {filteredShipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200/75 rounded-2xl p-5 hover:shadow-md transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Product Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <img src={shipment.product.image} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-1">{shipment.id}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{shipment.product.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{shipment.location}</span>
                  </div>
                </div>
              </div>

              {/* Status & Progress */}
              <div className="flex-1 space-y-3 px-0 lg:px-8">
                <div className="flex items-center justify-between mb-1">
                  <StatusBadge status={shipment.status} color={shipment.statusColor} />
                  <span className="text-xs font-bold text-gray-900">{shipment.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${shipment.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${
                      shipment.statusColor === 'emerald' ? 'bg-emerald-500' : 
                      shipment.statusColor === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}
                  />
                </div>
              </div>

              {/* Courier Info */}
              <div className="flex-1 lg:max-w-[200px]">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Courier & Tracking</div>
                <div className="text-sm font-bold text-gray-900">{shipment.courier}</div>
                <div className="text-xs font-medium text-gray-500">{shipment.trackingId}</div>
              </div>

              {/* Arrival */}
              <div className="lg:text-right lg:w-40">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Est. Arrival</div>
                <div className="text-sm font-black text-gray-900">{shipment.estDelivery}</div>
              </div>

              {/* Actions */}
              <div className="shrink-0">
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-gray-900/10 hover:shadow-indigo-600/20 group/btn">
                  Track
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Delivery;
