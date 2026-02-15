
import React, { useState, useEffect } from 'react';

interface CustomDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  minDate: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ 
  isOpen, 
  onClose, 
  selectedDate, 
  onSelectDate, 
  minDate 
}) => {
  const [viewDate, setViewDate] = useState(new Date());

  const parseDate = (str: string) => {
    if (!str) return new Date();
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  useEffect(() => {
    if (isOpen) {
      setViewDate(parseDate(selectedDate || minDate));
    }
  }, [isOpen, selectedDate, minDate]);

  if (!isOpen) return null;

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const renderMonth = (offset: number) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth() + offset;
    const date = new Date(year, month, 1);
    
    // Normalize date for display
    const displayYear = date.getFullYear();
    const displayMonth = date.getMonth();

    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const startDay = new Date(displayYear, displayMonth, 1).getDay(); // 0 is Sunday

    const days = [];
    // Padding
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="w-10 h-10" />);
    }
    
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDateString = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = dayDateString === selectedDate;
      const isPast = dayDateString < minDate;

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelectDate(dayDateString);
          }}
          className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all
            ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50 text-slate-700'}
            ${isPast ? 'opacity-30 cursor-not-allowed' : ''}
          `}
        >
          {d}
        </button>
      );
    }

    return (
      <div className="w-full px-4">
        <div className="text-center font-bold text-slate-900 mb-6 text-base">
          {date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 gap-x-0 place-items-center">
          {days}
        </div>
      </div>
    );
  };

  const formatDate = (d: string) => {
    if (!d) return '';
    const date = parseDate(d);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-transparent" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
      
      {/* Calendar Popup */}
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 p-6 z-50 w-[360px] cursor-default" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header Inputs */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white border-2 border-blue-600 rounded-xl px-4 py-3 relative shadow-sm cursor-pointer">
             <div className="flex items-center gap-3 text-slate-900 font-bold">
               <svg className="w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
               <span className="text-base">{formatDate(selectedDate)}</span>
             </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="relative">
           <button onClick={handlePrevMonth} className="absolute left-0 top-0 p-2 hover:bg-slate-100 rounded-full z-10 -ml-2 transition-colors">
             <svg className="w-6 h-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <button onClick={handleNextMonth} className="absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-full z-10 -mr-2 transition-colors">
             <svg className="w-6 h-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
           </button>
           
           <div className="w-full">
             {renderMonth(0)}
           </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center mt-8 pt-6 border-t border-slate-100">
           <button 
             onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
             className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200 active:scale-95"
           >
             Done
           </button>
        </div>
      </div>
    </>
  );
};
