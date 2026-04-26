import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import NegotiationCard from '../components/negotiations/NegotiationCard';

// Mock Data
const MOCK_NEGOTIATIONS = [
  {
    id: 'NEG-1042',
    product: {
      name: 'MacBook Pro 16" M3 Max (Sealed)',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200',
    },
    seller: 'TechWholesale Inc.',
    originalPrice: 3499.00,
    currentOffer: 3150.00,
    status: 'counter',
    lastUpdated: '2 hours ago',
    messages: 3
  },
  {
    id: 'NEG-1041',
    product: {
      name: 'Herman Miller Aeron Chair',
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=200',
    },
    seller: 'ErgoSolutions',
    originalPrice: 1250.00,
    currentOffer: 1100.00,
    status: 'pending',
    lastUpdated: '5 hours ago',
    messages: 1
  },
  {
    id: 'NEG-1039',
    product: {
      name: 'Sony A7IV Mirrorless Camera Body',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200',
    },
    seller: 'CameraBox NYC',
    originalPrice: 2498.00,
    currentOffer: 2300.00,
    status: 'accepted',
    lastUpdated: '1 day ago',
    messages: 4
  },
  {
    id: 'NEG-1035',
    product: {
      name: 'Samsung 49" Odyssey G9 Monitor',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=200',
    },
    seller: 'PixelPerfect Displays',
    originalPrice: 1399.00,
    currentOffer: 1000.00,
    status: 'rejected',
    lastUpdated: '2 days ago',
    messages: 2
  }
];

const Negotiations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Offers' },
    { id: 'action', label: 'Action Required', count: 1 },
    { id: 'pending', label: 'Pending', count: 1 },
    { id: 'completed', label: 'Completed' }
  ];

  const filteredData = MOCK_NEGOTIATIONS.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'action') return item.status === 'counter';
    if (activeTab === 'pending') return item.status === 'pending';
    if (activeTab === 'completed') return ['accepted', 'rejected'].includes(item.status);
    return true;
  });

  const handleViewChat = (item) => {
    navigate('/negotiation-room', { state: { deal: item } });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Negotiations</h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Manage your ongoing offers and track your deals.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search offers..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                  {tab.count}
                </span>
              )}
            </div>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {filteredData.map((item, index) => (
          <NegotiationCard 
            key={item.id} 
            item={item} 
            index={index} 
            onViewChat={handleViewChat} 
          />
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
              <MessageSquare className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No negotiations found</h3>
            <p className="text-gray-500 text-sm">There are no offers matching this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Negotiations;
