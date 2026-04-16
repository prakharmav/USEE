import React from 'react';

const UniversitySearch = () => {
  return (
    <div className="bg-surface text-on-surface flex-grow w-full pb-20">
      <main className="pb-32">
        {/* Search & Hero Section */}
        <section className="px-6 py-4">
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input 
              className="w-full pl-12 pr-20 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-medium text-on-surface-variant shadow-sm" 
              placeholder="Search universities or courses..." 
              type="text"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button className="text-secondary font-semibold text-sm px-2 py-1 hover:bg-secondary/10 rounded-md transition-colors">Filters</button>
            </div>
          </div>
        </section>

        {/* Quick Filters Pill Bar */}
        <section className="px-6 mb-8 overflow-x-auto hide-scrollbar flex gap-3 max-w-4xl mx-auto pb-2">
          <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold tracking-wide shadow-sm hover:scale-105 transition-transform">
            Top 100
          </button>
          <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-surface-container-highest text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-colors shadow-sm">
            Public
          </button>
          <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-surface-container-highest text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-colors shadow-sm">
            STEM
          </button>
          <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-surface-container-highest text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-colors shadow-sm">
            Ivy League
          </button>
          <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-surface-container-highest text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-colors shadow-sm">
            Affordable
          </button>
        </section>

        {/* Results Grid */}
        <section className="px-6 space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 drop-shadow-sm">Found 1,248 Institutions</p>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary tracking-tight">Top Recommendations</h2>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">
              <span className="material-symbols-outlined">sort</span>
            </button>
          </div>
          
          {/* University Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_12px_32px_rgba(26,28,30,0.06)] relative group border border-outline-variant/10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center p-2">
                  <img alt="University Logo" className="w-full h-full object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqFzOUyn2deNSdvTKY__pytbKG_ZpRLAycR_XonRJ7r82ZvdzdVGBX0Jey3JEz2yFGdvJHbZZ7_d8Bdd3UJ3IzF79rM7Bb0ZCgEMDnammxpE0D4EsNBbG0uac8Coit9VmY0u4eNrX8e620eG9JNRZVGPTfLMNF-Rp2jpdETOPAO1iUzbutTrAo7Vu_SR09-ID3gJjEWthR5FXblIl0f2kdFGd-Wv08MtS98doW9PX-S81BYQJ5llhQ5A0CRmKolh4034WWpd9qAxK2" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-primary leading-tight">University of Oxford</h3>
                  <p className="text-sm text-outline flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-xs">location_on</span> Oxford, United Kingdom
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-error-container text-outline hover:text-error rounded-full transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-container-low rounded-lg p-3">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">QS World Rank</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-headline font-extrabold text-primary">#3</span>
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded font-bold">TOP 1%</span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Acceptance Rate</p>
                <p className="text-xl font-headline font-extrabold text-primary">17.5%</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Avg. Tuition</p>
                <p className="text-lg font-bold text-secondary font-headline">£27,840<span className="text-xs font-medium text-outline">/yr</span></p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">Compare</span>
              </label>
            </div>
          </div>

          {/* University Card 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_12px_32px_rgba(26,28,30,0.06)] relative group border border-outline-variant/10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center p-2">
                  <img alt="University Logo" className="w-full h-full object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYHcvZ-VcOw3OTAm8b7-KmXZmMkImgSznuM6hlm3eU0xUTWvw_8TV8RSk3HHlkEIGDe4t6AZg5LoJtFpClJmkmV2-1lsjNPwNXH6Ty8EJLK5Kv5Gca7qvZPG9xQahTVSgCrsq5sg4m7qEl_AFcvXhTXs1ksCseJkPtHkNCQsPbI09uroyTIEGXCL_C6AD8mw--hXBwhJP7BOGTwmuTglCR9itp4XItKPu49y_IXtNWGcXXi-ZIw89JzNbRtOE8-AT4uw5Fv_ljQg_6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-primary leading-tight">Stanford University</h3>
                  <p className="text-sm text-outline flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-xs">location_on</span> Stanford, USA
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-error-container text-outline hover:text-error rounded-full transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-container-low rounded-lg p-3">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">QS World Rank</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-headline font-extrabold text-primary">#5</span>
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded font-bold">ELITE</span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Acceptance Rate</p>
                <p className="text-xl font-headline font-extrabold text-primary">4.3%</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Avg. Tuition</p>
                <p className="text-lg font-bold text-secondary font-headline">$56,169<span className="text-xs font-medium text-outline">/yr</span></p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">Compare</span>
              </label>
            </div>
          </div>

          {/* University Card 3 (Bento-style variation) */}
          <div className="bg-primary overflow-hidden rounded-xl shadow-[0_24px_48px_rgba(0,32,69,0.15)] relative group">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-widest uppercase">Sponsored</div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center p-2">
                  <img alt="University Logo" className="w-full h-full object-contain brightness-0 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0nnOL2sArSQDX4wPZOifwPyHdCRc1hTjIrKzJ4Xnr4KM6SXIskgz-2VhYBkipgJQi7sHl_OkIWAMYQw1-T_hXLeKSzy67Afi-YwoNtc-sQxiaeLlqW7JNAhTPukZuVdWyo9F_ajVhmQ9QGouQH8XTOenAC684Sii9EoSR1i0DpADOHsxBHGj91DiZLfnvlPQ1osixXV88CQWQIglTsQs-_bMUSqH5q04-N8abm2XOhJJlsPqfDFSs5s2o7Yi2fg1fmxfI2yZMZDSu" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-white leading-tight">ETH Zurich</h3>
                  <p className="text-sm text-primary-fixed-dim flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-xs">location_on</span> Zurich, Switzerland
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-primary-fixed-dim uppercase tracking-wider mb-1">STEM Excellence</p>
                  <p className="text-xl font-headline font-extrabold text-white">#1 in Europe</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-primary-fixed-dim uppercase tracking-wider mb-1">Success Rate</p>
                  <p className="text-xl font-headline font-extrabold text-white">92%</p>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 flex justify-between items-center group/btn border border-white/10">
                <p className="text-white text-sm font-medium">Full scholarships available for Fall 2026</p>
                <span className="material-symbols-outlined text-secondary-fixed group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* University Card 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_12px_32px_rgba(26,28,30,0.06)] relative group border border-outline-variant/10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center p-2">
                  <img alt="University Logo" className="w-full h-full object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKxJHn4riHPOb4ncQ1pPUYR2dOdGuzpJzib20nF84GY24NOmGhVjhm3qEyTiENzA11dnNammpn4ay9IHi7aiTDB473iA_-O4HTFQXV9H__C9dYzsSJwfSbIKOQ25QCWWsW2dGN7Op8ciEJ-L2wz3c8TtXfFJnE7k4y0pbIvAGfJ4KyuwA0h-fSchudt_jutKw5LZ-3rRpPdZfU2_T6nCHNfLG5VC-VpukFUo7ViZ1HrUA06Hkz8GI0JGkVcY9bT6biFVzEu02r-quS" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-primary leading-tight">University of Melbourne</h3>
                  <p className="text-sm text-outline flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-xs">location_on</span> Melbourne, Australia
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-error-container text-outline hover:text-error rounded-full transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-container-low rounded-lg p-3">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">QS World Rank</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-headline font-extrabold text-primary">#14</span>
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded font-bold">TOP 5%</span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Acceptance Rate</p>
                <p className="text-xl font-headline font-extrabold text-primary">70%</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Avg. Tuition</p>
                <p className="text-lg font-bold text-secondary font-headline">A$42,500<span className="text-xs font-medium text-outline">/yr</span></p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">Compare</span>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UniversitySearch;
