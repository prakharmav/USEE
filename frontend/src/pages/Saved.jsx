import React, { useState } from 'react';
import EmptyState from '../components/EmptyState';

const Saved = () => {
  // Toggle this to see empty state vs populated state
  const [savedUniversities] = useState([]); 
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pb-32 flex-grow w-full">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              <span className="font-inter text-[11px] uppercase tracking-widest uppercase">Your Shortlist</span>
            </div>
            <h2 className="font-headline text-5xl font-extrabold tracking-tight text-primary max-w-2xl">
              Saved <span className="text-on-primary-container">Institutions</span>
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl">
              Review and compare your top academic choices. Your journey to global education starts with these curated selections.
            </p>
          </div>
          <button aria-label="Compare Universities" className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold shadow-[0_12px_32px_rgba(26,28,30,0.06)] hover:scale-95 transition-transform active:scale-90 min-h-[48px]">
            <span className="material-symbols-outlined">compare_arrows</span>
            Quick Compare Selected
          </button>
        </div>

        {savedUniversities.length === 0 ? (
          <EmptyState 
            icon="bookmark_border"
            title="Your List is Empty"
            description="You haven't saved any universities yet. Head over to the Search page or use the AI predictor to find your perfect match!"
            actionText="Start Exploring"
            actionLink="/search"
          />
        ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Stanford */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-[0_12px_32px_rgba(26,28,30,0.06)] transition-all flex flex-col shadow-sm">
            <div className="relative h-48 overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Stanford" src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"/>
              <div className="absolute top-4 left-4">
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  AI Match: 98%
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-md p-2 rounded-full text-secondary shadow-sm hover:scale-110 cursor-pointer transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-1">Stanford University</h3>
                <p className="text-on-surface-variant flex items-center gap-1 text-sm italic">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Stanford, California
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">QS Rank</p>
                  <p className="text-xl font-headline font-extrabold text-primary">#3</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Acceptance</p>
                  <p className="text-xl font-headline font-extrabold text-primary">4.3%</p>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-outline-variant/15">
                <span className="font-inter text-sm font-semibold text-on-surface-variant">Intake: Fall 2024</span>
                <button className="text-secondary font-bold text-sm flex items-center gap-1 group">
                  Details
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: UniMelb */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-[0_12px_32px_rgba(26,28,30,0.06)] transition-all flex flex-col shadow-sm">
            <div className="relative h-48 overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="UniMelb" src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"/>
              <div className="absolute top-4 left-4">
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  AI Match: 92%
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-md p-2 rounded-full text-secondary shadow-sm hover:scale-110 cursor-pointer transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-1">University of Melbourne</h3>
                <p className="text-on-surface-variant flex items-center gap-1 text-sm italic">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Melbourne, Australia
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">QS Rank</p>
                  <p className="text-xl font-headline font-extrabold text-primary">#14</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Acceptance</p>
                  <p className="text-xl font-headline font-extrabold text-primary">70%</p>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-outline-variant/15">
                <span className="font-inter text-sm font-semibold text-on-surface-variant">Intake: July 2024</span>
                <button className="text-secondary font-bold text-sm flex items-center gap-1 group">
                  Details
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: TU Munich */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-[0_12px_32px_rgba(26,28,30,0.06)] transition-all flex flex-col border-2 border-secondary-container shadow-md">
            <div className="relative h-48 overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="TUM" src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"/>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  AI Match: 85%
                </div>
                <div className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  Best Value
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-md p-2 rounded-full text-secondary shadow-sm hover:scale-110 cursor-pointer transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-1">TU Munich</h3>
                <p className="text-on-surface-variant flex items-center gap-1 text-sm italic">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Munich, Germany
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">QS Rank</p>
                  <p className="text-xl font-headline font-extrabold text-primary">#37</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Acceptance</p>
                  <p className="text-xl font-headline font-extrabold text-primary">8%</p>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-outline-variant/15">
                <span className="font-inter text-sm font-semibold text-on-surface-variant">Intake: Winter 2024</span>
                <button className="text-secondary font-bold text-sm flex items-center gap-1 group">
                  Details
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mt-24 bg-surface-container-low rounded-2xl p-10 overflow-hidden relative shadow-sm border border-outline-variant/10">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <div className="bg-secondary-fixed w-full h-full rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline text-3xl font-extrabold text-primary mb-8 tracking-tight">Quick Comparison Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0 min-w-[600px]">
                <thead>
                  <tr className="text-on-surface-variant">
                    <th className="pb-6 pr-6 font-inter text-[11px] uppercase tracking-[0.2em] border-b border-outline-variant/20">Metric</th>
                    <th className="pb-6 px-6 font-headline text-lg font-bold text-primary border-b border-outline-variant/20">Stanford</th>
                    <th className="pb-6 px-6 font-headline text-lg font-bold text-primary border-b border-outline-variant/20">UniMelb</th>
                    <th className="pb-6 pl-6 font-headline text-lg font-bold text-primary border-b border-outline-variant/20">TU Munich</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-6 pr-6 font-semibold border-b border-outline-variant/10">Tuition Fees (p.a.)</td>
                    <td className="py-6 px-6 border-b border-outline-variant/10 font-medium">$56,000</td>
                    <td className="py-6 px-6 border-b border-outline-variant/10 font-medium">$38,500</td>
                    <td className="py-6 pl-6 border-b border-outline-variant/10 font-medium">€0 (Semester Fee Only)</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-6 pr-6 font-semibold border-b border-outline-variant/10">Global Ranking</td>
                    <td className="py-6 px-6 border-b border-outline-variant/10">
                      <span className="text-primary font-bold">#3</span>
                      <span className="text-[10px] ml-1 text-secondary font-bold">↑ 2</span>
                    </td>
                    <td className="py-6 px-6 border-b border-outline-variant/10">
                      <span className="text-primary font-bold">#14</span>
                      <span className="text-[10px] ml-1 text-on-surface-variant font-bold">Stable</span>
                    </td>
                    <td className="py-6 pl-6 border-b border-outline-variant/10">
                      <span className="text-primary font-bold">#37</span>
                      <span className="text-[10px] ml-1 text-secondary font-bold">↑ 12</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-6 pr-6 font-semibold border-b border-outline-variant/10">Acceptance Rate</td>
                    <td className="py-6 px-6 border-b border-outline-variant/10">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden max-w-[80px]">
                          <div className="bg-error w-[4%] h-full"></div>
                        </div>
                        <span className="font-bold text-sm">4.3%</span>
                      </div>
                    </td>
                    <td className="py-6 px-6 border-b border-outline-variant/10">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden max-w-[80px]">
                          <div className="bg-secondary-fixed-dim w-[70%] h-full"></div>
                        </div>
                        <span className="font-bold text-sm">70%</span>
                      </div>
                    </td>
                    <td className="py-6 pl-6 border-b border-outline-variant/10">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden max-w-[80px]">
                          <div className="bg-primary w-[8%] h-full"></div>
                        </div>
                        <span className="font-bold text-sm">8%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        </>
        )}
      </main>
    </div>
  );
};

export default Saved;
