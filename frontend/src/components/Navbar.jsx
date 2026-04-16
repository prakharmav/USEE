import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItemClass = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-[#006b5f] dark:text-[#76f4e0] font-bold transition-colors";
    }
    return "text-[#1a1c1e] dark:text-slate-400 hover:text-[#006b5f] dark:hover:text-[#76f4e0] transition-colors font-medium";
  };

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-[#faf9fd] dark:bg-slate-950 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-[#002045] dark:text-[#043669] cursor-pointer">menu</span>
        <Link to="/" className="text-2xl font-black tracking-tight text-[#002045] dark:text-white">Eduvion</Link>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        <Link to="/" className={navItemClass('/')}>Home</Link>
        <Link to="/search" className={navItemClass('/search')}>University Search</Link>
        <Link to="/loans" className={navItemClass('/loans')}>Loans</Link>
        <Link to="/predict" className={navItemClass('/predict')}>Predictor</Link>
        <Link to="/roi" className={navItemClass('/roi')}>ROI</Link>
        <Link to="/saved" className={navItemClass('/saved')}>Saved</Link>
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-primary font-bold px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors">
            Login
          </Link>
          <Link to="/register" className="bg-primary text-on-primary px-5 py-2 rounded-xl font-bold border border-transparent hover:bg-primary/90 transition-colors shadow-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
