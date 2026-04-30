import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NegotiationCard from '../components/negotiations/NegotiationCard';

const Negotiations = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [negotiations, setNegotiations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyNegotiations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get((import.meta.env.VITE_BACKEND_URL || '') + '/api/negotiations/my', config);
        const formatted = res.data.map(item => ({
          id: item._id,
          product: {
            name: item.productData?.name || item.product?.name || 'Deleted Product',
            image: item.productData?.image || item.product?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200',
          },
          seller: item.seller?.name || 'Premium Seller',
          originalPrice: item.originalPrice,
          currentOffer: item.currentOffer,
          status: item.status,
          lastUpdated: new Date(item.updatedAt).toLocaleDateString(),
          messages: item.messages?.length || 0
        }));
        setNegotiations(formatted);
      } catch (err) {
        console.error("Failed to fetch negotiations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchMyNegotiations();
  }, [user]);

  const tabs = [
    { id: 'all', label: 'All Offers' },
    { id: 'action', label: 'Action Required', count: 1 },
    { id: 'pending', label: 'Pending', count: 1 },
    { id: 'completed', label: 'Completed' }
  ];

  const filteredData = negotiations.filter(item => {
    const matchesSearch = item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
                          
    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'action') return item.status === 'counter';
    if (activeTab === 'pending') return item.status === 'pending';
    if (activeTab === 'completed') return ['accepted', 'rejected'].includes(item.status);
    return true;
  });

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  const handleViewChat = (item) => {
    navigate(`/negotiation-room/${item.id}`, { state: { deal: item } });
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
