import React from 'react';

const GlobalLoader = () => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center min-h-[60vh] bg-surface w-full p-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl animate-pulse">rocket_launch</span>
        </span>
      </div>
      <h3 className="mt-6 text-xl font-bold text-primary animate-pulse">Orbiting...</h3>
      <p className="text-sm text-on-surface-variant mt-2 max-w-sm text-center">
        Gathering your planetary metrics and fetching the requested views.
      </p>
    </div>
  );
};

export default GlobalLoader;
