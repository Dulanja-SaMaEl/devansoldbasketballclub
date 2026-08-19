import React from 'react';

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-devan-dark-card border border-stone-800 rounded-lg p-6 space-y-4">
          <div className="h-40 bg-stone-800 rounded w-full"></div>
          <div className="h-4 bg-stone-800 rounded w-1/3"></div>
          <div className="h-6 bg-stone-800 rounded w-3/4"></div>
          <div className="h-4 bg-stone-800 rounded w-full"></div>
          <div className="h-4 bg-stone-800 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
