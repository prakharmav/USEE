import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const Chat = () => {
  const user = useAuthStore(state => state.user);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      time: 'Just now',
      content: "Hello " + (user?.name?.split(' ')[0] || 'Alex') + "! I am your Eduvion Horizon concierge. Whether you're looking for the perfect university in Boston or calculating your student loan ROI, I'm here to curate your journey. How can we elevate your education today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isCurating, setIsCurating] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', time: 'Just now', content: input }]);
    setInput('');
    setIsCurating(true);
    setTimeout(() => {
      setIsCurating(false);
      setMessages(prev => [...prev, {
        role: 'ai',
        time: 'Just now',
        content: "I've analyzed your query regarding that. Based on the current academic database, MIT and similar institutions emphasize a holistic profile. For your specific background, focusing on the Quantitative section of the GRE while maintaining a 3.8+ GPA would be ideal."
      }]);
    }, 2000);
  };

  return (
    <div className="flex-grow flex w-full relative bg-surface overflow-hidden h-[calc(100vh-80px)]">
      {/* Navigation Drawer (Sidebar) */}
      <aside className="hidden lg:flex w-80 flex-col h-full bg-slate-100 dark:bg-slate-900 border-r border-[#efedf1] dark:border-slate-800 transition-all duration-300">
        <div className="p-6 flex items-center space-x-4">
          <img 
            className="w-12 h-12 rounded-full object-cover" 
            alt="User profile" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANRjzWF3D0UGBeqXS_4-vKh-CHODdC7NxnBpEnbiX9Ws-SUEvJse8suNqLt3uWyFbSWjA5o6Ie8O1a6iePDritpIpkNpsfmmOZp4nCTzjwglgRqX-fU2igtyJVgQUiYceBrC424SsqCbGSw0j3h3uUJCX1sNXYasj1t8CjBjIS1Eprw_vNubo2mV47swcmBUNN12SGOyOPKFUkc5IKusUFV-vt-ri8kdac3nTZ28-dK35WebUFwWwKFx8qPhCg719JgfSQjIzwsu_X"
          />
          <div>
            <h3 className="text-[#002045] dark:text-white text-lg font-black leading-tight">{user?.name || 'Alex Chen'}</h3>
            <p className="text-slate-500 text-xs">Intelligent Voyager</p>
            <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full mt-1 inline-block">Premium Member</span>
          </div>
        </div>
        
        <nav className="mt-4 px-4 flex-1">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 px-4 mb-2">Advisors</p>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 mx-2 hover:text-blue-900 hover:bg-white/50 transition-all rounded-xl text-left">
              <span className="material-symbols-outlined">work</span>
              <span>Career Advisor</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 mx-2 hover:text-blue-900 hover:bg-white/50 transition-all rounded-xl text-left">
              <span className="material-symbols-outlined">payments</span>
              <span>Loan Advisor</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 mx-2 hover:text-blue-900 hover:bg-white/50 transition-all rounded-xl text-left">
              <span className="material-symbols-outlined">description</span>
              <span>Visa Guide</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 rounded-xl mx-2 shadow-sm text-left">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              <span>General Chat</span>
            </button>
          </div>
          
          <div className="mt-10 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 px-4 mb-2">History</p>
            <div className="px-4 py-2 text-xs text-slate-400 font-bold uppercase tracking-wider">Today</div>
            <button className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-white/50 transition-all rounded-xl text-slate-600 text-xs">
              <span className="material-symbols-outlined text-sm">history</span>
              <span className="truncate">GRE preparation timeline...</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Chat Canvas */}
      <main className="flex-1 flex flex-col relative h-full bg-surface-container-low overflow-hidden">
        {/* Top Pills */}
        <div className="flex justify-center flex-wrap gap-2 py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-20 border-b border-[#efedf1] dark:border-slate-800">
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-on-primary shadow-md">General Chat</button>
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all">Career Advisor</button>
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all">Loan Advisor</button>
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all">Visa Guide</button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-6 md:px-24 py-8 space-y-8 flex flex-col pb-48">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start space-x-4 max-w-3xl ${msg.role === 'user' ? 'self-end flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'ai' ? 'bg-primary' : 'bg-secondary'}`}>
                <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {msg.role === 'ai' ? 'smart_toy' : 'person'}
                </span>
              </div>
              <div className={`p-5 rounded-2xl shadow-sm text-sm leading-relaxed border ${msg.role === 'ai' ? 'bg-white text-on-surface rounded-tl-none border-[#efedf1]' : 'bg-primary-container text-white rounded-tr-none border-transparent'}`}>
                <p>{msg.content}</p>
                <p className={`text-[10px] mt-2 opacity-50 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isCurating && (
            <div className="flex items-start space-x-4 max-w-3xl">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-[#efedf1] w-full">
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">Eduvion Analysis</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
                </div>
                <div className="mt-4 flex items-center text-secondary">
                  <span className="w-1.5 h-4 bg-secondary rounded-full animate-bounce mr-2"></span>
                  <span className="text-xs italic">Consulting academic database...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-surface to-transparent">
          <div className="max-w-4xl mx-auto">
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              <button 
                onClick={() => setInput("What GRE score do I need for MIT?")}
                className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-medium border border-transparent hover:border-secondary transition-all"
              >
                What GRE score do I need for MIT?
              </button>
              <button 
                onClick={() => setInput("How much loan can I get?")}
                className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-medium border border-transparent hover:border-secondary transition-all"
              >
                How much loan can I get?
              </button>
            </div>
            
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border border-[#efedf1] dark:border-slate-800 flex flex-col">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 text-sm p-4 h-24 resize-none placeholder-slate-400" 
                placeholder="Ask anything about your global education journey..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex items-center space-x-3">
                  <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">attachment</button>
                  <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">mic</button>
                </div>
                <button 
                  onClick={handleSend}
                  className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-all shadow-md flex items-center justify-center"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">Powered by Eduvion Intelligence • v2.4.0</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
