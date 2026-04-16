import React from 'react';

const EligibilityResult = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-[calc(100vh-80px)] selection:bg-secondary-container selection:text-on-secondary-container flex-grow w-full">
      <main className="pt-8 pb-32 px-6 max-w-7xl mx-auto">
        {/* Background Decorative Elements */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-secondary-container/20 blur-[120px] rounded-full"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary-container/5 blur-[100px] rounded-full"></div>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side: Result Card */}
          <div className="w-full lg:w-2/3 space-y-8">
            <section className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_12px_32px_rgba(26,28,30,0.06)] relative overflow-hidden border border-outline-variant/10">
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-sm font-bold font-label mb-4 inline-block shadow-sm">Analysis Complete</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">You're Eligible!</h2>
                    <p className="text-on-surface-variant mt-2 text-lg">Your profile has been curated against top lending criteria.</p>
                  </div>
                  {/* Radial Score Gauge */}
                  <div className="relative flex items-center justify-center w-48 h-48 group">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                      <circle className="text-secondary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="82.94" strokeWidth="12"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-headline font-extrabold text-primary">85</span>
                      <span className="text-sm font-label font-bold text-on-surface-variant uppercase tracking-widest">Score</span>
                    </div>
                  </div>
                </div>
                {/* Loan Recommendation Banner */}
                <div className="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <span className="material-symbols-outlined text-3xl text-secondary-fixed">payments</span>
                    </div>
                    <div>
                      <p className="text-on-primary-container font-label text-sm font-semibold uppercase tracking-wider opacity-80">Recommended Loan Range</p>
                      <p className="text-3xl font-headline font-bold">$40,000 - $65,000</p>
                    </div>
                  </div>
                  <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary-fixed/90 transition-all active:scale-95 whitespace-nowrap shadow-md">
                    Apply Now
                  </button>
                </div>
              </div>
              {/* Subtle Decorative Image Overlay */}
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
                <span className="text-[200px] font-black absolute top-1/2 -right-20 -translate-y-1/2 select-none">LOAN</span>
              </div>
            </section>
            
            {/* Insights Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between h-48 border border-outline-variant/10 shadow-sm transition-transform hover:scale-[1.02]">
                <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
                <div>
                  <h3 className="font-headline font-bold text-primary text-xl">High Probability</h3>
                  <p className="text-on-surface-variant text-sm">Based on your academic track record and chosen program ROI.</p>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between h-48 border border-outline-variant/10 shadow-sm transition-transform hover:scale-[1.02]">
                <span className="material-symbols-outlined text-secondary text-3xl">bolt</span>
                <div>
                  <h3 className="font-headline font-bold text-primary text-xl">Instant Approval</h3>
                  <p className="text-on-surface-variant text-sm">Eligible for 'Fast-Track' verification with our partner banks.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Document Checklist Sidebar */}
          <aside className="w-full lg:w-1/3 bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
            <h3 className="text-2xl font-headline font-extrabold text-primary mb-6">Next Steps Checklist</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              To maintain your current eligibility score, prepare these documents for your curated application journey.
            </p>
            <div className="space-y-4">
              {/* Checklist Items */}
              {[
                { icon: 'badge', title: 'Passport', desc: 'Valid for at least 6 months' },
                { icon: 'school', title: 'Admission Letter', desc: 'Conditional or Unconditional' },
                { icon: 'account_balance', title: 'Financial Statements', desc: 'Last 6 months activity' },
                { icon: 'description', title: 'Academic Transcripts', desc: 'Degree and high school' }
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 transition-all hover:scale-[1.02] cursor-pointer group shadow-sm border border-transparent hover:border-secondary/20">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant">{item.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary">radio_button_unchecked</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/10">
              <div className="bg-secondary/5 rounded-xl p-4 flex gap-3 border border-secondary/10">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-xs text-on-secondary-fixed-variant leading-relaxed">
                  Pro tip: Higher quality document scans can increase approval speeds by up to 40%.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EligibilityResult;
