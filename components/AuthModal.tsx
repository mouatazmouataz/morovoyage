
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { t } from '../services/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, defaultMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Get current language from local storage or default to en
  const language = localStorage.getItem('mv_lang') || 'en';
  const isRtl = language === 'ar';

  useEffect(() => {
    if (isOpen) {
      setIsLogin(defaultMode === 'login');
      setShowPaymentOptions(false);
      setError('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [isOpen, defaultMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError(t('pass_mismatch', language));
      return;
    }

    // Simulate auth
    const user: User = {
      firstName: formData.firstName || 'Voyager',
      lastName: formData.lastName || 'User',
      email: formData.email,
      idNumber: 'ID-' + Math.random().toString(36).substr(2, 9),
      familyMembers: []
    };
    onAuthSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-slate-900">
              {isLogin ? t('welcome_back', language) : t('join_morovoyage', language)}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{t('first_name', language)}</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    value={formData.firstName}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{t('last_name', language)}</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    value={formData.lastName}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{t('email_addr', language)}</label>
              <input 
                type="email" required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, email: e.target.value})}
                value={formData.email}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{t('password', language)}</label>
              <input 
                type="password" required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, password: e.target.value})}
                value={formData.password}
              />
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{t('confirm_password', language)}</label>
                <input 
                  type="password" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  value={formData.confirmPassword}
                />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs font-bold px-2">{error}</p>
            )}

            {/* Payment Integration Button - Only for Signup */}
            {!isLogin && (
              <div className="pt-2">
                <button 
                  type="button"
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    <span className="text-xs font-black uppercase tracking-widest">{t('connect_bank', language)}</span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${showPaymentOptions ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                
                {showPaymentOptions && (
                  <div className="grid grid-cols-2 gap-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <a href="https://www.cihbank.ma" target="_blank" className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-colors group">
                      <span className="text-orange-600 font-bold text-[10px] uppercase tracking-tighter">CIH Mobile</span>
                    </a>
                    <a href="https://www.apple.com/apple-pay/" target="_blank" className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-900 hover:text-white transition-colors group">
                      <span className="font-bold text-[10px] uppercase tracking-tighter"> Pay</span>
                    </a>
                    <a href="https://www.amazon.com/amazonpay" target="_blank" className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-yellow-50 hover:border-yellow-200 transition-colors group">
                      <span className="text-yellow-600 font-bold text-[10px] uppercase tracking-tighter">Amazon Pay</span>
                    </a>
                    <a href="https://www.attijariwafabank.com" target="_blank" className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-amber-50 hover:border-amber-200 transition-colors group">
                      <span className="text-amber-700 font-bold text-[10px] uppercase tracking-tighter">Attijari</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-4">
              {isLogin ? t('login_btn', language) : t('create_account_btn', language)}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              {isLogin ? t('no_account', language) : t('has_account', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
