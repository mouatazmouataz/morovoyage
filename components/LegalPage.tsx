import React, { useEffect } from 'react';

interface LegalPageProps {
  language: string;
  onBack: () => void;
  sectionId?: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ language, onBack, sectionId }) => {
  const isRtl = language === 'ar';

  useEffect(() => {
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [sectionId]);

  const sections = [
    {
      id: 'help-center',
      title: 'Help Center',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      ),
      content: 'Access customer support, booking assistance, platform guidance, and frequently asked questions.'
    },
    {
      id: 'safety',
      title: 'Safety Guidelines',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ),
      content: 'Discover our travel safety standards, user responsibilities, and recommendations for safe and responsible travel.'
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      ),
      content: 'Review the legal terms, conditions, and user obligations governing access to and use of the MoroVoyage platform.'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      ),
      content: 'Learn how MoroVoyage collects, processes, stores, and protects personal data in accordance with applicable data protection regulations.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-12 px-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black"
          >
            <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Legal & Support</h1>
          <p className="text-white/60 text-lg font-medium max-w-2xl">Everything you need to know about using MoroVoyage safely and securely.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        {sections.map(section => (
          <div key={section.id} id={section.id} className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-100 scroll-mt-32">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                {section.icon}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">{section.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {section.content}
                </p>
                <div className="mt-6">
                  <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                    Read Full Document
                    <svg className={isRtl ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;