import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripCard from './components/TripCard';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FamilyManager from './components/FamilyManager';
import AboutPage from './components/AboutPage';
import WhereToGo from './components/WhereToGo';
import TravelGuides, { CityGuide } from './components/TravelGuides';
import CityGuideDetail from './components/CityGuideDetail';
import DiscoverPage from './components/DiscoverPage';
import SupportModal from './components/SupportModal';
import SearchResultsPage from './components/SearchResultsPage';
import BookingPage from './components/BookingPage';
import LegalPage from './components/LegalPage';
import { SearchParams, Trip, TransportType, User, Leg } from './types';
import { fetchLiveTrips } from './services/transportApi';
import { t } from './services/translations';
import { Icons } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('en');
  const [view, setView] = useState<'home' | 'about' | 'city-guide' | 'discover' | 'results' | 'booking' | 'legal'>('home');
  const [selectedCity, setSelectedCity] = useState<CityGuide | null>(null);
  const [selectedLegForBooking, setSelectedLegForBooking] = useState<Leg | null>(null);
  const [legalSectionId, setLegalSectionId] = useState<string | undefined>();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Trip[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filterType, setFilterType] = useState<TransportType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'rating'>('price');
  const [prefillTo, setPrefillTo] = useState<string | undefined>();
  const [lastSearchParams, setLastSearchParams] = useState<SearchParams>({ from: '', to: '', date: '' });

  useEffect(() => {
    if (view !== 'legal') {
      window.scrollTo(0, 0);
    }
  }, [view, selectedCity]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mv_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      const savedLang = localStorage.getItem('mv_lang');
      if (savedLang) {
        setLanguage(savedLang);
      }
    } catch (e) {
      console.warn("Storage initialization failed", e);
    }

    const handleInitialView = () => {
      const hash = window.location.hash;
      if (hash === '#about') setView('about');
      else if (hash === '#discover') setView('discover');
      else if (hash === '#legal') setView('legal');
      else if (hash.startsWith('#guide/')) setView('city-guide');
      else setView('home');
    };
    handleInitialView();

    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#about') setView('about');
      else if (hash === '#discover') setView('discover');
      else if (hash === '#legal') setView('legal');
      else if (hash.startsWith('#guide/')) setView('city-guide');
      else setView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    try {
      localStorage.setItem('mv_lang', lang);
    } catch (e) {}
  };

  const safeUpdateHistory = (viewName: string, url: string) => {
    try {
      window.history.pushState({ view: viewName }, '', url);
    } catch (e) {
      // In restricted environments (like blob/iframe), pushState might fail.
      // We catch it so the app doesn't crash, allowing navigation to proceed via state.
      console.debug('History update skipped due to environment restrictions.');
    }
  };

  const handleViewChange = (newView: 'home' | 'about' | 'city-guide' | 'discover' | 'results' | 'booking' | 'legal', sectionId?: string, cityData?: CityGuide) => {
    setView(newView);
    
    if (newView === 'about') {
       safeUpdateHistory('about', '#about');
    } else if (newView === 'discover') {
       safeUpdateHistory('discover', '#discover');
    } else if (newView === 'legal') {
       setLegalSectionId(sectionId);
       safeUpdateHistory('legal', '#legal');
    } else if (newView === 'city-guide' && cityData) {
       setSelectedCity(cityData);
       safeUpdateHistory('city-guide', `#guide/${cityData.id}`);
    } else if (newView === 'results') {
       safeUpdateHistory('results', '#results');
    } else {
       // For home, reset URL to pathname to clear hash, but avoid '/' if in subpath
       safeUpdateHistory('home', window.location.pathname);
       if (sectionId && newView === 'home') {
         setTimeout(() => {
           document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
         }, 50);
       }
    }
  };

  const handleLogin = (u: User) => {
    setUser(u);
    try {
      localStorage.setItem('mv_user', JSON.stringify(u));
    } catch (e) {}
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('mv_user');
    } catch (e) {}
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    setHasSearched(true);
    setLastSearchParams(params);
    try {
      const liveTrips = await fetchLiveTrips(params);
      setSearchResults(liveTrips);
      // If we are on home view, scroll to results. If searching from elsewhere, we might be switching to result view.
      if (view === 'home') {
        setTimeout(() => {
          document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCheckAvailability = async (toCity: string, fromCity?: string) => {
    if (fromCity) {
      // Direct route search -> Open results page
      const today = new Date().toISOString().split('T')[0];
      const params: SearchParams = { from: fromCity, to: toCity, date: today };
      setView('results');
      setIsSearching(true);
      setLastSearchParams(params);
      
      try {
        const liveTrips = await fetchLiveTrips(params);
        setSearchResults(liveTrips);
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      // Existing behavior for City Guides (prefill home search)
      setPrefillTo(toCity);
      handleViewChange('home', 'home-search');
    }
  };

  const handleBook = (leg: Leg) => {
    setSelectedLegForBooking(leg);
    setView('booking');
  };

  const filteredAndSortedTrips = useMemo(() => {
    let result = [...searchResults];
    if (filterType !== 'All') result = result.filter(t => t.type === filterType);
    if (sortBy === 'price') result.sort((a, b) => a.totalPrice - b.totalPrice);
    if (sortBy === 'time') result.sort((a, b) => (a.legs[0]?.departureTime || '').localeCompare(b.legs[0]?.departureTime || ''));
    return result;
  }, [searchResults, filterType, sortBy]);

  const isRtl = language === 'ar';

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar 
        user={user} 
        language={language} 
        setLanguage={handleLanguageChange} 
        onOpenAuth={handleOpenAuth} 
        onLogout={handleLogout}
        onOpenFamily={() => setIsFamilyOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onViewChange={handleViewChange}
      />

      <main className="flex-1">
        {view === 'booking' && selectedLegForBooking ? (
          <BookingPage 
            leg={selectedLegForBooking}
            date={lastSearchParams.date}
            language={language}
            onBack={() => handleViewChange('home')} // Or results, but home is safer as a fallback
            onConfirm={() => {
              // Handle post-booking logic (e.g., reset view, show success modal inside component)
              // Currently BookingPage handles the success view internally
              setTimeout(() => {
                handleViewChange('home');
              }, 5000); // Increased timeout to give time to view/download ticket
            }}
          />
        ) : view === 'results' ? (
          <SearchResultsPage 
            results={searchResults}
            isLoading={isSearching}
            searchParams={lastSearchParams}
            onBack={() => handleViewChange('home')}
            onBook={handleBook}
            language={language}
          />
        ) : view === 'about' ? (
          <AboutPage language={language} onBack={() => handleViewChange('home')} />
        ) : view === 'discover' ? (
          <DiscoverPage 
            language={language} 
            onSelectGuide={(city) => handleViewChange('city-guide', undefined, city)}
            onCompareTransport={() => handleViewChange('home')}
            onCheckAvailability={handleCheckAvailability}
          />
        ) : view === 'legal' ? (
          <LegalPage 
            language={language} 
            onBack={() => handleViewChange('home')}
            sectionId={legalSectionId}
          />
        ) : view === 'city-guide' && selectedCity ? (
          <CityGuideDetail guide={selectedCity} onBack={() => handleViewChange('discover')} onCheckAvailability={handleCheckAvailability} />
        ) : (
          <>
            <Hero onSearch={handleSearch} language={language} prefillTo={prefillTo} />
            
            {(isSearching || hasSearched) && (
              <section id="search-results" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">{t('available_trips', language)}</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                      {isSearching ? 'Fetching live schedules...' : `${filteredAndSortedTrips.length} routes found`}
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

                <div className="space-y-8">
                  {isSearching ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-64 bg-white rounded-[40px] border border-slate-100 animate-pulse"></div>
                    ))
                  ) : filteredAndSortedTrips.length > 0 ? (
                    filteredAndSortedTrips.map(trip => (
                      <TripCard key={trip.id} trip={trip} onBook={handleBook} />
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                      <p className="text-slate-400 font-bold">No trips found for this criteria.</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <WhereToGo onCheckAvailability={handleCheckAvailability} />
            <TravelGuides language={language} onSelectGuide={(city) => handleViewChange('city-guide', undefined, city)} onCheckAvailability={handleCheckAvailability} />
          </>
        )}
      </main>

      {view !== 'results' && view !== 'booking' && <Footer onViewChange={handleViewChange} />}
      <Chatbot language={language} />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={handleLogin}
        defaultMode={authMode}
      />

      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
        language={language}
      />

      {isFamilyOpen && (
        <FamilyManager onClose={() => setIsFamilyOpen(false)} />
      )}
    </div>
  );
};

export default App;