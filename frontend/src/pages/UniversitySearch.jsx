import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SkeletonLoader from '../components/SkeletonLoader';
import { apiFetch } from '../services/api';

const UniversitySearch = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    minRanking: '',
    maxFee: '',
    course: '',
  });
  const [stats, setStats] = useState({ totalCount: 0 });

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        page: 1,
        limit: 20,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      });

      const response = await apiFetch(`/api/universities?${queryParams}`);
      const result = response.data;
      
      if (result.status === 'success') {
        setUniversities(result.data.universities);
        setStats({ totalCount: result.data.totalCount });
      } else {
        toast.error('Failed to load universities.');
      }
    } catch (error) {
      toast.error('Network Error: Database unreachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUniversities();
    }, 500); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [search, filters]);

  const handleFilterClick = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: prev[type] === value ? '' : value }));
  };
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button className="text-secondary font-semibold text-sm px-2 py-1 hover:bg-secondary/10 rounded-md transition-colors">Filters</button>
            </div>
          </div>
        </section>

        {/* Quick Filters Pill Bar */}
        <section className="px-6 mb-8 overflow-x-auto hide-scrollbar flex gap-3 max-w-4xl mx-auto pb-2">
          <button 
            onClick={() => handleFilterClick('country', 'USA')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm transition-all ${filters.country === 'USA' ? 'bg-primary text-white scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            USA
          </button>
          <button 
            onClick={() => handleFilterClick('country', 'UK')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm transition-all ${filters.country === 'UK' ? 'bg-primary text-white scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            UK
          </button>
          <button 
            onClick={() => handleFilterClick('country', 'India')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm transition-all ${filters.country === 'India' ? 'bg-primary text-white scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            India
          </button>
          <button 
            onClick={() => handleFilterClick('minRanking', '50')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm transition-all ${filters.minRanking === '50' ? 'bg-primary text-white scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            Top 50
          </button>
        </section>

        {/* Results Grid */}
        <section className="px-6 space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 drop-shadow-sm">
                {loading ? 'Searching...' : `Found ${stats.totalCount} Institutions`}
              </p>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary tracking-tight">
                {search ? `Search Results for "${search}"` : 'Top Recommendations'}
              </h2>
            </div>
          </div>
          
          {loading ? (
            <div className="mt-6"><SkeletonLoader type="list" /></div>
          ) : universities.length > 0 ? (
            universities.map((uni) => (
              <div key={uni._id} className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_12px_32px_rgba(26,28,30,0.06)] relative group border border-outline-variant/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center p-2">
                      <span className="material-symbols-outlined text-3xl text-primary">school</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg text-primary leading-tight">{uni.name}</h3>
                      <p className="text-sm text-outline flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-xs">location_on</span> {uni.country}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-error-container text-outline hover:text-error rounded-full transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-surface-container-low rounded-lg p-3">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">World Rank</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-headline font-extrabold text-primary">#{uni.ranking}</span>
                      {uni.ranking <= 100 && <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Elite</span>}
                    </div>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-3">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Acceptance Rate</p>
                    <p className="text-xl font-headline font-extrabold text-primary">{uni.acceptanceRate}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Employment Rate</p>
                    <p className="text-lg font-bold text-secondary font-headline">{uni.employmentRate}%</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input className="rounded border-outline text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">Compare</span>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-12 text-center border-2 border-dashed border-outline-variant/20">
              <span className="material-symbols-outlined text-5xl text-outline mb-4 opacity-50">search_off</span>
              <h3 className="text-xl font-headline font-bold text-on-surface">No universities found</h3>
              <p className="text-on-surface-variant mt-2">Try adjusting your filters or search terms.</p>
              <button onClick={() => {setSearch(''); setFilters({country: '', minRanking: '', maxFee: '', course: ''});}} className="mt-6 text-primary font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UniversitySearch;
