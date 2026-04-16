import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 mt-auto flex flex-col md:flex-row justify-between items-center bg-[#f4f3f7] dark:bg-slate-900 shadow-inner">
      <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
        <span className="text-lg font-bold text-[#002045] dark:text-white mb-2">Eduvion</span>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs text-center md:text-left">© 2024 Eduvion AI. Empowering International Ambitions.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        <Link to="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#002045] dark:hover:text-white transition-opacity duration-200">Privacy Policy</Link>
        <Link to="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#002045] dark:hover:text-white transition-opacity duration-200">Terms of Service</Link>
        <Link to="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#002045] dark:hover:text-white transition-opacity duration-200">Help Center</Link>
        <Link to="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#002045] dark:hover:text-white transition-opacity duration-200">Contact Support</Link>
      </div>
    </footer>
  );
};

export default Footer;
