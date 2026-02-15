import React, { useState } from 'react';
import { Leg } from '../types';
import { t } from '../services/translations';
import { Icons } from '../constants';

interface BookingPageProps {
  leg: Leg;
  date?: string;
  onBack: () => void;
  onConfirm: () => void;
  language: string;
}

interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  idType: string;
  idNumber: string;
}

const COUNTRY_CODES = [
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'KSA' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
];

const BookingPage: React.FC<BookingPageProps> = ({ leg, date, onBack, onConfirm, language }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: Date.now(), firstName: '', lastName: '', idType: 'CIN', idNumber: '' }
  ]);
  
  const [contact, setContact] = useState({
    email: '',
    countryCode: '+212',
    phone: ''
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const isRtl = language === 'ar';
  const TransportIcon = Icons[leg.type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleDownload = () => {
    window.print();
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers, 
      { id: Date.now(), firstName: '', lastName: '', idType: 'CIN', idNumber: '' }
    ]);
  };

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    }
  };

  const updatePassenger = (id: number, field: keyof Passenger, value: string) => {
    setPassengers(passengers.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  if (isConfirmed) {
    const ticketId = "MV-" + Math.random().toString(36).substr(2, 7).toUpperCase();
    
    return (
      <div className="min-h-screen bg-slate-900/95 flex items-center justify-center p-4 print:bg-white print:p-0" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="relative w-full max-w-lg animate-in zoom-in duration-500">
          
          {/* Action Buttons (Hidden when printing) */}
          <div className="absolute -top-16 left-0 right-0 flex justify-between items-center print:hidden">
             <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
               {t('return_home', language)}
             </button>
             <button 
               onClick={handleDownload}
               className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/50 flex items-center gap-2"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
               Download Ticket
             </button>
          </div>

          {/* Ticket Body */}
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl print:shadow-none print:rounded-none print:w-full">
            {/* Ticket Header */}
            <div className={`p-8 text-white relative overflow-hidden ${
              leg.type === 'Train' ? 'bg-orange-600' : 
              leg.type === 'Bus' ? 'bg-blue-600' : 
              'bg-sky-500'
            }`}>
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '20px 20px'}}></div>
               
               <div className="relative z-10 flex justify-between items-start">
                 <div>
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                       <TransportIcon />
                       <span className="text-xs font-black uppercase tracking-widest">{leg.operator}</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Boarding Pass</h2>
                 </div>
                 <div className="text-right">
                    <div className="text-xs font-black uppercase tracking-widest opacity-60">Ticket No.</div>
                    <div className="text-xl font-mono font-bold">{ticketId}</div>
                 </div>
               </div>
            </div>

            {/* Route Section */}
            <div className="p-8 pb-4">
              <div className="flex justify-between items-center mb-8">
                 <div className="text-center sm:text-left">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t('from', language)}</div>
                    <div className="text-2xl font-black text-slate-900">{leg.from}</div>
                    <div className="text-lg font-medium text-slate-500">{leg.departureTime}</div>
                 </div>
                 
                 <div className="flex-1 px-4 flex flex-col items-center">
                    <div className="w-full h-px bg-slate-200 relative top-3"></div>
                    <div className="bg-slate-50 text-slate-400 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest relative z-10">
                      {leg.duration}
                    </div>
                 </div>

                 <div className="text-center sm:text-right">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t('to', language)}</div>
                    <div className="text-2xl font-black text-slate-900">{leg.to}</div>
                    <div className="text-lg font-medium text-slate-500">{leg.arrivalTime}</div>
                 </div>
              </div>

              {/* Passenger Info Grid */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passengers ({passengers.length})</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date: {date || new Date().toISOString().split('T')[0]}</div>
                </div>
                
                <div className="space-y-3">
                  {passengers.map((p, idx) => (
                    <div key={p.id} className="flex justify-between items-center border-b last:border-0 border-slate-200 pb-2 last:pb-0">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{p.firstName} {p.lastName}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{p.idType}: {p.idNumber}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seat</div>
                        <div className="font-bold text-slate-900 text-sm">{Math.floor(Math.random() * 40) + 1}{["A", "B", "C"][Math.floor(Math.random() * 3)]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tear-off / QR Section */}
            <div className="relative">
              {/* Dashed Line / Cutouts */}
              <div className="absolute top-0 left-0 right-0 -translate-y-1/2 flex justify-between items-center">
                 <div className="w-6 h-6 bg-slate-900 rounded-full -ml-3 print:hidden"></div>
                 <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-4"></div>
                 <div className="w-6 h-6 bg-slate-900 rounded-full -mr-3 print:hidden"></div>
              </div>

              <div className="p-8 flex items-center justify-between">
                 <div className="space-y-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Price</div>
                    <div className="text-3xl font-black text-blue-600">{leg.price * passengers.length} <span className="text-sm text-slate-400">{leg.currency}</span></div>
                    <div className="text-[9px] text-green-600 font-bold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Paid
                    </div>
                 </div>
                 {/* QR Code Placeholder */}
                 <div className="bg-slate-900 p-2 rounded-xl">
                    <div className="bg-white p-1 rounded-lg">
                       <img 
                         src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticketId}-${leg.id}`} 
                         alt="QR Code" 
                         className="w-16 h-16 sm:w-20 sm:h-20"
                       />
                    </div>
                 </div>
              </div>
              
              <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                <p className="text-[9px] text-slate-400 font-medium">Show this ticket at the station/airport. Valid for {passengers.length} passenger{passengers.length > 1 ? 's' : ''}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-12 px-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black"
          >
            <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-black mb-4">{t('booking_title', language)}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-20">
        {/* Trip Summary Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 mb-8 border border-slate-100 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <TransportIcon />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{leg.operator}</div>
            <div className="text-xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-3">
              {leg.from} 
              <span className="text-slate-300">→</span> 
              {leg.to}
            </div>
            <div className="text-sm font-bold text-slate-500 mt-1">{leg.departureTime} • {leg.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-blue-600">{leg.price * passengers.length} <span className="text-sm uppercase text-slate-400">{leg.currency}</span></div>
            {passengers.length > 1 && (
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">For {passengers.length} Passengers</div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-slate-100">
          
          {/* Contact Details Section */}
          <div className="mb-10">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t('email_addr', language)} *</label>
                <input 
                  type="email" 
                  required
                  value={contact.email}
                  onChange={e => setContact({...contact, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t('phone_label', language)} *</label>
                <div className="flex bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <div className="bg-slate-100 relative w-32 border-r border-slate-200 shrink-0">
                    <select 
                      value={contact.countryCode}
                      onChange={e => setContact({...contact, countryCode: e.target.value})}
                      className="w-full h-full bg-transparent appearance-none outline-none font-bold text-slate-600 text-sm px-4 cursor-pointer relative z-10"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <div className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-400 z-0 pointer-events-none`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                  <input 
                    type="tel" 
                    required
                    value={contact.phone}
                    onChange={e => setContact({...contact, phone: e.target.value})}
                    className="flex-1 bg-transparent px-6 py-4 font-bold text-slate-800 outline-none min-w-0"
                    placeholder="6 00 00 00 00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-8"></div>

          {/* Passengers Section */}
          <div className="mb-8">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
              Passenger Details
            </h3>

            <div className="space-y-8">
              {passengers.map((passenger, index) => (
                <div key={passenger.id} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 relative animate-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Passenger {index + 1}</h4>
                    {passengers.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removePassenger(passenger.id)}
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t('first_name', language)} *</label>
                      <input 
                        type="text" 
                        required
                        value={passenger.firstName}
                        onChange={e => updatePassenger(passenger.id, 'firstName', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t('last_name', language)} *</label>
                      <input 
                        type="text" 
                        required
                        value={passenger.lastName}
                        onChange={e => updatePassenger(passenger.id, 'lastName', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t('id_type_label', language)} *</label>
                      <div className="relative">
                        <select 
                          value={passenger.idType}
                          onChange={e => updatePassenger(passenger.id, 'idType', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                        >
                          <option value="CIN">{t('cin', language)}</option>
                          <option value="Passport">{t('passport', language)}</option>
                        </select>
                        <div className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 pointer-events-none text-slate-400`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t('id_number_label', language)} *</label>
                      <input 
                        type="text" 
                        required
                        value={passenger.idNumber}
                        onChange={e => updatePassenger(passenger.id, 'idNumber', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                onClick={addPassenger}
                className="w-full py-4 border-2 border-dashed border-slate-300 rounded-[32px] text-slate-500 font-black text-xs uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Add Another Passenger
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>{t('confirm_booking', language)}</span>
            <svg className={isRtl ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;