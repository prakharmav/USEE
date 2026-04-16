import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Career = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState({
    US: true,
    UK: false,
    Canada: false,
    Germany: false,
    Australia: false
  });
  const [includeExp, setIncludeExp] = useState(true);

  const toggleDest = (key) => setDestinations(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container flex-grow flex flex-col pt-8 pb-32">
      <main className="min-h-[calc(100vh-200px)] px-4 w-full md:max-w-md mx-auto">
        {/* Progress Indicator */}
        <section className="mb-8 px-2">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold font-headline uppercase tracking-widest text-secondary">Step 1 of 3</span>
            <span className="text-xs font-medium text-on-surface-variant">Academic Profile</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-secondary rounded-full"></div>
          </div>
        </section>

        {/* Intro Text */}
        <header className="mb-8 px-2">
          <h2 className="text-3xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-2">Let's build your profile.</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">Enter your academic credentials to unlock personalized university recommendations powered by AI.</p>
        </header>

        {/* Step 1 Form Content */}
        <div className="space-y-6">
          {/* GPA Input Card */}
          <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">school</span>
              </div>
              <label className="text-sm font-bold font-headline text-primary">Academic Standing</label>
            </div>
            <div>
              <span className="text-xs font-medium text-on-surface-variant mb-1.5 block">Undergraduate GPA (out of 4.0)</span>
              <input className="w-full h-14 px-4 bg-surface-container-lowest border-none rounded-xl text-lg font-headline font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/40" placeholder="e.g. 3.85" step="0.01" type="number"/>
            </div>
          </div>

          {/* GRE Score Bento Grid-ish Layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-5 rounded-xl">
              <label className="text-xs font-bold font-headline text-on-surface-variant mb-2 block uppercase tracking-wider">GRE Quant</label>
              <input className="w-full h-12 bg-transparent border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-xl font-headline font-bold text-primary transition-colors placeholder:text-outline/30" placeholder="170" type="number"/>
            </div>
            <div className="bg-surface-container-low p-5 rounded-xl">
              <label className="text-xs font-bold font-headline text-on-surface-variant mb-2 block uppercase tracking-wider">GRE Verbal</label>
              <input className="w-full h-12 bg-transparent border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-xl font-headline font-bold text-primary transition-colors placeholder:text-outline/30" placeholder="165" type="number"/>
            </div>
          </div>

          {/* Multi-select for Country Preferences */}
          <div className="bg-surface-container-low p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold font-headline text-primary">Study Destinations</label>
              <span className="text-[10px] px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full font-bold">AI Recommended</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toggleDest('US')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-transform active:scale-95 ${destinations.US ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-highest'}`}>
                {destinations.US && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                United States
              </button>
              <button onClick={() => toggleDest('UK')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-transform active:scale-95 ${destinations.UK ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-highest'}`}>
                {destinations.UK && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                United Kingdom
              </button>
              <button onClick={() => toggleDest('Canada')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-transform active:scale-95 ${destinations.Canada ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-highest'}`}>
                {destinations.Canada && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                Canada
              </button>
              <button onClick={() => toggleDest('Germany')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-transform active:scale-95 ${destinations.Germany ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-highest'}`}>
                {destinations.Germany && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                Germany
              </button>
              <button onClick={() => toggleDest('Australia')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-transform active:scale-95 ${destinations.Australia ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-highest'}`}>
                {destinations.Australia && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                Australia
              </button>
            </div>
          </div>

          {/* Experience Toggle */}
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 cursor-pointer" onClick={() => setIncludeExp(!includeExp)}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">work</span>
              <span className="text-sm font-medium">Include work experience?</span>
            </div>
            <div className={`w-10 h-6 rounded-full relative flex items-center px-1 transition-colors ${includeExp ? 'bg-secondary-container' : 'bg-surface-container-high'}`}>
              <div className={`w-4 h-4 rounded-full transition-transform ${includeExp ? 'translate-x-4 bg-secondary' : 'translate-x-0 bg-outline-variant'}`}></div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between z-50 shadow-[0_-12px_32px_rgba(26,28,30,0.06)] rounded-t-2xl md:max-w-md md:left-1/2 md:-translate-x-1/2">
        <button className="text-on-surface-variant font-bold text-sm px-4 py-2 hover:bg-surface-container-low rounded-xl transition-colors" onClick={() => navigate('/dashboard')}>Skip for now</button>
        <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3.5 rounded-xl font-headline font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform" onClick={() => navigate('/dashboard')}>
          Next Step
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Career;
