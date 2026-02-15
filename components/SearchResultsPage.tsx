
import React, { useState, useMemo } from 'react';
import { Trip, TransportType, SearchParams, Leg } from '../types';
import TripCard from './TripCard';
import { t } from '../services/translations';
import { Icons } from '../constants';

interface SearchResultsPageProps {
  results: Trip[];
  isLoading: boolean;
  searchParams: SearchParams;
  onBack: () => void;
  onBook: (leg: Leg) => void;
  language: string;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ 
  results, 
  isLoading, 
  searchParams, 
  onBack,
  onBook,
  language 
}) => {
  const [filterType, setFilterType] = useState<TransportType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'price' | 'time'>('price');
  const isRtl = language === 'ar';

  const filteredAndSortedTrips = useMemo(() => {
    let res = [...results];
    if (filterType !== 'All') res = res.filter(t => t.type === filterType);
    if (sortBy === 'price') res.sort((a, b) => a.totalPrice - b.totalPrice);
    if (sortBy === 'time') res.sort((a, b) => (a.legs[0]?.departureTime || '').localeCompare(b.legs[0]?.departureTime || ''));
    return res;
  }, [results, filterType, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 pb-24" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-12 px-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black"
          >
            <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {t('back_to_guides', language)}
          </button>
          
          <h1 className="text-3xl md:text-5xl font-black mb-2">
            {searchParams.from} <span className="text-blue-500 mx-2">{isRtl ? '←' : '→'}</span> {searchParams.to}
          </h1>
          <p className="text-white/60 font-bold flex items-center gap-2">
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {searchParams.date}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">{t('available_trips', language)}</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              {isLoading ? 'Fetching live schedules...' : `${filteredAndSortedTrips.length} routes found`}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex bg-white border border-slate-200 p-1 rounded-2xl shadow-sm">
              {(['All', 'Train', 'Bus', 'Flight'] as const).map((type) => {
                const Icon = type === 'All' ? null : Icons[type];
                return (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filterType === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {Icon && <Icon />}
                    {t(type.toLowerCase(), language)}
                  </button>
                );
              })}
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price">Sort by Price</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-[40px] border border-slate-100 animate-pulse"></div>
            ))
          ) : filteredAndSortedTrips.length > 0 ? (
            filteredAndSortedTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} onBook={onBook} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No trips found for this criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
