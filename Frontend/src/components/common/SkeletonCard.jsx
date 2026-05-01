import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-100 dark:bg-gray-800" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
      <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
      <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded w-full mt-4" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(count)].map((_, i) => <SkeletonCard key={i} />)}
  </div>
);
