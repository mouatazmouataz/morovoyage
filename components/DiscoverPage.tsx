import React from 'react';
import TravelGuides, { CityGuide } from './TravelGuides';
import VisualGallery from './VisualGallery';
import { t } from '../services/translations';
import { CITY_IMAGES } from '../constants';

interface DiscoverPageProps {
  language: string;
  onSelectGuide: (guide: CityGuide) => void;
  onCompareTransport: () => void;
  onCheckAvailability: (cityName: string) => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ language, onSelectGuide, onCompareTransport, onCheckAvailability }) => {
  const isRtl = language === 'ar';

  return (
    <div className="bg-white min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
              {t('discover_title', language)}: <span className="text-blue-600 block md:inline">{t('discover_subtitle', language)}</span>
            </h2>
            
            {/* Collage Hero */}
            <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[600px] mb-12">
              <div className="col-span-8 rounded-[40px] overflow-hidden shadow-2xl relative">
                <img src={CITY_IMAGES["Merzouga"]} className="w-full h-full object-cover" alt="Sahara Dunes" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white text-xs font-black uppercase tracking-widest">{t('sahara_dunes_label', language)}</div>
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="flex-1 rounded-[40px] overflow-hidden shadow-xl relative">
                  <img src={CITY_IMAGES["Chefchaouen"]} className="w-full h-full object-cover" alt="Chefchaouen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="flex-1 rounded-[40px] overflow-hidden shadow-xl relative">
                  <img src={CITY_IMAGES["Marrakech"]} className="w-full h-full object-cover" alt="Atlas Mountains" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8 text-left mb-16">
              {t('discover_quote', language)}
            </p>
          </div>

          {/* Narrative Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl">🏛</span>
                  <h3 className="text-2xl font-black text-slate-900">{t('why_morocco_title', language)}</h3>
                </div>
                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                  {t('why_morocco_desc', language)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl">📍</span>
                  <h3 className="text-2xl font-black text-slate-900">{t('experiences_title', language)}</h3>
                </div>
                <ul className="space-y-8">
                  {[
                    { title: t('exp_imperial_title', language), desc: t('exp_imperial_desc', language) },
                    { title: t('exp_blue_pearl_title', language), desc: t('exp_blue_pearl_desc', language) },
                    { title: t('exp_sahara_title', language), desc: t('exp_sahara_desc', language) },
                    { title: t('exp_coastal_title', language), desc: t('exp_coastal_desc', language) }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-3 shrink-0"></div>
                      <div>
                        <span className="text-xl font-black text-slate-900 block mb-1">{item.title}</span>
                        <span className="text-lg text-slate-500 font-medium leading-relaxed">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[60px] p-12 text-white flex flex-col justify-between shadow-2xl">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🗓</span>
                  <h3 className="text-2xl font-black">{t('best_time_title', language)}</h3>
                </div>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">
                  {t('best_time_desc', language)}
                </p>

                <div className="h-px bg-white/10"></div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">💰</span>
                    <h3 className="text-2xl font-black">{t('practical_tips_title', language)}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                      <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest block mb-2">{t('tip_money_title', language)}</span>
                      <p className="text-base font-medium leading-relaxed">{t('tip_money_desc', language)}</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                      <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest block mb-2">{t('tip_culture_title', language)}</span>
                      <p className="text-base font-medium leading-relaxed">{t('tip_culture_desc', language)}</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                      <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest block mb-2">{t('tip_hospitality_title', language)}</span>
                      <p className="text-base font-medium leading-relaxed">{t('tip_hospitality_desc', language)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* New Visual Gallery Section */}
          <VisualGallery />

          {/* Transport Section */}
          <div className="mt-24 mb-32 bg-blue-600 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <svg className="w-96 h-96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">🚆</span>
                <h3 className="text-4xl font-black">{t('transport_title', language)}</h3>
              </div>
              <p className="text-xl text-blue-100 font-medium leading-relaxed mb-10">
                {t('transport_desc', language)}
              </p>
              <button 
                onClick={onCompareTransport}
                className="bg-white text-blue-600 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-50 transition-colors"
              >
                {t('compare_transport_btn', language)}
              </button>
            </div>
          </div>

          {/* City Detail Grid */}
          <div className="text-center mb-16">
            <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">{t('explore_more_label', language)}</h4>
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t('ready_to_explore_title', language)}</h2>
          </div>
          <TravelGuides language={language} onSelectGuide={onSelectGuide} onCheckAvailability={onCheckAvailability} showTitle={false} />
        </div>
      </section>
    </div>
  );
};

export default DiscoverPage;
