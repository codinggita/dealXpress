import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import DealCard from '../components/dashboard/DealCard';

const Marketplace = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPrice, setSelectedPrice] = useState('Any Price');

  const categories = ['All Categories', ...new Set(deals.map(deal => deal.category).filter(Boolean))];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (deal.category && deal.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || deal.category === selectedCategory;
    
    let matchesPrice = true;
    if (selectedPrice !== 'Any Price') {
      const priceVal = parseFloat(deal.price.replace('$', ''));
      if (selectedPrice === 'Under $50') matchesPrice = priceVal < 50;
      else if (selectedPrice === '$50 - $100') matchesPrice = priceVal >= 50 && priceVal <= 100;
      else if (selectedPrice === 'Over $100') matchesPrice = priceVal > 100;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        // Fetch from all sources in parallel
        const [localRes, api1Res, api2Res] = await Promise.allSettled([
          fetch((import.meta.env.VITE_BACKEND_URL || '') + '/api/products').then(res => res.ok ? res.json() : []),
          fetch('https://fakestoreapi.com/products').then(res => res.json()),
          fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json').then(res => res.json())
        ]);
        
        let allDeals = [];

        // 1. Process Local Data
        if (localRes.status === 'fulfilled' && Array.isArray(localRes.value)) {
          const formattedLocal = localRes.value.map(item => ({
            id: item._id,
            title: item.name,
            category: item.category,
            price: `$${(item.price || 0).toFixed(2)}`,
            image: item.image,
            badge: item.badge,
            sellerId: item.seller,
            type: 'price'
          }));
          allDeals = [...allDeals, ...formattedLocal];
        }

        
        // 2. Process FakeStoreAPI Data
        if (api1Res.status === 'fulfilled' && Array.isArray(api1Res.value)) {
          const formattedDeals1 = api1Res.value.map(item => ({
            id: `fs-${item.id}`,
            title: item.title,
            category: item.category,
            price: `$${(item.price || 0).toFixed(2)}`,
            image: item.image,
            badge: item.rating?.rate >= 4.5 ? 'Top Rated' : 'New',
            type: 'price'
          }));
          allDeals = [...allDeals, ...formattedDeals1];
        }

        // 3. Process Kolzsticks API Data
        if (api2Res.status === 'fulfilled' && Array.isArray(api2Res.value)) {
          const formattedDeals2 = api2Res.value.map(item => ({
            id: `kz-${item.id}`,
            title: item.name,
            category: item.category,
            price: `$${(item.priceCents / 100).toFixed(2)}`,
            image: item.image,
            badge: item.rating?.stars >= 4.5 ? 'Premium' : 'Trending',
            type: 'price'
          }));
          allDeals = [...allDeals, ...formattedDeals2];
        }

        setDeals(allDeals);
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

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-3.5 pr-9 py-2 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all cursor-pointer outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="appearance-none pl-3.5 pr-9 py-2 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all cursor-pointer outline-none"
              >
                {['Any Price', 'Under $50', '$50 - $100', 'Over $100'].map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="text-[13px] font-medium text-gray-500 px-4">
          Showing {filteredDeals.length} results
        </div>
      </div>

      {/* Deals Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/75 shadow-sm">
          <p className="text-gray-900 font-bold text-lg mb-1">No products found for "{searchQuery}"</p>
          <p className="text-gray-500 text-sm">Try adjusting your search to find what you are looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
