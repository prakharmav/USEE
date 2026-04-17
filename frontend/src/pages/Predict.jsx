import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SkeletonLoader from '../components/SkeletonLoader';
import { apiFetch } from '../services/api';

const Predict = () => {
  const [inputs, setInputs] = useState({
    gpa: 3.8,
    gre: 320,
    gmat: '',
    workExp: 2,
    backlogs: 0
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/tools/eligibility-estimator', {
        method: 'POST',
        body: JSON.stringify(inputs),
      });
      const data = response.data;
      if (data.status === 'success') {
        setResult(data.data);
        toast.success("Prediction Analyzed!");
      } else {
        toast.error(data.message || 'Analysis failed.');
      }
    } catch (error) {
      toast.error('Network Error: Could not reach prediction engine.');
    } finally {
      setLoading(false);
    }
  };

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
                  <input 
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface" 
                    placeholder="e.g. 3.85" type="number" step="0.01" 
                    value={inputs.gpa} onChange={(e) => setInputs({...inputs, gpa: Number(e.target.value)})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">GRE Score</label>
                    <input 
                      className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface" 
                      placeholder="324" type="number" 
                      value={inputs.gre} onChange={(e) => setInputs({...inputs, gre: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">Work Exp (Yrs)</label>
                    <input 
                      className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface" 
                      placeholder="2" type="number" 
                      value={inputs.workExp} onChange={(e) => setInputs({...inputs, workExp: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label text-xs font-bold uppercase tracking-widest text-primary/70">Backlogs</label>
                  <input 
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface" 
                    placeholder="0" type="number" 
                    value={inputs.backlogs} onChange={(e) => setInputs({...inputs, backlogs: Number(e.target.value)})}
                  />
                </div>
                <button 
                  onClick={handlePredict}
                  className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform mt-4" 
                  type="button" disabled={loading}
                >
                  {loading ? 'Analyzing Profile...' : 'Generate Prediction'}
                </button>
              </form>
            </div>
            
            {result && (
              <div className="bg-secondary-container/30 rounded-xl p-6 border border-secondary-container animate-in slide-in-from-left duration-500">
                <div className="flex gap-4 items-start">
                  <div className="bg-secondary text-on-secondary p-2 rounded-lg">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-secondary-container text-lg">Your Profile Score: {result.eligibilityScore}%</h4>
                    <p className="text-sm text-on-secondary-container leading-snug mt-1">
                      Based on your academics and {inputs.workExp} years of experience, you have a strong competitive edge.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary tracking-tight">Personalized Matches</h3>
                <p className="text-on-surface-variant body-md mt-1">Dynamically recommended based on your {result?.eligibilityScore || '...'}% score.</p>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                 <SkeletonLoader type="list" />
              ) : result?.recommendedUniversities.length > 0 ? (
                result.recommendedUniversities.map((uni, index) => (
                  <div key={uni._id} className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all">
                    <div className="w-full md:w-24 h-24 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">school</span>
                      </div>
                    </div>
                    <div className="flex-grow space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors underline-offset-4 decoration-secondary/30">{uni.name}</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{uni.country} • Ranking #{uni.ranking}</p>
                        </div>
                        <span className="text-secondary font-headline font-extrabold text-2xl tracking-tighter">
                          {Math.max(30, Math.min(95, result.eligibilityScore - (index * 5)))}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                          <span>Acceptance Probability</span>
                          <span>{index === 0 ? 'Safe Match' : 'Target Match'}</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary rounded-full transition-all duration-1000" 
                            style={{ width: `${Math.max(30, Math.min(95, result.eligibilityScore - (index * 5)))}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-surface-container-low rounded-2xl p-12 text-center space-y-4 border-2 border-dashed border-outline-variant/30">
                  <span className="material-symbols-outlined text-6xl text-outline-variant">travel_explore</span>
                  <h4 className="text-xl font-bold text-primary">Ready to Discover?</h4>
                  <p className="text-on-surface-variant max-w-sm mx-auto">Click "Generate Prediction" to see universities compatible with your unique academic profile.</p>
                </div>
              )}
            </div>

            {result && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-1000">
                <div className="bg-primary p-6 rounded-xl text-on-primary">
                  <div className="flex justify-between items-start mb-4">
                    <span className="material-symbols-outlined text-4xl text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  </div>
                  <h5 className="font-headline text-xl font-bold mb-2">Loan Approval Odds</h5>
                  <p className="text-sm text-on-primary-container leading-relaxed mb-6">
                    Based on your score, you are eligible for loans up to <strong>${result.loanEligibility.max.toLocaleString()}</strong> with partner banks.
                  </p>
                  <Link to="/loans" className="text-secondary-fixed font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Explore Loan Options <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
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
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Predict;

