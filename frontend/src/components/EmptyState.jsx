import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon = 'inbox', 
  title = 'No Items Found', 
  description = 'There is currently nothing to display here.',
  actionText = null,
  actionLink = null,
  onClick = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center w-full h-full min-h-[300px] bg-surface-container-lowest/50 rounded-2xl border border-dashed border-outline-variant/30">
      <div className="w-20 h-20 bg-secondary-container/30 rounded-full flex items-center justify-center mb-6 text-secondary">
        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-2 font-headline">{title}</h3>
      <p className="text-on-surface-variant max-w-sm mb-8">{description}</p>
      
      {actionText && actionLink ? (
        <Link 
          to={actionLink} 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-fixed hover:text-primary transition-colors shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {actionText}
        </Link>
      ) : actionText && onClick ? (
        <button 
          onClick={onClick}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-fixed hover:text-primary transition-colors shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
