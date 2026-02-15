
import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../types';

interface FamilyManagerProps {
  onClose: () => void;
}

const FamilyManager: React.FC<FamilyManagerProps> = ({ onClose }) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ firstName: '', lastName: '', idNumber: '' });

  useEffect(() => {
    const saved = localStorage.getItem('mv_family');
    if (saved) setMembers(JSON.parse(saved));
  }, []);

  const saveToLocal = (updated: FamilyMember[]) => {
    setMembers(updated);
    localStorage.setItem('mv_family', JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const member: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      ...newMember
    };
    saveToLocal([...members, member]);
    setShowAdd(false);
    setNewMember({ firstName: '', lastName: '', idNumber: '' });
  };

  const removeMember = (id: string) => {
    saveToLocal(members.filter(m => m.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Family Members</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">One-time info, travel forever</p>
            </div>
            <button onClick={onClose} className="bg-slate-50 p-2 rounded-2xl text-slate-400 hover:text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {members.map(member => (
              <div key={member.id} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl border border-slate-100">
                    {member.firstName[0]}{member.lastName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{member.firstName} {member.lastName}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{member.idNumber}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeMember(member.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-2 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            ))}

            <button 
              onClick={() => setShowAdd(true)}
              className="border-2 border-dashed border-slate-200 p-6 rounded-[32px] flex items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              <span className="font-bold">Add Member</span>
            </button>
          </div>

          {showAdd && (
            <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-[40px] animate-in slide-in-from-top-4">
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">First Name</label>
                    <input 
                      required
                      className="w-full bg-white border-transparent rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={e => setNewMember({...newMember, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Last Name</label>
                    <input 
                      required
                      className="w-full bg-white border-transparent rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={e => setNewMember({...newMember, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">CIN or Passport</label>
                  <input 
                    required
                    className="w-full bg-white border-transparent rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={e => setNewMember({...newMember, idNumber: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-bold">Save Member</button>
                  <button type="button" onClick={() => setShowAdd(false)} className="px-6 py-3 text-slate-400 font-bold">Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyManager;
