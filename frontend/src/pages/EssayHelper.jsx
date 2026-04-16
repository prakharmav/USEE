import React from 'react';

const EssayHelper = () => {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex-grow w-full">
      <main className="pt-8 pb-32 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Background Editorial Element */}
        <div className="md:col-span-12 lg:col-span-5 space-y-6">
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight">
            Craft Your <span className="text-secondary">Future</span> Story.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
            The Statement of Purpose is more than a document; it's your legacy in the making. Use our Intelligent Voyager AI to structure your narrative with precision.
          </p>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low shadow-lg transition-transform hover:scale-[1.01]">
            <img className="w-full h-full object-cover" alt="Library" src="https://images.unsplash.com/photo-1507738911748-9c7365647dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"/>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </div>
        </div>

        {/* Essay Helper Form */}
        <div className="md:col-span-12 lg:col-span-7">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_12px_32px_rgba(26,28,30,0.06)] p-6 md:p-10 border border-outline-variant/15 relative overflow-hidden">
            {/* AI Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center text-on-secondary-container shadow-sm transition-transform hover:rotate-12">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary">SOP Intelligence Helper</h3>
                <p className="text-sm text-on-surface-variant">Drafting assistance for the Intelligent Voyager</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-sm font-semibold text-primary px-1">Target University</label>
                  <input className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50" placeholder="e.g. Stanford University" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="font-label text-sm font-semibold text-primary px-1">Program Name</label>
                  <input className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50" placeholder="e.g. MS in Data Science" type="text"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-sm font-semibold text-primary px-1">Career Goals</label>
                <textarea className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 resize-none min-h-[120px]" placeholder="What impact do you want to make in your field over the next 10 years?" rows="4"></textarea>
              </div>
              <div className="space-y-2">
                <label className="font-label text-sm font-semibold text-primary px-1">Key Achievements</label>
                <textarea className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 resize-none min-h-[120px]" placeholder="List major projects, internships, or awards that define your excellence." rows="4"></textarea>
              </div>
              <div className="pt-4">
                <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/10 group">
                  <span className="material-symbols-outlined group-hover:animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  Generate Outline
                </button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-secondary-container/10 rounded-lg border border-secondary-container/20 flex gap-4 shadow-sm">
              <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
              <p className="text-xs text-on-secondary-container leading-relaxed">
                <span className="font-bold">AI Tip:</span> Universities look for specific links between your past achievements and their specific curriculum. Be sure to mention 1-2 faculty members or labs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EssayHelper;
