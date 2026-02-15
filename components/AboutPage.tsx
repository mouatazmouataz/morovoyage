import React from 'react';
import { t } from '../services/translations';
import { STORAGE_URL } from '../constants';

interface AboutPageProps {
  language: string;
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ language, onBack }) => {
  const isRtl = language === 'ar';

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={`${STORAGE_URL}about/team.jpg`} 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Students collaborating"
            onError={(e) => {
               (e.target as HTMLImageElement).src = `${STORAGE_URL}common/hero_default.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-8 animate-in slide-in-from-bottom-4 duration-700">
            <span className="text-[10px] font-black uppercase tracking-widest">Student Initiative</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            MoroVoyage Story
          </h1>
          <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Revolutionizing Moroccan mobility through student innovation and technology.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The Team</h4>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                    <div className="text-xl font-black text-slate-900 mb-1">ENSA Marrakech</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Engineering Excellence</div>
                  </div>
                  <div className="bg-blue-600 p-6 rounded-[32px] text-white shadow-xl shadow-blue-200">
                    <div className="text-xl font-black mb-1">Enactus Maroc</div>
                    <div className="text-[9px] font-black text-blue-100 uppercase tracking-widest">Social Impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-12">
              <div className="prose prose-xl">
                <h2 className="text-4xl font-black text-slate-900 mb-8">{t('about_us', language)}</h2>
                
                <p className="text-2xl text-slate-600 leading-relaxed font-medium mb-8">
                  {t('about_body_1', language)}
                </p>

                <div className="h-px w-32 bg-blue-600 my-12"></div>

                <p className="text-xl text-slate-500 leading-relaxed mb-8">
                  {t('about_body_2', language)}
                </p>

                <p className="text-xl text-slate-400 italic leading-relaxed">
                  {t('about_body_3', language)}
                </p>
              </div>

              <div className="pt-12">
                <button 
                  onClick={onBack}
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group"
                >
                  <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-50 py-24 rounded-[80px] mx-6 mb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-slate-900 mb-4">Our Commitment</h3>
            <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Building the future of travel together</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-4">Security First</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">All payments and tickets are handled directly and securely by official transport operators.</p>
            </div>
            
            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-4">Efficiency</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Save time with pre-filled travel information and centralized comparisons across all modes.</p>
            </div>

            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-4">Accessibility</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Designed by students, for everyone. Making travel across Morocco accessible to all.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;