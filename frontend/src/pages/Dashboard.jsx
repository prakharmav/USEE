import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div className="flex flex-col md:flex-row flex-grow w-full bg-surface min-h-[calc(100vh-80px)]">
      {/* NavigationDrawer (Sidebar) */}
      <aside className="hidden lg:flex w-80 flex-col pt-8 px-6 bg-white dark:bg-slate-900 border-r border-[#efedf1] dark:border-slate-800">
        <div className="flex items-center gap-4 mb-10 px-2">
          <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
            <img 
              alt="Student Portrait" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwQj96QsaDTwHmV1pZXe7BXyeDw3AuFoJBj_g9bb2tgJ823KR5TI_ah6xL0_YpId6hTU6S7ofHUqbxRC7KoapsV6Ys9otuiJdqF5CobPdDXwhHLjehFth9kMQjyZnyWzE53haizsckXftTjGu9fGKqYkfKiCbZJwjzeXNWxHQLmKill_ExKVl7Y52oegt94cdN605waxC3u3Wn6Nh0B5wSCoEt7y1rUiiOSdl1ts99cukiAeb1E-1YtXMNpGuWtHDPwR-31C3ISdpz"
            />
          </div>
          <div>
            <h3 className="text-[#002045] dark:text-white font-bold">{user?.name || 'Future Voyager'}</h3>
            <p className="text-xs text-slate-500 capitalize">{user?.journeyStage || 'exploration'} • International Applicant</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          <Link to="/career" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#f4f3f7] dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">explore</span>
            <span className="font-medium">Career Navigator</span>
          </Link>
          <Link to="/predict" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#f4f3f7] dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-medium">Admission Predictor</span>
          </Link>
          <Link to="/search" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#f4f3f7] dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">account_balance</span>
            <span className="font-medium">University Search</span>
          </Link>
          <Link to="/roi" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#f4f3f7] dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">calculate</span>
            <span className="font-medium">ROI Calculator</span>
          </Link>
          <Link to="/saved" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#f4f3f7] dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">bookmark</span>
            <span className="font-medium">Saved Unis</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#006b5f]/10 text-[#006b5f] rounded-lg transition-all duration-300 font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>timeline</span>
            <span className="font-medium">My Journey</span>
          </Link>
        </nav>
        
        <div className="mt-auto mb-10 p-6 bg-surface-container-low rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Gamification</span>
            <span className="text-secondary font-bold">Level 1</span>
          </div>
          <div className="h-2 w-full bg-outline-variant/20 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-1/4"></div>
          </div>
          <p className="text-[10px] mt-2 text-on-surface-variant">Complete profile to level up</p>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 py-8 lg:py-12 px-6 md:px-12 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-2 font-headline">
                Welcome back, {user?.name?.split(' ')[0] || 'Voyager'}.
              </h1>
              <p className="text-on-surface-variant text-lg">Your global education journey is underway.</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-secondary uppercase mb-2 tracking-widest">Current Milestone</span>
              <div className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-full font-bold flex items-center gap-2 capitalize">
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
                {user?.journeyStage || 'Exploration'}
              </div>
            </div>
          </div>

          {/* Bento Grid Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full text-left">
            
            {/* Profile Completeness Card (Large) */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group border border-outline-variant/10 shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-primary mb-6 font-headline">Profile Completeness</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-on-surface-variant font-medium">Identity & Documents</span>
                      <span className="text-primary font-bold tracking-tighter">100%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-low rounded-full">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2 pt-2">
                      <span className="text-on-surface-variant font-medium">Academic Records</span>
                      <span className="text-primary font-bold tracking-tighter">85%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-low rounded-full">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2 pt-2">
                      <span className="text-on-surface-variant font-medium">Statement of Purpose</span>
                      <span className="text-secondary font-bold uppercase text-xs tracking-widest">Pending</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-low rounded-full">
                      <div className="h-full bg-secondary/30 rounded-full w-[20%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-outline-variant/10 relative z-10 flex justify-start">
                <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-[0.98] transition-all">
                  Complete Documents <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Quick Actions Stack */}
            <div className="md:col-span-4 grid grid-cols-1 gap-6">
              <Link to="/career" className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container-high transition-colors cursor-pointer flex items-center gap-4 group border border-outline-variant/5">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary font-headline">Career Navigator</h3>
                  <p className="text-xs text-on-surface-variant font-medium opacity-80">Find your path with AI</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
              </Link>
              
              <Link to="/chat" className="bg-secondary-container rounded-xl p-6 hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-white/50 flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-3xl">chat_bubble</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-secondary-container font-headline">AI Chat Advisor</h3>
                  <p className="text-xs text-on-secondary-container/70 font-medium tracking-tight">Instant answers 24/7</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-on-secondary-container/40">chevron_right</span>
              </Link>
              
              <Link to="/loans" className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container-high transition-colors cursor-pointer flex items-center gap-4 group border border-outline-variant/5">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary font-headline">Apply for Loan</h3>
                  <p className="text-xs text-on-surface-variant font-medium opacity-80">Fast tracking approval</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
              </Link>
            </div>

            {/* Recent Activity Feed (Wide) */}
            <div className="md:col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
              <h2 className="text-2xl font-bold text-primary mb-8 font-headline">Recent Activity</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-on-surface font-semibold">Transcript Verified</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">Your documents for University of Toronto were successfully verified.</p>
                    <span className="text-xs text-outline font-medium tracking-widest uppercase mt-1 block">2 hours ago</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary-container mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-on-surface font-semibold">AI Recommendation</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">New career path match: "Data Science Lead" based on your latest grades.</p>
                    <span className="text-xs text-outline font-medium tracking-widest uppercase mt-1 block">Yesterday</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-on-surface font-semibold">XP Earned</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">Earned +150 XP for completing the initial Visa screening module.</p>
                    <span className="text-xs text-outline font-medium tracking-widest uppercase mt-1 block">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Task / Card */}
            <div className="md:col-span-12 lg:col-span-5 bg-primary rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
              <img 
                alt="University Campus" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPXegZ6nRxVW4qS4szWgyjm7cDZL9uTVNG1bZMLxctejvLMfKpoRrQyBS9k2tnHo0yIXHP_iZMvxK-G36XZHhSOx5bqJ5NmKS3VkPeg6fOW8pvxwtJdmTkKCxQMEWjX6CW_GYvXt4YQeyOAZSMmBNXo0FJXyjsBu3urbH2jpjuYrJOuPWVfV4ZH0CIq2LoEsF2tfJjODCGaxcwUe2H41vq0sielB9mic6JMlCum1WZsR5u2QS5QFtPOMgFJM0hjtHmIv8g-_lM6Diu"
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest self-start mb-6">Upcoming Goal</div>
                <h3 className="text-3xl font-bold mb-4 leading-tight font-headline">Master's Application: Imperial College London</h3>
                <div className="mt-auto">
                  <p className="text-primary-fixed-dim text-sm mb-4 font-bold tracking-tight">Deadline: 14 Oct 2024 (12 days left)</p>
                  <button className="w-full bg-white text-primary py-3 rounded-lg font-bold hover:bg-primary-fixed transition-all shadow-sm">Resume Application</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Mobile Nav (Only visible on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-3 flex justify-between items-center z-[70] border-t border-[#efedf1]">
        <Link to="/career" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-2xl">explore</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-[#006b5f] font-bold scale-110">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>timeline</span>
          <span className="text-[10px] uppercase tracking-tighter">Journey</span>
        </Link>
        <Link to="/chat" className="bg-primary -mt-8 p-4 rounded-full shadow-lg text-white ring-4 ring-white">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
        </Link>
        <Link to="/loans" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Visa</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-2xl">account_balance</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Uni</span>
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;
