
import React from 'react';
import { Itinerary, Leg } from '../types';
import { Icons } from '../constants';
import { t } from '../services/translations';

interface TripCardProps {
  trip: Itinerary;
  onBook?: (leg: Leg) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onBook }) => {
  const lang = localStorage.getItem('mv_lang') || 'en';
  const isRtl = lang === 'ar';

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-8 hover:shadow-2xl transition-all group relative">
      {/* Label for Direct/Connection */}
      <div className={`absolute top-0 ${isRtl ? 'left-8' : 'right-8'} -translate-y-1/2 flex gap-2`}>
        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
          trip.isDirect ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'
        }`}>
          {trip.isDirect ? t('direct', lang) : `${trip.legs.length - 1} ${t('connection', lang)}`}
        </div>
      </div>

      <div className="space-y-6">
        {trip.legs.map((leg, index) => {
          const Icon = Icons[leg.type];
          return (
            <React.Fragment key={leg.id}>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex items-center gap-4 min-w-[140px]">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Icon />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 text-xs uppercase block">{leg.operator}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{t(leg.type.toLowerCase(), lang)}</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-between gap-6 w-full">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-black text-slate-900">{leg.departureTime}</h4>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{leg.from}</p>
                  </div>
                  
                  <div className="flex-1 h-px bg-slate-100 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[8px] font-black text-blue-500 uppercase">
                       {leg.duration}
                     </div>
                  </div>

                  <div className="text-center md:text-right">
                    <h4 className="text-xl font-black text-slate-900">{leg.arrivalTime}</h4>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{leg.to}</p>
                  </div>
                </div>
              </div>

              {/* Transfer indicator */}
              {index < trip.legs.length - 1 && (
                <div className="py-2 flex items-center gap-4 ml-6 md:ml-[160px]">
                  <div className="w-px h-8 border-l-2 border-dashed border-amber-300"></div>
                  <div className="bg-amber-50 text-amber-700 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {t('transfer_at', lang)} {leg.to}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer / Total Price */}
      <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-10">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{t('total_duration', lang)}</label>
            <span className="text-sm font-black text-slate-900">{trip.isDirect ? trip.legs[0].duration : 'Flexible'}</span>
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{t('total_price', lang)}</label>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-blue-600">{trip.totalPrice}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase">{trip.currency}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {trip.legs.map((leg, i) => (
             <button 
               key={leg.id}
               onClick={() => onBook && onBook(leg)}
               className={`flex-1 md:flex-none px-6 py-3 rounded-2xl font-black uppercase text-[9px] tracking-widest transition-all text-center cursor-pointer ${
                 i === 0 ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
               }`}
             >
               {trip.isDirect ? t('select_seat', lang) : `${t('select_seat', lang)} ${i+1}`}
             </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
