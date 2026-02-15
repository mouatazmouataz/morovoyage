import React from 'react';

interface FooterProps {
  onViewChange?: (view: 'home' | 'about' | 'discover' | 'legal', sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-2xl font-bold tracking-tight">MoroVoyage</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm font-medium">
              Morocco's leading travel comparison platform. We bring all transport options together to make your journey through the Kingdom seamless and unforgettable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-all hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 cursor-pointer transition-all hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-all hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] text-blue-500">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><button onClick={() => onViewChange?.('about')} className="hover:text-blue-400 transition-colors">About Us</button></li>
              <li><button onClick={() => onViewChange?.('discover')} className="hover:text-blue-400 transition-colors text-left">Discover Morocco</button></li>
              <li><button onClick={() => onViewChange?.('home')} className="hover:text-blue-400 transition-colors text-left">Search Routes</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] text-blue-500">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><button onClick={() => onViewChange?.('legal', 'help-center')} className="hover:text-blue-400 transition-colors text-left">Help Center</button></li>
              <li><button onClick={() => onViewChange?.('legal', 'safety')} className="hover:text-blue-400 transition-colors text-left">Safety Guidelines</button></li>
              <li><button onClick={() => onViewChange?.('legal', 'terms')} className="hover:text-blue-400 transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={() => onViewChange?.('legal', 'privacy')} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MoroVoyage – ENSA Marrakech × Enactus Initiative.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">English (US)</span>
            <span className="cursor-pointer hover:text-white transition-colors">MAD (DH)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;