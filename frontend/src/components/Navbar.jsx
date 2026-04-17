import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border-2 border-primary/10 group-hover:border-primary/30 transition-all">
                <img 
                  alt={user?.name} 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwQj96QsaDTwHmV1pZXe7BXyeDw3AuFoJBj_g9bb2tgJ823KR5TI_ah6xL0_YpId6hTU6S7ofHUqbxRC7KoapsV6Ys9otuiJdqF5CobPdDXwhHLjehFth9kMQjyZnyWzE53haizsckXftTjGu9fGKqYkfKiCbZJwjzeXNWxHQLmKill_ExKVl7Y52oegt94cdN605waxC3u3Wn6Nh0B5wSCoEt7y1rUiiOSdl1ts99cukiAeb1E-1YtXMNpGuWtHDPwR-31C3ISdpz"
                />
              </div>
              <span className="hidden lg:block text-sm font-bold text-primary headline tracking-tight">{user?.name}</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 text-outline hover:text-error transition-colors rounded-full hover:bg-error-container/50"
              title="Logout"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-primary font-bold px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-primary text-on-primary px-5 py-2 rounded-xl font-bold border border-transparent hover:bg-primary/90 transition-colors shadow-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
