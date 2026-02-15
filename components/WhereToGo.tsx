import React from 'react';
import { t } from '../services/translations';
import { CITY_IMAGES } from '../constants';

interface Route {
  from: string;
  to: string;
  image: string;
  descriptionKey: string;
}

const POPULAR_ROUTES: Route[] = [
  { 
    from: "Marrakech", 
    to: "Fez", 
    image: CITY_IMAGES["Marrakech"],
    descriptionKey: "route_imperial"
  },
  { 
    from: "Tangier", 
    to: "Casablanca", 
    image: CITY_IMAGES["Tangier"],
    descriptionKey: "route_coast"
  },
  { 
    from: "Rabat", 
    to: "Agadir", 
    image: CITY_IMAGES["Rabat"],
    descriptionKey: "route_atlantic"
  },
  { 
    from: "Casablanca", 
    to: "Chefchaouen", 
    image: CITY_IMAGES["Casablanca"],
    descriptionKey: "route_blue_pearl"
  },
];

interface WhereToGoProps {
  onCheckAvailability: (to: string, from?: string) => void;
  language?: string;
}

const WhereToGo: React.FC<WhereToGoProps> = ({ onCheckAvailability, language = 'en' }) => {
  const isRtl = language === 'ar';

  const getCityName = (city: string) => {
    const normalized = city === "Fez" ? "Fès" : city;
    const key = `city_${normalized.replace(/ /g, '_')}`;
    const translated = t(key, language);
    return translated === key ? city : translated;
  };

  return (
    <section id="where-to-go" className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden scroll-mt-20" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-16">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-[11px] mb-2">{t('routes_label', language)}</h4>
          <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">{t('where_to_go_title', language)}</h2>
          <p className="text-slate-500 font-medium mt-4 text-base">{t('where_to_go_desc', language)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_ROUTES.map((route, i) => (
            <div 
              key={i} 
              className="group relative h-96 rounded-[40px] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500"
              onClick={() => onCheckAvailability(route.to, route.from)}
            >
              <img 
                src={route.image} 
                alt={`${route.from} to ${route.to}`} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                   (e.target as HTMLImageElement).src = CITY_IMAGES.Default;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[8px] font-black uppercase tracking-widest mb-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full w-fit border border-white/10">
                  {t(route.descriptionKey, language)}
                </div>
                <h3 className="text-xl font-black mb-4">
                  {getCityName(route.from)} <span className="text-blue-400 mx-1">{isRtl ? '←' : '→'}</span> {getCityName(route.to)}
                </h3>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                  {t('check_availability', language)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhereToGo;
