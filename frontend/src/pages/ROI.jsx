import React, { useState } from 'react';

const ROI = () => {
  const [tuition, setTuition] = useState(45000);
  const [living, setLiving] = useState(18000);
  const [salary, setSalary] = useState(85000);
  const [interest, setInterest] = useState(4.5);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-8 flex-grow w-full">
      <main className="pt-8 px-6 max-w-md mx-auto w-full">
        {/* Header Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-headline">ROI Calculator</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">Calculate the true value of your education and project your future financial freedom.</p>
        </section>

        {/* Input Section: Bento Grid Style */}
        <section className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-surface-container-low rounded-xl p-5 space-y-6">
            {/* Tuition */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-secondary">Tuition</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">$</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-8 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-semibold" 
                  type="number" 
                  value={tuition}
                  onChange={(e) => setTuition(Number(e.target.value))}
                />
              </div>
            </div>
            {/* Cost of Living */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-secondary">Cost of Living (Annual)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">$</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-8 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-semibold" 
                  type="number" 
                  value={living}
                  onChange={(e) => setLiving(Number(e.target.value))}
                />
              </div>
            </div>
            {/* Expected Salary */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-secondary">Expected Salary</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">$</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-8 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-semibold" 
                  type="number" 
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                />
              </div>
            </div>
            {/* Loan Interest */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-secondary">Loan Interest Rate (%)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">%</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-8 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-semibold" 
                  step="0.1" 
                  type="number" 
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Donut Chart Visualization */}
        <section className="mb-8">
          <div className="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 text-center relative overflow-hidden shadow-lg">
            {/* Abstract background glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/20 blur-3xl rounded-full"></div>
            <h3 className="text-on-primary/80 text-xs font-bold uppercase tracking-widest mb-8">Salary vs. Cost Analysis</h3>
            <div className="relative inline-flex items-center justify-center">
              {/* SVG Donut */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle className="text-primary-container/30" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="20"></circle>
                <circle className="text-secondary" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset="150" strokeWidth="20"></circle>
              </svg>
              {/* Inner Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-on-primary text-3xl font-black">74%</span>
                <span className="text-on-primary/60 text-[10px] font-bold uppercase">Surplus</span>
              </div>
            </div>
            <div className="mt-8 flex justify-between gap-4">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-on-primary/70 text-[10px] font-bold uppercase">Annual Savings</span>
                </div>
                <p className="text-on-primary font-bold text-lg">$34,200</p>
              </div>
              <div className="flex-1 text-right border-l border-white/10 pl-4">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="text-on-primary/70 text-[10px] font-bold uppercase">Total Debt</span>
                </div>
                <p className="text-on-primary font-bold text-lg">$63,000</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Visualization */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary font-bold text-sm">Break-even Timeline</h3>
            <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black rounded-md uppercase tracking-tighter">AI Prediction</span>
          </div>
          <div className="relative pt-6 pb-2">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 w-full h-1 bg-surface-container-highest rounded-full"></div>
            {/* Progress Line */}
            <div className="absolute top-8 left-0 w-3/5 h-1 bg-secondary rounded-full"></div>
            <div className="flex justify-between relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-surface mb-2 z-10 shadow-sm transition-transform hover:scale-125"></div>
                <span className="text-[10px] font-bold text-on-surface-variant">Graduation</span>
              </div>
              <div className="flex flex-col items-center -ml-4">
                <div className="w-6 h-6 rounded-full bg-secondary shadow-lg shadow-secondary/20 flex items-center justify-center mb-1 z-10">
                  <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-[11px] font-black text-secondary">Year 3.2</span>
                <span className="text-[9px] font-medium text-on-surface-variant">Break-even</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-surface-container-highest border-4 border-surface mb-2 z-10"></div>
                <span className="text-[10px] font-bold text-on-surface-variant">Year 5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insight Card */}
        <section className="bg-surface-container-low rounded-2xl p-6 border-l-4 border-secondary mb-8 shadow-sm">
          <div className="flex gap-4 items-start">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-secondary">psychology</span>
            </div>
            <div>
              <h4 className="text-primary font-bold text-sm mb-1 uppercase tracking-wider">Voyager Insight</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">Based on your field, the average ROI period is 4.1 years. Your plan is <strong>22% faster</strong> than the average student.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ROI;
