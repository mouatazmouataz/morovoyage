import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { LANGUAGES, t } from '../services/translations';

interface NavbarProps {
  user: User | null;
  language: string;
  setLanguage: (lang: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenFamily: () => void;
  onOpenSupport: () => void;
  onViewChange: (view: 'home' | 'about' | 'discover' | 'legal', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, language, setLanguage, onOpenAuth, onLogout, onOpenFamily, onOpenSupport, onViewChange }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <button onClick={() => onViewChange('home')} className="flex items-center gap-3 group transition-transform active:scale-95">
            {/* Custom SVG Logo based on MoroVoyage Travel Society design */}
            <div className="w-12 h-12 relative flex-shrink-0">
               <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                 {/* M Shape - Terracotta */}
                 <path d="M20 100 V 30 L 60 70 L 100 30 V 100" stroke="#CD7F32" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                 
                 {/* Train Silhouette - Dark Brown */}
                 <path d="M10 65 H 110" stroke="#3E2723" strokeWidth="14" strokeLinecap="round" />
                 {/* Windows - White/Transparent */}
                 <path d="M25 65 H 35 M 50 65 H 60 M 75 65 H 85" stroke="white" strokeWidth="6" strokeLinecap="round" />
                 
                 {/* Moon - Dark Brown */}
                 <path d="M60 10 A 8 8 0 1 1 52 17 A 6 6 0 1 0 60 10" fill="#3E2723" />
                 
                 {/* Stars - Dark Brown */}
                 <path d="M35 20 L36 22 H38 L36.5 23 L37 25 L35 23.5 L33 25 L33.5 23 L32 22 H34 Z" fill="#3E2723" />
                 <path d="M85 20 L86 22 H88 L86.5 23 L87 25 L85 23.5 L83 25 L83.5 23 L82 22 H84 Z" fill="#3E2723" />
               </svg>
            </div>
            
            <div className="flex flex-col items-start -space-y-1">
               <span className="text-xl font-black text-[#3E2723] uppercase tracking-tighter leading-none group-hover:text-[#CD7F32] transition-colors">MoroVoyage</span>
               <span className="text-[9px] font-black text-[#CD7F32] uppercase tracking-[0.3em] leading-none ml-0.5">Travel Society</span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center space-x-10 text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">
            <button onClick={() => onViewChange('discover')} className="hover:text-blue-600 transition-all">{t('discover_morocco', language)}</button>
            <button onClick={() => onViewChange('about')} className="hover:text-blue-600 transition-all">{t('about_us', language)}</button>
            <button onClick={onOpenSupport} className="hover:text-blue-600 transition-all">{t('support', language)}</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200 text-slate-800 font-black text-[10px] uppercase tracking-widest"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span>{currentLang.code}</span>
                <svg className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 py-3 z-[70]">
                  <div className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Select Language</div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        className={`w-full flex items-center gap-4 px-5 py-3 text-xs font-black transition-all ${
                          language === lang.code ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="uppercase tracking-widest">{lang.name}</span>
                        {language === lang.code && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                      {user.firstName[0]}
                    </div>
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{user.firstName}</span>
                  </div>
                  <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onOpenAuth('login')} 
                    className="text-slate-800 hover:text-blue-600 font-black text-[11px] uppercase tracking-widest px-4"
                  >
                    {t('login', language)}
                  </button>
                  <button 
                    onClick={() => onOpenAuth('signup')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                  >
                    {t('signup', language)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;