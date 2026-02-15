import React, { useState, useEffect } from 'react';
import { CITIES, CITY_IMAGES } from '../constants';
import { SearchParams } from '../types';
import { t } from '../services/translations';
import { CustomDatePicker } from './CustomDatePicker';

interface HeroProps {
  onSearch: (params: SearchParams) => void;
  language: string;
  prefillTo?: string;
}

// Robust helper to get local date in YYYY-MM-DD format
const getLocalDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to format date for display (DD/MM/YYYY)
const formatDateForDisplay = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
};

const Hero: React.FC<HeroProps> = ({ onSearch, language, prefillTo }) => {
  const [today] = useState(getLocalDateString());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [params, setParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: today
  });

  const [bgImage, setBgImage] = useState(CITY_IMAGES.Default);

  useEffect(() => {
    if (prefillTo) {
      setParams(prev => ({ ...prev, to: prefillTo }));
    }
  }, [prefillTo]);

  useEffect(() => {
    if (params.to && CITY_IMAGES[params.to]) {
      setBgImage(CITY_IMAGES[params.to]);
    } else {
      setBgImage(CITY_IMAGES.Default);
    }
  }, [params.to]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.from && params.to) {
      onSearch(params);
    }
  };

  const isRtl = language === 'ar';

  const getCityName = (city: string) => {
    const key = `city_${city.replace(/ /g, '_')}`;
    const translated = t(key, language);
    return translated === key ? city : translated;
  };

  return (
    <div className="relative pt-32 pb-40" id="home-search" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          key={bgImage}
          src={bgImage} 
          className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] transition-opacity duration-1000 animate-in fade-in"
          alt="Moroccan landscape"
          onError={(e) => {
            (e.target as HTMLImageElement).src = CITY_IMAGES.Default;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tight drop-shadow-2xl">
          {t('hero_line_1', language)}
        </h1>
        <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-300 drop-shadow-xl">
          {t('hero_line_2', language)}
        </h2>
        <p className="text-xl md:text-2xl text-white mb-20 max-w-2xl mx-auto font-bold drop-shadow-lg opacity-90">
          {t('hero_description', language)}
        </p>

        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-stretch border border-white/40"
          >
            {/* FROM SELECTOR */}
            <div className="flex-1 w-full flex flex-col items-start px-8 py-4 group cursor-pointer hover:bg-slate-50 rounded-[40px] transition-colors">
              <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-1 group-hover:text-blue-600 transition-colors">{t('from', language)}</label>
              <div className="relative w-full">
                <select 
                  className="w-full bg-transparent text-slate-800 font-bold focus:outline-none appearance-none cursor-pointer text-lg pr-8"
                  value={params.from}
                  onChange={(e) => setParams({ ...params, from: e.target.value })}
                  required
                >
                  <option value="">{t('from', language)}</option>
                  {CITIES.map(c => <option key={c} value={c}>{getCityName(c)}</option>)}
                </select>
                <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 pointer-events-none text-slate-400`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <div className="w-px h-12 bg-slate-100"></div>
            </div>

            {/* TO SELECTOR */}
            <div className="flex-1 w-full flex flex-col items-start px-8 py-4 group cursor-pointer hover:bg-slate-50 rounded-[40px] transition-colors">
              <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-1 group-hover:text-blue-600 transition-colors">{t('to', language)}</label>
              <div className="relative w-full">
                <select 
                  className="w-full bg-transparent text-slate-800 font-bold focus:outline-none appearance-none cursor-pointer text-lg pr-8"
                  value={params.to}
                  onChange={(e) => setParams({ ...params, to: e.target.value })}
                  required
                >
                  <option value="">{t('to', language)}</option>
                  {CITIES.filter(c => c !== params.from).map(c => <option key={c} value={c}>{getCityName(c)}</option>)}
                </select>
                <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 pointer-events-none text-slate-400`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <div className="w-px h-12 bg-slate-100"></div>
            </div>

            {/* DATE SELECTOR (CUSTOM) */}
            <div 
              className="flex-1 w-full flex flex-col items-start px-8 py-4 group cursor-pointer hover:bg-slate-50 rounded-[40px] transition-colors relative"
              onClick={() => setIsDatePickerOpen(true)}
            >
              <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-1 group-hover:text-blue-600 transition-colors">{t('date', language)}</label>
              <div className="flex items-center gap-3 w-full">
                <svg className="w-4 h-4 text-slate-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                
                <span className="text-slate-800 font-bold text-lg select-none">
                  {formatDateForDisplay(params.date)}
                </span>
              </div>

              <CustomDatePicker 
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                selectedDate={params.date}
                minDate={today}
                onSelectDate={(d) => {
                  setParams({ ...params, date: d });
                  setIsDatePickerOpen(false);
                }}
              />
            </div>

            <div className="p-2 flex items-center">
              <button 
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[40px] font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/40 active:scale-95 h-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                {t('search', language)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
