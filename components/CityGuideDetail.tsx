import React, { useEffect } from 'react';
import { CityGuide } from './TravelGuides';
import { t } from '../services/translations';
import { CITY_IMAGES, FOOD_IMAGES } from '../constants';

interface DetailSection {
  title: string;
  icon: string;
  items: { title: string; description: string; image: string }[];
  isComingSoon?: boolean;
}

const getCityDetails = (cityId: string, language: string): DetailSection[] => {
  const rawDetails: Record<string, DetailSection[]> = {
    marrakech: [
      {
        title: t('section_go', language),
        icon: "📍",
        items: [
          { title: "Jemaa el-Fna", description: "The lively central square with food, performers, and storytellers.", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=800&auto=format&fit=crop" },
          { title: "Medina & Souks", description: "A labyrinth of vibrant markets selling spices, carpets, and crafts.", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop" },
          { title: "Koutoubia Mosque", description: "Iconic Moroccan architecture and the spiritual beacon of the city.", image: "https://images.unsplash.com/photo-1548047457-1968e637cb3a?q=80&w=800&auto=format&fit=crop" }
        ]
      },
      {
        title: t('section_eat', language),
        icon: "🍽️",
        items: [
          { title: "Tagine", description: "Slow-cooked Moroccan favorite with tender meat and vegetables.", image: FOOD_IMAGES["Tagine"] },
          { title: "Couscous", description: "The national dish, typically served on Fridays.", image: FOOD_IMAGES["Couscous"] }
        ]
      },
      { title: t('section_sleep', language), icon: "🏨", isComingSoon: true, items: [] }
    ],
    fes: [
      {
        title: t('section_go', language),
        icon: "📍",
        items: [
          { title: "Fes el-Bali Medina", description: "The world's largest car-free urban area and a UNESCO site.", image: CITY_IMAGES["Fès"] },
          { title: "Chouara Tannery", description: "Iconic leather dyeing pits that have operated for centuries.", image: "https://images.unsplash.com/photo-1549944850-84e00be4203b?q=80&w=800&auto=format&fit=crop" }
        ]
      },
      {
        title: t('section_eat', language),
        icon: "🍽️",
        items: [
          { title: "Pastilla", description: "Sweet and savory pie with almonds and pigeon or chicken.", image: FOOD_IMAGES["Default"] }
        ]
      },
      { title: t('section_sleep', language), icon: "🏨", isComingSoon: true, items: [] }
    ],
    chefchaouen: [
      {
        title: t('section_go', language),
        icon: "📍",
        items: [
          { title: "Blue Medina Streets", description: "Endless photo opportunities in the mesmerizing blue-washed alleys.", image: CITY_IMAGES["Chefchaouen"] },
          { title: "Spanish Mosque", description: "A gentle hike leads to the best sunset views over the town.", image: "https://images.unsplash.com/photo-1548047457-1968e637cb3a?q=80&w=800&auto=format&fit=crop" }
        ]
      },
      {
        title: t('section_eat', language),
        icon: "🍽️",
        items: [
          { title: "Goat Cheese", description: "Famous local specialty, fresh and creamy from the Rif mountains.", image: FOOD_IMAGES["Default"] }
        ]
      },
      { title: t('section_sleep', language), icon: "🏨", isComingSoon: true, items: [] }
    ]
  };

  const getDefaultDetails = (city: string): DetailSection[] => [
    {
      title: t('section_go', language),
      icon: "🗺️",
      items: [{ title: `${city} Medina`, description: "Explore the historic center and vibrant markets.", image: CITY_IMAGES.Default }]
    },
    {
      title: t('section_eat', language),
      icon: "🍴",
      items: [{ title: "Local Cuisine", description: "Taste the unique regional spices and traditional dishes.", image: FOOD_IMAGES.Default }]
    },
    { title: t('section_sleep', language), icon: "🏠", isComingSoon: true, items: [] }
  ];

  return rawDetails[cityId] || getDefaultDetails(cityId);
};

interface CityGuideDetailProps {
  guide: CityGuide;
  onBack: () => void;
  onCheckAvailability: (cityName: string) => void;
}

const CityGuideDetail: React.FC<CityGuideDetailProps> = ({ guide, onBack, onCheckAvailability }) => {
  const language = localStorage.getItem('mv_lang') || 'en';
  const sections = getCityDetails(guide.id, language);
  const isRtl = language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guide.id]);

  return (
    <div className="min-h-screen bg-slate-50" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Immersive Hero Section */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img 
          src={guide.image} 
          className="absolute inset-0 w-full h-full object-cover"
          alt={guide.name}
          onError={(e) => {
             (e.target as HTMLImageElement).src = CITY_IMAGES.Default;
          }}
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-32">
          <button 
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-3 text-white/80 font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors group self-start backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <svg className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'} group-hover:${isRtl ? 'translate-x-1' : '-translate-x-1'} transition-transform`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            {t('back_to_guides', language)}
          </button>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            {guide.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-medium leading-relaxed drop-shadow-md border-l-4 border-blue-500 pl-6">
            {guide.description}
          </p>
          
          <div className="mt-10">
            <button 
              onClick={() => onCheckAvailability(guide.name)}
              className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-900/20 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 w-fit"
            >
              <span>{t('find_routes_to', language)} {guide.name}</span>
              <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Content Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-24 mt-32 relative z-10 space-y-16">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-6 mb-10 border-b border-slate-50 pb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                {section.icon}
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900">{section.title}</h3>
              </div>
            </div>

            {section.isComingSoon ? (
              <div className="h-48 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-center">
                <span className="text-4xl opacity-30">🚧</span>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{t('coming_soon_text', language)}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group cursor-default">
                    <div className="aspect-[4/3] rounded-[32px] overflow-hidden mb-5 shadow-lg relative bg-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                           (e.target as HTMLImageElement).src = CITY_IMAGES.Default;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityGuideDetail;
