import React from 'react';

const Predict = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-24 md:pb-8 flex-grow w-full">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_32px_rgba(26,28,30,0.06)] border border-outline-variant/10">
              <div className="mb-6">
                <h2 className="font-headline text-3xl font-extrabold text-primary tracking-tight mb-2">Predict Your Success</h2>
                <p className="text-on-surface-variant body-md leading-relaxed">Enter your academic profile to generate a bespoke university matching report.</p>
              </div>
              <form className="space-y-5">
                <div className="space-y-1.5">
                  <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">Undergraduate GPA</label>
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline" placeholder="e.g. 3.85" type="text"/>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">GRE Score (Total)</label>
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline" placeholder="e.g. 324" type="text"/>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">IELTS / TOEFL</label>
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline" placeholder="e.g. 8.0" type="text"/>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">Intended Major</label>
                  <select className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary/20 transition-all text-on-surface appearance-none focus:outline-none">
                    <option>Computer Science</option>
                    <option>Data Analytics</option>
                    <option>Mechanical Engineering</option>
                    <option>Public Health</option>
                  </select>
                </div>
                <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform mt-4" type="button">
                  Generate Prediction
                </button>
              </form>
            </div>
            <div className="bg-secondary-container/30 rounded-xl p-6 border border-secondary-container">
              <div className="flex gap-4 items-start">
                <div className="bg-secondary text-on-secondary p-2 rounded-lg">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-secondary-container">AI Insight</h4>
                  <p className="text-sm text-on-secondary-container leading-snug mt-1">Students with a GRE &gt;320 and strong SOPs see a 14% higher acceptance rate at Tier-1 institutions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary tracking-tight">Personalized Matches</h3>
                <p className="text-on-surface-variant body-md mt-1">Based on global historical admission datasets from 2023-2024.</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00b395]"></span> Safe
                </span>
                <span className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Target
                </span>
                <span className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-error"></span> Reach
                </span>
              </div>
            </div>
            <div className="space-y-6">
              {/* Stanford */}
              <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-[0_8px_24px_rgba(26,28,30,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,30,0.08)] transition-all relative overflow-hidden">
                <div className="w-full md:w-24 h-24 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                  <img className="object-cover w-full h-full" alt="Stanford" src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"/>
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">school</span>
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors">Stanford University</h4>
                      <p className="text-sm text-on-surface-variant font-medium">MS in Computer Science • Palo Alto, CA</p>
                    </div>
                    <span className="text-error font-headline font-extrabold text-2xl tracking-tighter">32%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>Probability: Reach</span>
                      <span>Competitive Profile</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Georgia Tech */}
              <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-[0_8px_24px_rgba(26,28,30,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,30,0.08)] transition-all relative overflow-hidden">
                <div className="w-full md:w-24 h-24 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                  <img className="object-cover w-full h-full" alt="Georgia Tech" src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"/>
                  <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">school</span>
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors">Georgia Institute of Technology</h4>
                      <p className="text-sm text-on-surface-variant font-medium">MS in Computer Science • Atlanta, GA</p>
                    </div>
                    <span className="text-yellow-500 font-headline font-extrabold text-2xl tracking-tighter">58%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>Probability: Target</span>
                      <span>Good Match</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Illinois */}
              <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-[0_8px_24px_rgba(26,28,30,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,30,0.08)] transition-all relative overflow-hidden border-l-4 border-[#00b395]">
                <div className="w-full md:w-24 h-24 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                  <img className="object-cover w-full h-full" alt="UIUC" src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"/>
                  <div className="absolute inset-0 bg-on-tertiary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">school</span>
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors">University of Illinois</h4>
                        <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Strong Choice</span>
                      </div>
                      <p className="text-sm text-on-surface-variant font-medium">MS in Computer Science • Urbana-Champaign, IL</p>
                    </div>
                    <span className="text-[#00b395] font-headline font-extrabold text-2xl tracking-tighter">84%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>Probability: Safe</span>
                      <span>Excellent Match</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-[#00b395] rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary p-6 rounded-xl text-on-primary">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-4xl text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <h5 className="font-headline text-xl font-bold mb-2">Boost Your Odds</h5>
                <p className="text-sm text-on-primary-container leading-relaxed mb-6">Our data suggests that adding a research internship could improve your Stanford match by 12%.</p>
                <button className="text-secondary-fixed font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  View Career Roadmap <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex items-center">
                <div className="space-y-3">
                  <div className="flex -space-x-3">
                    <img alt="S1" className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?u=1"/>
                    <img alt="S2" className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?u=2"/>
                    <img alt="S3" className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?u=3"/>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container">+14</div>
                  </div>
                  <h5 className="font-headline font-bold text-primary">Chat with Admittees</h5>
                  <p className="text-xs text-on-surface-variant">Connect with students who got into your Target schools with similar profiles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Predict;
