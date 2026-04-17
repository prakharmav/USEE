import React, { useState, useEffect } from 'react';

const ROI = () => {
  const [inputs, setInputs] = useState({
    country: 'USA',
    course: 'CS',
    currentSalary: 45000,
    workExp: 3,
    tuition: 60000
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tools/roi-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inputs,
          universityId: '65f123456789012345678901' // Placeholder or selected ID
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setResult(data.data);
      }
    } catch (error) {
      console.error('Calculation failed', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [inputs.country, inputs.course]);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-8 flex-grow w-full">
      <main className="pt-8 px-6 max-w-md mx-auto w-full">
        {/* Header Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-headline">ROI Calculator</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">Calculate the true value of your education and project your future financial freedom.</p>
        </section>

        {/* Input Section */}
        <section className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-surface-container-low rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Target Country</label>
                <select 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-2 text-sm font-bold"
                  value={inputs.country}
                  onChange={(e) => setInputs({...inputs, country: e.target.value})}
                >
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Course Field</label>
                <select 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-2 text-sm font-bold"
                  value={inputs.course}
                  onChange={(e) => setInputs({...inputs, course: e.target.value})}
                >
                  <option value="CS">Computer Science</option>
                  <option value="MBA">MBA</option>
                  <option value="DataScience">Data Science</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Current Annual Salary ($)</label>
              <input 
                className="w-full bg-surface-container-lowest border-none rounded-lg py-2 px-3 text-sm font-bold"
                type="number"
                value={inputs.currentSalary}
                onChange={(e) => setInputs({...inputs, currentSalary: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Work Experience (Years)</label>
              <input 
                className="w-full bg-surface-container-lowest border-none rounded-lg py-2 px-3 text-sm font-bold"
                type="number"
                value={inputs.workExp}
                onChange={(e) => setInputs({...inputs, workExp: Number(e.target.value)})}
              />
            </div>

            <button 
              onClick={handleCalculate}
              disabled={loading}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"
            >
              {loading ? 'Analyzing...' : 'Recalculate Success'}
            </button>
          </div>
        </section>

        {/* Results Visualization */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Donut Chart Visualization */}
            <section>
              <div className="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 text-center relative overflow-hidden shadow-lg">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/20 blur-3xl rounded-full"></div>
                <h3 className="text-on-primary/80 text-xs font-bold uppercase tracking-widest mb-8">Estimated Post-Grad Salary</h3>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle className="text-primary-container/30" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="20"></circle>
                    <circle className="text-secondary" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset={502.4 * (1 - result.annualGains / result.estimatedSalaryPost)} strokeWidth="20"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-on-primary text-3xl font-black">${(result.estimatedSalaryPost / 1000).toFixed(0)}k</span>
                    <span className="text-on-primary/60 text-[10px] font-bold uppercase px-4 leading-tight">Projected Starter</span>
                  </div>
                </div>
                <div className="mt-8 flex justify-between gap-4">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span className="text-on-primary/70 text-[10px] font-bold uppercase">Net Gain / yr</span>
                    </div>
                    <p className="text-on-primary font-bold text-lg">${(result.annualGains / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="flex-1 text-right border-l border-white/10 pl-4">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                      <span className="text-on-primary/70 text-[10px] font-bold uppercase">Total Investment</span>
                    </div>
                    <p className="text-on-primary font-bold text-lg">${(result.totalInvestment / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Timeline Visualization */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary font-bold text-sm">Break-even Timeline</h3>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black rounded-md uppercase tracking-tighter">AI Prediction</span>
              </div>
              <div className="relative pt-6 pb-2">
                <div className="absolute top-8 left-0 w-full h-1 bg-surface-container-highest rounded-full"></div>
                <div className="absolute top-8 left-0 w-3/5 h-1 bg-secondary rounded-full"></div>
                <div className="flex justify-between relative">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-surface mb-2 z-10"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant">Graduation</span>
                  </div>
                  <div className="flex flex-col items-center -ml-4">
                    <div className="w-6 h-6 rounded-full bg-secondary shadow-lg shadow-secondary/20 flex items-center justify-center mb-1 z-10">
                      <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-[11px] font-black text-secondary">Year {result.roiYears}</span>
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
            <section className="bg-surface-container-low rounded-2xl p-6 border-l-4 border-secondary shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-secondary">psychology</span>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm mb-1 uppercase tracking-wider">Voyager Insight</h4>
                  <p className="text-on-surface-variant text-xs leading-relaxed">
                    By {result.breakEvenYear}, you'll have recovered your entire investment. 
                    Growth projection for year 5 suggests a salary of <strong>${(result.salaryGrowthProjection[4].amount / 1000).toFixed(1)}k</strong>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default ROI;

export default ROI;
