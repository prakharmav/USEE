import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGamificationStore } from '../store/gamificationStore';

const AuthForm = ({ type }) => {
  const isLogin = type === 'login';
  const navigate = useNavigate();
  const { apiLogin, apiRegister, loading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    
    if (isLogin) {
      success = await apiLogin(email, password);
    } else {
      success = await apiRegister({ name, email, password });
      if (success) {
        // Trigger gamification XP burst for completing profile
        useGamificationStore.getState().logEvent('profile_complete');
      }
    }

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <main className="flex-grow flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      {/* Visual Section: Organic Editorialism */}
      <section className="hidden md:flex w-1/2 relative overflow-hidden bg-primary items-center justify-center p-12">
        {/* Background Pattern: Abstract Intelligence */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary-container blur-[100px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary-container blur-[80px]"></div>
        </div>
        {/* Content Card (Floating Editorial) */}
        <div className="relative z-10 max-w-lg text-left">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary">school</span>
            </div>
            <span className="text-3xl font-black tracking-tight text-white headline">Eduvion</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white headline leading-[1.1] mb-6 -tracking-wider">
            Your Global Academic <span className="text-secondary-fixed">Curator.</span>
          </h1>
          <p className="text-on-primary-container text-lg leading-relaxed mb-10 opacity-90">
            Navigate the complexities of international admissions with an AI-powered partner that understands your unique journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-primary-container/40 backdrop-blur-md border border-white/5">
              <span className="material-symbols-outlined text-secondary-fixed mb-2">verified_user</span>
              <p className="text-white font-bold headline">Visa Wizard</p>
              <p className="text-xs text-on-primary-container mt-1">98% Success Rate</p>
            </div>
            <div className="p-6 rounded-xl bg-primary-container/40 backdrop-blur-md border border-white/5">
              <span className="material-symbols-outlined text-secondary-fixed mb-2">account_balance</span>
              <p className="text-white font-bold headline">Top Uni Search</p>
              <p className="text-xs text-on-primary-container mt-1">2,000+ Partners</p>
            </div>
          </div>
          {/* Image Overlay: Breaking the Grid */}
          <div className="mt-12 relative h-48 w-full">
            <img alt="Happy students" className="absolute -right-8 top-0 w-64 h-40 object-cover rounded-2xl shadow-2xl rotate-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_A6POBhNwN0sRwA8i0uifsTlby3O0hrK-hAos4A8xCDB6SVXtbOiJaT_jrbchEhb_EpNZ3xBhmwQLzyujd4WvF7JdVK8wmeudHc3G1WkaBHowpSzRyssv2aTZoXXyZJcM6T-TZahMBEiI7dYsb68RGYfp7R80Gpukc7BhRHepJ68gqVmYyoblKacf5yJHdNQKjXa5XwSRnFvbWcFyEhBv3Gh53QwYFiodyS9JnpaCDyhlzPq9rG7cUCphF2bZRhDT28rJyjycwp0w"/>
            <img alt="Campus" className="absolute left-0 top-12 w-48 h-32 object-cover rounded-2xl shadow-2xl -rotate-2 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-DdvBYk-IikHFGuSlFh6JfKqPMMjk82mIMlOXZxnCukDKpTh9__upRgfHWWbiVJl5uTAlynXwo5-_CMCndYbplD2HcRDdwRP6cSpYPuPr5SzBtXXa5tgt8XVYNSakCZykbJsx7rJz3pzb7IcgVs1m7q5d8RY3YGo7Mas-I27DnT0CHbT6M_uvC899zGVMCvgnUozZkcJgpG12_FBotUtxSVBqSaLHUFkfrXZSgXEOanjjRvLyxIEciAneZBzdI-sZnmmwsRX7RdOu"/>
          </div>
        </div>
      </section>
      {/* Form Section: Focused Canvas */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-24 bg-surface">
        <div className="w-full max-w-md text-left">
          {/* Mobile Branding */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white">school</span>
            </div>
            <span className="text-2xl font-black text-primary headline">Eduvion</span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-on-surface headline">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-on-surface-variant mt-2">Begin your international career journey today.</p>
          </div>
          {/* Tabs */}
          <div className="flex p-1 bg-surface-container-low rounded-xl mb-8">
            <Link to="/login" className={`flex-1 py-2.5 text-sm transition-all duration-200 text-center rounded-lg ${isLogin ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
              Login
            </Link>
            <Link to="/register" className={`flex-1 py-2.5 text-sm transition-all duration-200 text-center rounded-lg ${!isLogin ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
              Sign Up
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm font-medium animate-shake">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface px-1">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">person</span>
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                    placeholder="Future Voyager" 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface px-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">alternate_email</span>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                  placeholder="voyager@eduvion.ai" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-on-surface">Password</label>
                {isLogin && <Link className="text-xs font-semibold text-secondary hover:underline" to="#">Forgot Password?</Link>}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">lock</span>
                <input 
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline hover:text-on-surface transition-colors" type="button">visibility</button>
              </div>
            </div>
            {!isLogin && (
              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" required />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  I agree to the <Link className="text-primary font-bold hover:underline" to="#">Terms of Service</Link> and acknowledge the AI processing of my data for university matching.
                </p>
              </div>
            )}
            <button 
              disabled={loading}
              className={`w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold headline rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login to Account' : 'Create My Account')}
            </button>
          </form>
          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface-container-highest"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-outline">
              <span className="bg-surface px-4">Or continue with</span>
            </div>
          </div>
          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-colors shadow-sm">
              <span className="text-sm font-medium text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-colors shadow-sm">
              <span className="text-sm font-medium text-on-surface">LinkedIn</span>
            </button>
          </div>
          <p className="text-center text-[10px] text-outline mt-12 px-8 uppercase tracking-widest leading-relaxed">
            Protected by Eduvion Intelligence Security • 2024
          </p>
        </div>
      </section>
    </main>
  );
};

export default AuthForm;
