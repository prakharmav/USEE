import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniversityDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface overflow-hidden flex-grow w-full relative">
      {/* Backdrop for Modal-like look */}
      <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[45] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-12">
        {/* Modal Container */}
        <main className="bg-surface w-full max-w-6xl h-full md:h-auto md:max-h-[85vh] rounded-t-[2rem] md:rounded-xl overflow-hidden flex flex-col relative shadow-[0_12px_32px_rgba(26,28,30,0.06)] border-t border-outline-variant/15">
          {/* Top App Bar (Inside Modal) */}
          <header className="flex justify-between items-center px-6 py-4 w-full bg-white/60 backdrop-blur-xl sticky top-0 z-10 border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="hover:bg-surface-container-high p-2 rounded-full transition-colors active:scale-95 duration-200">
                <span className="material-symbols-outlined text-primary">arrow_back</span>
              </button>
              <h1 className="font-headline tracking-tighter font-bold text-2xl text-primary">Eduvion Navigator</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary hover:bg-surface-container-high p-2 rounded-full cursor-pointer transition-colors transition-all active:scale-90">share</span>
              <span className="material-symbols-outlined text-primary hover:bg-surface-container-high p-2 rounded-full cursor-pointer transition-colors transition-all active:scale-90" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            {/* Hero Section: Organic Editorial Layout */}
            <section className="relative px-6 pt-8 pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-7 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  Top Tier University
                </div>
                <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-primary tracking-tighter leading-none mb-6">Stanford University</h2>
                <div className="flex items-center gap-4 text-on-surface-variant font-medium">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Stanford, California
                  </div>
                  <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">public</span>
                    Private Research
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,28,30,0.06)] transform rotate-2 translate-y-4 transition-transform hover:rotate-0 duration-500">
                  <img className="w-full h-full object-cover" alt="Stanford campus" src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"/>
                </div>
                {/* Admission Predictor Chip */}
                <div className="absolute -top-6 -left-6 bg-primary p-6 rounded-xl text-white shadow-[0_12px_32px_rgba(26,28,30,0.06)] max-w-[180px]">
                  <div className="text-[11px] font-inter font-semibold uppercase tracking-[0.2em] opacity-80 mb-2">Predictor Score</div>
                  <div className="text-4xl font-headline font-extrabold flex items-baseline gap-1">
                    84<span className="text-lg opacity-60">%</span>
                  </div>
                  <div className="mt-3 text-xs leading-relaxed text-primary-fixed-dim">High probability of acceptance based on your current profile.</div>
                </div>
              </div>
            </section>

            {/* Content Bento Grid */}
            <section className="px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-surface-container-low p-8 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-headline text-2xl font-bold text-primary tracking-tight">Available Programs</h3>
                    <button className="text-secondary font-semibold text-sm hover:underline">View Prospectus</button>
                  </div>
                  <div className="grid gap-4">
                    {/* Program cards */}
                    <div className="bg-surface-container-lowest p-5 rounded-lg flex justify-between items-center group cursor-pointer transition-all hover:bg-white shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">code</span>
                        </div>
                        <div>
                          <div className="font-bold text-primary">Master's in Computer Science</div>
                          <div className="text-sm text-on-surface-variant">2 Years • Full-Time • STEM Designated</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">chevron_right</span>
                    </div>
                    <div className="bg-surface-container-lowest p-5 rounded-lg flex justify-between items-center group cursor-pointer transition-all hover:bg-white shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                          <div className="font-bold text-primary">Master's in Artificial Intelligence</div>
                          <div className="text-sm text-on-surface-variant">1.5 Years • Research Focused</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">chevron_right</span>
                    </div>
                  </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                    <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Rank</div>
                    <div className="text-2xl font-headline font-extrabold text-primary">#3</div>
                    <div className="text-[10px] text-on-surface-variant">QS World 2024</div>
                  </div>
                  <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                    <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Tuition</div>
                    <div className="text-2xl font-headline font-extrabold text-primary">$57k</div>
                    <div className="text-[10px] text-on-surface-variant">Per Academic Year</div>
                  </div>
                  <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                    <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Intake</div>
                    <div className="text-2xl font-headline font-extrabold text-primary">Sep</div>
                    <div className="text-[10px] text-on-surface-variant">Fall Semester</div>
                  </div>
                  <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                    <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Students</div>
                    <div className="text-2xl font-headline font-extrabold text-primary">17k+</div>
                    <div className="text-[10px] text-on-surface-variant">Global Community</div>
                  </div>
                </div>
              </div>
              {/* Right Column: Requirements */}
              <div className="bg-primary text-white p-8 rounded-xl flex flex-col shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-secondary-fixed">fact_check</span>
                  <h3 className="font-headline text-xl font-bold tracking-tight">Requirement Checklist</h3>
                </div>
                <ul className="space-y-6 flex-1">
                  <li className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary-fixed mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <div>
                      <div className="font-bold">Academic Transcripts</div>
                      <div className="text-xs text-primary-fixed-dim leading-relaxed">Minimum GPA 3.7/4.0 recommended.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary-fixed mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <div>
                      <div className="font-bold">IELTS / TOEFL</div>
                      <div className="text-xs text-primary-fixed-dim leading-relaxed">IELTS 7.5 or TOEFL 100+ required.</div>
                    </div>
                  </li>
                  <li className="flex gap-4 opacity-60">
                    <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5">radio_button_unchecked</span>
                    <div>
                      <div className="font-bold">GRE/GMAT Scores</div>
                      <div className="text-xs text-primary-fixed-dim leading-relaxed">Required for Engineering & Business.</div>
                    </div>
                  </li>
                </ul>
                <button className="mt-12 w-full py-5 rounded-xl bg-gradient-to-br from-secondary to-[#004e46] text-white font-headline font-extrabold text-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-lg">
                  Apply Now
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UniversityDetail;
