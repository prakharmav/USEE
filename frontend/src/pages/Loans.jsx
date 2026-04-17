import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { apiFetch } from '../services/api';

const Loans = () => {
  const [emiInputs, setEmiInputs] = useState({
    loanAmount: 50000,
    interestRate: 10.5,
    tenureMonths: 60
  });
  const [emiResult, setEmiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Eligibility State
  const [eligibilityData, setEligibilityData] = useState(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);
  const [eligibilityInputs, setEligibilityInputs] = useState({
      gpa: 3.5,
      gre: 310,
      workExperience: 2,
      coApplicantIncome: 1200000,
      universityRanking: 150
  });

  const handleCheckEligibility = async () => {
    setCheckingEligibility(true);
    try {
      const response = await apiFetch('/api/loans/check-eligibility', {
        method: 'POST',
        body: JSON.stringify({ profile: eligibilityInputs })
      });
      const data = response.data;
      if (data.status === 'success') {
        setEligibilityData(data.data);
        toast.success('Eligibility analyzed successfully!');
      } else {
        toast.error(data.message || 'Eligibility check failed');
      }
    } catch (error) {
      console.error('Eligibility check failed:', error);
      toast.error('Network Error during Eligibility check');
    } finally {
      setCheckingEligibility(false);
      setShowEligibilityForm(false);
    }
  };

  const calculateEMI = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/tools/emi-calculator', {
        method: 'POST',
        body: JSON.stringify(emiInputs),
      });
      const data = response.data;
      if (data.status === 'success') {
        setEmiResult(data.data);
        toast.success('EMI Calculated');
      } else {
        toast.error('Failed to calculate EMI');
      }
    } catch (error) {
      console.error('EMI calculation failed', error);
      toast.error('Calculation server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-[calc(100vh-80px)] pb-20 flex-grow w-full">
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-12">
        {/* EMI Calculator Section */}
        <section className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-20 -mt-20"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold text-primary font-headline tracking-tight">Smart EMI Calculator</h2>
                <p className="text-on-surface-variant mt-2">Plan your finances with precision. Get exact monthly breakdowns instantly.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Loan Amount</label>
                    <span className="text-sm font-bold text-primary">${emiInputs.loanAmount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="5000" max="200000" step="5000"
                    className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                    value={emiInputs.loanAmount}
                    onChange={(e) => setEmiInputs({...emiInputs, loanAmount: Number(e.target.value)})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Interest Rate (%)</label>
                    <input 
                      type="number" className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-2 text-sm font-bold"
                      value={emiInputs.interestRate}
                      onChange={(e) => setEmiInputs({...emiInputs, interestRate: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Tenure (Months)</label>
                    <input 
                      type="number" className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-2 text-sm font-bold"
                      value={emiInputs.tenureMonths}
                      onChange={(e) => setEmiInputs({...emiInputs, tenureMonths: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <button 
                  onClick={calculateEMI}
                  disabled={loading}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  {loading ? 'Calculating...' : 'Calculate EMI'}
                </button>
              </div>
            </div>

            {loading ? (
               <SkeletonLoader type="card" />
            ) : emiResult && (
              <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 animate-in zoom-in duration-500">
                <div className="text-center space-y-2 mb-8">
                  <span className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Monthly Payment</span>
                  <div className="text-5xl font-black text-primary">${emiResult.emi.toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container-low rounded-lg">
                    <p className="text-[10px] font-bold text-outline uppercase">Total Interest</p>
                    <p className="text-lg font-bold text-secondary">${emiResult.totalInterest.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-lg">
                    <p className="text-[10px] font-bold text-outline uppercase">Total Payment</p>
                    <p className="text-lg font-bold text-primary">${emiResult.totalPayment.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <details className="group">
                    <summary className="list-none flex justify-center items-center gap-2 cursor-pointer text-xs font-bold text-secondary uppercase tracking-widest">
                      View Schedule <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>
                    <div className="mt-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      <table className="w-full text-[11px]">
                        <thead className="sticky top-0 bg-surface-container-lowest">
                          <tr className="border-b border-outline-variant/20">
                            <th className="text-left py-2">Month</th>
                            <th className="text-right py-2">Principal</th>
                            <th className="text-right py-2">Interest</th>
                          </tr>
                        </thead>
                        <tbody className="text-on-surface-variant font-medium">
                          {emiResult.amortizationSchedule.slice(0, 12).map(row => (
                            <tr key={row.month} className="border-b border-outline-variant/10">
                              <td className="py-2">{row.month}</td>
                              <td className="text-right py-2">${row.principal}</td>
                              <td className="text-right py-2">${row.interest}</td>
                            </tr>
                          ))}
                          {emiResult.amortizationSchedule.length > 12 && (
                            <tr><td colSpan="3" className="text-center py-2 text-[10px] italic">...and {emiResult.amortizationSchedule.length - 12} more months</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Loan Journey Progress Bar */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-primary font-headline">Application Track</h2>
              <p className="text-on-surface-variant text-sm md:text-base">Real-time status of your financial journey.</p>
            </div>
          </div>
          
          {/* Static Application Array Check */}
          {[] && [].length === 0 ? (
            <EmptyState 
              icon="description"
              title="No Active Applications"
              description="You have not submitted any loan applications yet. Check your eligibility above to unlock partner offers."
            />
          ) : (
          
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl overflow-x-auto">
            <div className="relative flex justify-between min-w-[500px]">
              <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-highest rounded-full"></div>
              <div className="absolute top-5 left-0 w-1/2 h-1 bg-gradient-to-br from-[#002045] to-[#043669] rounded-full"></div>
              
              <div className="relative flex flex-col items-center gap-3 z-10 w-24">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#002045] to-[#043669] flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <span className="text-xs font-bold text-primary">Applied</span>
              </div>
              
              <div className="relative flex flex-col items-center gap-3 z-10 w-24">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#002045] to-[#043669] flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <span className="text-xs font-bold text-primary">Verified</span>
              </div>
              
              <div className="relative flex flex-col items-center gap-3 z-10 w-24">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-4 border-primary flex items-center justify-center text-primary shadow-sm bg-white z-10">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-xs font-bold text-primary">Approved</span>
              </div>
              
              <div className="relative flex flex-col items-center gap-3 z-10 w-24">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-outline bg-white z-10 border-4 border-white">
                  <span className="material-symbols-outlined text-sm">payments</span>
                </div>
                <span className="text-xs font-semibold text-outline">Disbursed</span>
              </div>
            </div>
          </div>
          )}
        </section>

        {/* Hero: Eligibility & Featured */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-gradient-to-br from-[#002045] to-[#043669] rounded-xl p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px] shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-20 blur-[100px] -mr-20 -mt-20"></div>
            <div className="relative z-10 space-y-4 max-w-md">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                AI-Powered Analysis
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight font-headline">Check your pre-approved limit in 2 minutes.</h2>
              <p className="text-primary-fixed opacity-90 text-sm md:text-lg">Our curator analyzes 20+ NBFCs to find the perfect fit for your academic profile.</p>
            </div>

            {/* Eligibility Form / Results Area */}
            <div className="relative z-10 pt-8">
              {!showEligibilityForm && !eligibilityData && (
                <button 
                  onClick={() => setShowEligibilityForm(true)}
                  className="bg-secondary-fixed text-on-secondary-fixed px-6 py-4 rounded-xl font-bold text-sm md:text-lg shadow-[0_12px_32px_rgba(26,28,30,0.15)] hover:scale-105 transition-transform">
                  Check Eligibility Now
                </button>
              )}

              {showEligibilityForm && (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl max-w-sm space-y-3 mt-4 border border-white/20">
                  <div className="grid grid-cols-2 gap-3">
                     <input type="number" placeholder="GPA (out of 4)" className="px-3 py-2 rounded text-black text-sm" value={eligibilityInputs.gpa} onChange={e => setEligibilityInputs({...eligibilityInputs, gpa: Number(e.target.value)})}/>
                     <input type="number" placeholder="GRE Score" className="px-3 py-2 rounded text-black text-sm" value={eligibilityInputs.gre} onChange={e => setEligibilityInputs({...eligibilityInputs, gre: Number(e.target.value)})}/>
                     <input type="number" placeholder="Work Exp (Yrs)" className="px-3 py-2 rounded text-black text-sm" value={eligibilityInputs.workExperience} onChange={e => setEligibilityInputs({...eligibilityInputs, workExperience: Number(e.target.value)})}/>
                     <input type="number" placeholder="Uni Ranking" className="px-3 py-2 rounded text-black text-sm" value={eligibilityInputs.universityRanking} onChange={e => setEligibilityInputs({...eligibilityInputs, universityRanking: Number(e.target.value)})}/>
                  </div>
                  <input type="number" placeholder="Co-Applicant Income (INR)" className="w-full px-3 py-2 rounded text-black text-sm" value={eligibilityInputs.coApplicantIncome} onChange={e => setEligibilityInputs({...eligibilityInputs, coApplicantIncome: Number(e.target.value)})}/>
                  <div className="flex gap-2">
                    <button onClick={handleCheckEligibility} disabled={checkingEligibility} className="flex-1 bg-primary text-white py-2 rounded font-bold">{checkingEligibility ? 'Checking...' : 'Submit'}</button>
                    <button onClick={() => setShowEligibilityForm(false)} className="px-4 py-2 bg-white/20 rounded font-bold text-white">Cancel</button>
                  </div>
                </div>
              )}

              {eligibilityData && (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl max-w-sm space-y-3 mt-4 border border-white/20">
                  <h3 className="font-bold text-lg text-secondary-fixed">Analysis Complete</h3>
                  <div className="flex justify-between text-sm"><span className="opacity-80">Eligibility Score:</span> <span className="font-bold">{eligibilityData.eligibilityScore}/100</span></div>
                  <div className="flex justify-between text-sm"><span className="opacity-80">Estimated Rate:</span> <span className="font-bold">{eligibilityData.estimatedInterestRate}%</span></div>
                  <div className="flex justify-between text-sm"><span className="opacity-80">Max Term Loan:</span> <span className="font-bold cursor-help" title={`Min: ₹${eligibilityData.loanAmount.min}`}>₹{eligibilityData.loanAmount.max.toLocaleString('en-IN')}</span></div>
                  <button onClick={() => setEligibilityData(null)} className="mt-2 text-xs opacity-70 hover:opacity-100 underline decoration-dotted">Recalculate</button>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 right-4 md:right-8 opacity-[0.03] text-6xl md:text-8xl font-black select-none pointer-events-none">LOAN HUB</div>
          </div>
          
          <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-8 flex flex-col justify-center gap-6 border border-outline-variant/10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-primary font-headline">Market Pulse</h3>
              <p className="text-on-surface-variant text-sm">Global interest rates are currently favorable for STEM programs in the USA and Germany.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-lg shadow-sm">
                <div className="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">trending_down</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-outline">Lowest Rate</p>
                  <p className="text-lg font-bold text-primary">8.45% p.a.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-lg shadow-sm">
                <div className="p-3 bg-primary-fixed rounded-lg text-on-primary-fixed">
                  <span className="material-symbols-outlined">speed</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-outline">Avg. Approval</p>
                  <p className="text-lg font-bold text-primary">48 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Offers Grid */}
        <section className="space-y-8">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-primary font-headline">Curated Loan Packages</h2>
            <div className="h-px flex-1 bg-surface-container-high hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between transition-all hover:shadow-[0_12px_32px_rgba(26,28,30,0.06)] border border-outline-variant/10 border-b-4 border-b-transparent hover:border-b-secondary">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-secondary text-4xl">shield_moon</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Conservative</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary font-headline">Secure Scholar</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Prioritizes low interest rates and long repayment windows for peace of mind.</p>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Interest Rate</span>
                    <span className="font-bold text-on-surface">8.45% - 9.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Max Tenure</span>
                    <span className="font-bold text-on-surface">15 Years</span>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-3 bg-surface-container-high text-primary font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">Select Plan</button>
            </div>
            
            <div className="group bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between transition-all hover:shadow-[0_12px_32px_rgba(26,28,30,0.06)] border border-outline-variant/10 border-b-4 border-b-transparent hover:border-b-secondary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Most Popular</div>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-secondary text-4xl">balance</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Balanced</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary font-headline">Horizon Standard</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Optimal mix of quick processing and competitive interest rates.</p>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Interest Rate</span>
                    <span className="font-bold text-on-surface">9.5% - 10.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Max Tenure</span>
                    <span className="font-bold text-on-surface">10 Years</span>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-3 bg-primary text-white font-bold rounded-lg">Select Plan</button>
            </div>
            
            <div className="group bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between transition-all hover:shadow-[0_12px_32px_rgba(26,28,30,0.06)] border border-outline-variant/10 border-b-4 border-b-transparent hover:border-b-secondary">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-secondary text-4xl">rocket_launch</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Aggressive</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary font-headline">Global FastTrack</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">High disbursement amounts with minimal collateral requirements.</p>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Interest Rate</span>
                    <span className="font-bold text-on-surface">11.2% - 12.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Max Tenure</span>
                    <span className="font-bold text-on-surface">7 Years</span>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-3 bg-surface-container-high text-primary font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">Select Plan</button>
            </div>
          </div>
        </section>

        {/* NBFC Comparison Table */}
        <section className="space-y-8 overflow-hidden">
          <h2 className="text-2xl font-bold tracking-tight text-primary font-headline">Compare Lenders</h2>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-5 text-sm font-bold text-primary">NBFC Partner</th>
                  <th className="px-6 py-5 text-sm font-bold text-primary">Interest Rate</th>
                  <th className="px-6 py-5 text-sm font-bold text-primary">Processing Fee</th>
                  <th className="px-6 py-5 text-sm font-bold text-primary">Disbursement Time</th>
                  <th className="px-6 py-5 text-sm font-bold text-primary">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {eligibilityData?.nbfcOptions ? (
                  eligibilityData.nbfcOptions.map(nbfc => (
                    <tr key={nbfc.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">{nbfc.name.substring(0, 2).toUpperCase()}</div>
                          <span className="font-semibold text-primary">{nbfc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-medium text-on-surface">{nbfc.interestRate}% p.a.</td>
                      <td className="px-6 py-6 text-on-surface-variant text-sm">{nbfc.processingFee}</td>
                      <td className="px-6 py-6 text-on-surface-variant text-sm">{nbfc.collateralRequired}</td>
                      <td className="px-6 py-6">
                        <Link to="#" className="text-secondary font-bold text-sm hover:underline" title={nbfc.note}>Apply Now</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">EF</div>
                          <span className="font-semibold text-primary">EduFinance Corp</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-medium text-on-surface">8.45% p.a. onwards</td>
                      <td className="px-6 py-6 text-on-surface-variant text-sm">0.5% + Taxes</td>
                      <td className="px-6 py-6 text-on-surface-variant text-sm">3-5 Working Days</td>
                      <td className="px-6 py-6">
                        <Link to="#" className="text-secondary font-bold text-sm hover:underline">View Details</Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs">GL</div>
                          <span className="font-semibold text-primary">Global Lend</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-medium text-on-surface">9.10% p.a. onwards</td>
                      <td className="px-6 py-6 text-on-surface-variant text-sm">NIL (Promotional)</td>
                      <td className="px-6 py-6 text-on-surface-variant text-sm">48 Hours</td>
                      <td className="px-6 py-6">
                        <Link to="#" className="text-secondary font-bold text-sm hover:underline">View Details</Link>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Help Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          <div className="relative rounded-xl overflow-hidden group h-64 border border-outline-variant/10 shadow-sm">
            <img 
              alt="Expert Consultation" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/90 via-[#002045]/50 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
              <h4 className="text-xl font-bold font-headline">Talk to a Loan Specialist</h4>
              <p className="text-primary-fixed text-sm mt-2 max-w-sm">Get personalized advice for your specific country destination.</p>
            </div>
          </div>
          <div className="bg-secondary-container rounded-xl p-6 md:p-8 flex flex-col justify-between border border-secondary/10 shadow-sm">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-on-secondary-container font-headline">Document Vault</h4>
              <p className="text-on-secondary-container/80 text-sm leading-relaxed max-w-sm">Your secure space for KYC and academic transcripts. All files are encrypted and shared only with your chosen lenders.</p>
            </div>
            <div className="flex gap-4 mt-6">
              <button className="bg-on-secondary-container text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-on-secondary-container/90 transition-colors">Open Vault</button>
              <button className="border border-on-secondary-container/20 text-on-secondary-container px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-on-secondary-container/5 transition-colors bg-white/50">Upload New</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Loans;

