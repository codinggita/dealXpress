import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import DealCard from '../components/dashboard/DealCard';

const Marketplace = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const formattedDeals = data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: `$${item.price.toFixed(2)}`,
          image: item.image,
          badge: item.rating?.rate >= 4.5 ? 'Top Rated' : 'New',
          type: 'price'
        }));
        setDeals(formattedDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Marketplace</h1>
        <p className="text-[15px] text-gray-500 font-medium">
          Discover and negotiate premium B2B assets and surplus inventory.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 rounded-xl border border-gray-200/75 flex flex-wrap items-center justify-between gap-4 shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 border-r border-gray-200">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-[13px] font-semibold text-gray-700">Filters</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All Categories', 'Any Price', 'Any Condition'].map((filter) => (
              <button 
                key={filter}
                className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all"
              >
                {filter}
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="text-[13px] font-medium text-gray-500 px-4">
          Showing {deals.length} results
        </div>
      </div>

      {/* Deals Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
