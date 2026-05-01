import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MessageSquare, Loader2, ExternalLink, ChevronRight, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import SEO from '../components/common/SEO';

const Negotiations = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [negotiations, setNegotiations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyNegotiations = async () => {
      try {
        const res = await axiosInstance.get('/api/negotiations/my');
        const formatted = res.data.map(item => ({
          id: item._id,
          productName: item.productData?.name || item.product?.name || 'Deleted Product',
          productImage: item.productData?.image || item.product?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200',
          seller: item.seller?.name || 'Premium Seller',
          currentOffer: item.currentOffer,
          status: item.status,
        }));
        setNegotiations(formatted);
      } catch (err) {
        console.error("Failed to fetch negotiations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyNegotiations();
  }, [user]);

  const filteredData = negotiations.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>;

  return (
    <div className="space-y-6 pb-10 max-w-full">
      <SEO title="My Negotiations" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Active Negotiations</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your active deals and offers in real-time.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search your deals..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-bottom border-gray-100 dark:border-gray-800">
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Seller</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Last Offer</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              <AnimatePresence>
                {filteredData.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0 shadow-sm">
                          <img src={item.productImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-gray-900 dark:text-white truncate text-sm">{item.productName}</span>
                          <span className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter">ID: {item.id.slice(-8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.seller}</span>
                        <span className="text-[11px] text-gray-400">Verified Seller</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-base font-black text-gray-900 dark:text-white">${item.currentOffer?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        item.status === 'accepted' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                        : 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => navigate(`/negotiation-room/${item.id}`)}
                        className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all shadow-sm group/btn"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold">No negotiations found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Negotiations;
