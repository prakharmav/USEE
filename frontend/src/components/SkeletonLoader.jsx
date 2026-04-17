import React from 'react';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'list') {
    return (
      <div className="w-full space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 border border-outline-variant/10 rounded-xl bg-surface-container-lowest">
            <div className="w-16 h-16 rounded-lg bg-surface-container-high"></div>
            <div className="flex-1 space-y-3 py-2">
              <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
              <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className="w-full space-y-6 animate-pulse p-4">
        <div className="flex gap-4 justify-end">
          <div className="h-10 bg-primary/20 rounded-t-xl rounded-bl-xl w-1/3"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0"></div>
          <div className="space-y-2 w-1/2">
            <div className="h-4 bg-surface-container-high rounded w-full"></div>
            <div className="h-4 bg-surface-container-high rounded w-5/6"></div>
            <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Default block card
  return (
    <div className="w-full p-6 animate-pulse bg-surface-container-lowest border border-outline-variant/10 rounded-xl">
       <div className="w-12 h-12 rounded-full bg-surface-container-high mb-4"></div>
       <div className="h-5 bg-surface-container-high rounded w-1/2 mb-3"></div>
       <div className="h-4 bg-surface-container-high rounded w-full mb-2"></div>
       <div className="h-4 bg-surface-container-high rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonLoader;
