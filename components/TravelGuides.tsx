import React from 'react';
import { t } from '../services/translations';
import { CITY_IMAGES } from '../constants';

export interface CityGuide {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
}

export const CITY_GUIDES: CityGuide[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    description: "The Red City of Endless Energy",
    image: CITY_IMAGES["Marrakech"],
    category: "Heritage",
    readTime: "6 min read"
  },
  {
    id: "fes",
    name: "Fès",
    description: "The Soul of Moroccan History",
    image: CITY_IMAGES["Fès"],
    category: "History",
    readTime: "7 min read"
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    description: "The Blue Pearl of Morocco",
    image: CITY_IMAGES["Chefchaouen"],
    category: "Culture",
    readTime: "5 min read"
  },
  {
    id: "agadir",
    name: "Agadir",
    description: "Sun, Sea, and Relaxation",
    image: CITY_IMAGES["Agadir"],
    category: "Coastal",
    readTime: "4 min read"
  },
  {
    id: "essaouira",
    name: "Essaouira",
    description: "Where Art Meets the Ocean",
    image: CITY_IMAGES["Essaouira"],
    category: "Atmospheric",
    readTime: "4 min read"
  },
  {
    id: "merzouga",
    name: "Merzouga",
    description: "Gateway to the Sahara",
    image: CITY_IMAGES["Merzouga"],
    category: "Desert",
    readTime: "5 min read"
  },
  {
    id: "casablanca",
    name: "Casablanca",
    description: "Morocco’s Modern Hub",
    image: CITY_IMAGES["Casablanca"],
    category: "Metropolis",
    readTime: "7 min read"
  },
  {
    id: "rabat",
    name: "Rabat",
    description: "Capital of Morocco",
    image: CITY_IMAGES["Rabat"],
    category: "Imperial",
    readTime: "5 min read"
  },
  {
    id: "tangier",
    name: "Tangier",
    description: "Gateway Between Africa & Europe",
    image: CITY_IMAGES["Tangier"],
    category: "Port City",
    readTime: "6 min read"
  }
];

interface TravelGuidesProps {
  language: string;
  onSelectGuide: (guide: CityGuide) => void;
  onCheckAvailability: (to: string, from?: string) => void;
  showTitle?: boolean;
}

const TravelGuides: React.FC<TravelGuidesProps> = ({ language, onSelectGuide, onCheckAvailability, showTitle = true }) => {
  const isRtl = language === 'ar';

  return (
    <section id="travel-guides" className="py-24 bg-white border-t border-slate-100 overflow-hidden scroll-mt-20" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">{t('city_guides', language)}</h4>
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t('deep_dives', language)}</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">{t('expert_curated', language)}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CITY_GUIDES.map(guide => {
            const translatedDescription = t(`city_desc_${guide.id}`, language);
            return (
              <div 
                key={guide.id} 
                className="group flex flex-col"
              >
                <div 
                  className="relative h-[450px] rounded-[48px] overflow-hidden mb-8 shadow-2xl shadow-slate-200 cursor-pointer"
                  onClick={() => onSelectGuide({ ...guide, description: translatedDescription })}
                >
                  <img 
                    src={guide.image} 
                    alt={guide.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                       (e.target as HTMLImageElement).src = CITY_IMAGES.Default;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {guide.category}
                    </span>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="text-[9px] font-black uppercase tracking-widest mb-3 opacity-60">{guide.readTime}</div>
                    <h3 className="text-3xl font-black leading-tight group-hover:text-blue-400 transition-colors">{guide.name}</h3>
                  </div>
                </div>
                
                <div className="px-4">
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-2">
                    {translatedDescription}
                  </p>
                  <button 
                    onClick={() => onCheckAvailability(guide.name)}
                    className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors group/btn"
                  >
                    {t('check_availability', language)}
                    <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelGuides;
