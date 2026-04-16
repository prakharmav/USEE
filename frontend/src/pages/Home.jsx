import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="pt-24 overflow-x-hidden w-full">
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-28 lg:px-12 flex flex-col items-center text-center max-w-7xl mx-auto overflow-visible">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-[80px] -z-10"></div>
        <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-secondary-container text-on-secondary-container text-sm font-medium">
          <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          The Intelligent Voyager's Platform
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary mb-8 leading-tight">
          Your AI-Powered <br className="hidden md:block"/>
          <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">Study Abroad Companion</span>
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Unlock global opportunities with Eduvion AI. Personalized university matches, 
          automated visa guidance, and career planning for the modern international student.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto">
          <Link to="/register" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-[0.98]">
            Get Started
          </Link>
          <button className="px-8 py-4 bg-surface-container-highest text-on-surface rounded-xl font-bold text-lg hover:bg-surface-container-high transition-all active:scale-[0.98]">
            Learn More
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full text-left">
          {/* Feature Card 1 */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 flex flex-col border border-outline-variant/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <span className="material-symbols-outlined text-secondary text-4xl mb-6">school</span>
            <h3 className="text-2xl font-bold text-primary mb-4">University Match</h3>
            <p className="text-on-surface-variant mb-auto opacity-90">AI-driven selection based on 200+ data points including GPA, GRE, and budget.</p>
          </div>

          {/* Feature Card 2: Visa Wizard */}
          <div className="md:col-span-4 bg-primary-container text-on-primary rounded-xl p-8 flex flex-col shadow-sm">
            <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6">verified_user</span>
            <h3 className="text-2xl font-bold mb-4">Visa Wizard</h3>
            <p className="text-on-primary-container mb-auto opacity-90">Real-time tracking and automated document review for visa success across 40+ countries.</p>
            <div className="mt-8 flex items-center gap-2 text-secondary-fixed font-bold">
              <span>Get Certified</span>
              <span className="material-symbols-outlined">shield</span>
            </div>
          </div>

          {/* Feature Card 3: Career Navigator */}
          <div className="md:col-span-4 bg-surface-container-highest rounded-xl p-8 flex flex-col shadow-sm">
            <span className="material-symbols-outlined text-primary text-4xl mb-6">explore</span>
            <h3 className="text-2xl font-bold text-primary mb-4">Career Navigator</h3>
            <p className="text-on-surface-variant mb-6">Map your journey from graduation to global career with industry-specific growth pathways.</p>
            <div className="w-full h-2 bg-outline-variant/30 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-2/3 rounded-full"></div>
            </div>
          </div>

          {/* Feature Card 4: Financial Aid AI */}
          <div className="md:col-span-8 group relative overflow-hidden bg-[#002045] rounded-xl p-8 min-h-[300px] flex items-center shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Financial Aid AI</h3>
                <p className="text-primary-fixed-dim opacity-80 mb-6">Secure funding with AI-matched scholarships and instant loan eligibility checks.</p>
                <Link to="/loans" className="inline-block px-6 py-3 bg-secondary text-white rounded-lg font-bold hover:bg-secondary/90 transition-all">
                  Check Eligibility
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-secondary-fixed font-bold uppercase tracking-widest">Live Funding</span>
                    <span className="text-white text-lg font-bold">$2.4M</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-1 bg-white/20 rounded-full"></div>
                    <div className="h-1 bg-white/20 rounded-full w-4/5"></div>
                    <div className="h-1 bg-white/20 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 5: Admission Predictor */}
          <div className="md:col-span-4 bg-surface-container rounded-xl p-8 flex flex-col shadow-sm border border-outline-variant/5">
            <span className="material-symbols-outlined text-primary text-4xl mb-6">analytics</span>
            <h3 className="text-2xl font-bold text-primary mb-4">Success Predictor</h3>
            <p className="text-on-surface-variant mb-auto">Know your odds of acceptance before you even apply with our deep-learning model.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="bg-surface-container-lowest p-8 md:p-16 rounded-[2rem] shadow-sm border border-outline-variant/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/5 to-transparent"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 relative z-10 font-headline">Join the Future Voyagers</h2>
          <p className="text-on-surface-variant mb-10 max-w-lg mx-auto relative z-10">Get curated insights on international education and career opportunities delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input className="flex-1 px-6 py-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="Enter your email" type="email"/>
            <button className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold whitespace-nowrap hover:bg-primary/90 transition-colors">Join Waitlist</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
