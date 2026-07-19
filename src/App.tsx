/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SearchPanel from './components/SearchPanel';
import FlightResults from './components/FlightResults';
import AirportGuide from './components/AirportGuide';
import Explorer from './components/Explorer';
import MyTripsDashboard from './components/MyTripsDashboard';
import BookingModal from './components/BookingModal';

import { Flight, SearchCriteria, SavedSearch, Trip, FareAlert } from './types';
import { generateFlights } from './data/flights';
import { Activity, Plane, ArrowRight, Compass, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('search');

  // Search state
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);

  // Local storage lists
  const [trips, setTrips] = useState<Trip[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Default mock alerts for dashboard richness
  const [fareAlerts, setFareAlerts] = useState<FareAlert[]>([
    { id: '1', route: 'LHR ➔ JFK', currentPrice: 380, previousPrice: 420, direction: 'down', createdAt: 'Today, 09:30' },
    { id: '2', route: 'MAN ➔ DXB', currentPrice: 460, previousPrice: 445, direction: 'up', createdAt: 'Today, 07:15' },
    { id: '3', route: 'EDI ➔ NCE', currentPrice: 120, previousPrice: 155, direction: 'down', createdAt: 'Yesterday' }
  ]);

  // Active booking selection
  const [activeBookingFlight, setActiveBookingFlight] = useState<Flight | null>(null);

  // Flight Status Search State
  const [statusSearchQuery, setStatusSearchQuery] = useState('');
  const [selectedStatusFlightId, setSelectedStatusFlightId] = useState<string>('ba175');

  const liveFlightsStatus = [
    {
      id: 'ba175',
      flightNumber: 'BA175',
      airline: 'British Airways',
      logo: '🇬🇧',
      origin: 'London Heathrow (LHR)',
      destination: 'New York JFK (JFK)',
      aircraft: 'Boeing 777-300ER',
      status: 'In Flight',
      departureTime: '10:15',
      arrivalTime: '13:05',
      progress: 68,
      altitude: '37,000 ft',
      speed: '535 mph',
      remaining: '2h 12m',
      gate: 'T5 A22'
    },
    {
      id: 'vs103',
      flightNumber: 'VS103',
      airline: 'Virgin Atlantic',
      logo: '❤️',
      origin: 'London Heathrow (LHR)',
      destination: 'Dubai International (DXB)',
      aircraft: 'Airbus A350-1000',
      status: 'Boarding',
      departureTime: '14:35',
      arrivalTime: '23:10',
      progress: 0,
      altitude: '0 ft',
      speed: '0 mph',
      remaining: 'Departs in 18m',
      gate: 'T3 Gate 15'
    },
    {
      id: 'lm392',
      flightNumber: 'LM392',
      airline: 'Loganair',
      logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      origin: 'Edinburgh Airport (EDI)',
      destination: 'London City Airport (LCY)',
      aircraft: 'Embraer 145',
      status: 'Landed',
      departureTime: '11:15',
      arrivalTime: '12:35',
      progress: 100,
      altitude: '0 ft',
      speed: '0 mph',
      remaining: 'Arrived 14m ago',
      gate: 'Gate 2'
    }
  ];

  const currentStatusFlight = useMemo(() => {
    return liveFlightsStatus.find(f => f.id === selectedStatusFlightId) || liveFlightsStatus[0];
  }, [selectedStatusFlightId]);

  // Read initial records from localStorage
  useEffect(() => {
    const cachedSearches = localStorage.getItem('aerobritannia_saved_searches');
    if (cachedSearches) {
      setSavedSearches(JSON.parse(cachedSearches));
    }

    const cachedTrips = localStorage.getItem('aerobritannia_trips');
    if (cachedTrips) {
      setTrips(JSON.parse(cachedTrips));
    }
  }, []);

  // Write changes to localStorage helper
  const updateSavedSearches = (newSearches: SavedSearch[]) => {
    setSavedSearches(newSearches);
    localStorage.setItem('aerobritannia_saved_searches', JSON.stringify(newSearches));
  };

  const updateTrips = (newTrips: Trip[]) => {
    setTrips(newTrips);
    localStorage.setItem('aerobritannia_trips', JSON.stringify(newTrips));
  };

  // Triggers search
  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    const results = generateFlights(criteria.origin, criteria.destination, criteria.departureDate, criteria.cabinClass);
    setSearchResults(results);
    // Smooth scroll down to results
    setTimeout(() => {
      document.getElementById('search-results-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Save new search track
  const handleSaveSearch = (newSearch: SavedSearch) => {
    const isExist = savedSearches.some(
      s => s.departure.code === newSearch.departure.code &&
           s.arrival.code === newSearch.arrival.code &&
           s.cabinClass === newSearch.cabinClass
    );
    if (!isExist) {
      const updated = [newSearch, ...savedSearches];
      updateSavedSearches(updated);
    }
  };

  const handleRemoveSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id);
    updateSavedSearches(updated);
  };

  const handleRemoveTrip = (id: string) => {
    const updated = trips.filter(t => t.id !== id);
    updateTrips(updated);
  };

  // Navigation click on saved track
  const handleNavigateSavedSearch = (search: SavedSearch) => {
    setActiveTab('search');
    handleSearch({
      tripType: 'return',
      origin: search.departure.code,
      destination: search.arrival.code,
      departureDate: search.date,
      cabinClass: search.cabinClass,
      passengers: { adults: 1, children: 0, infants: 0 }
    });
  };

  // Destination explorer click trigger
  const handleSelectExplorerDestination = (destCode: string) => {
    setActiveTab('search');
    handleSearch({
      tripType: 'return',
      origin: 'LHR',
      destination: destCode,
      departureDate: '2026-08-15',
      returnDate: '2026-08-22',
      cabinClass: 'business',
      passengers: { adults: 1, children: 0, infants: 0 }
    });
  };

  // Complete ticket checkout
  const handleCompleteBooking = (newTrip: Trip) => {
    const updated = [newTrip, ...trips];
    updateTrips(updated);
    
    // Add to simulated alerts
    const newAlert: FareAlert = {
      id: `alert-${Date.now()}`,
      route: `${newTrip.flight.departureAirport.code} ➔ ${newTrip.flight.arrivalAirport.code}`,
      currentPrice: newTrip.flight.price,
      previousPrice: Math.round(newTrip.flight.price * 1.05),
      direction: 'down',
      createdAt: 'Just booked'
    };
    setFareAlerts(prev => [newAlert, ...prev]);

    setTimeout(() => {
      setActiveBookingFlight(null);
      setActiveTab('trips');
    }, 2000);
  };

  return (
    <div id="app" className="min-h-screen bg-stone-50 font-sans text-slate-800 flex flex-col justify-between">
      
      {/* Header Brand and Navigation bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Scroll to top of window smoothly on tab switch
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        savedTripsCount={trips.length} 
      />

      {/* Main Tab Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'search' && (
              <div className="space-y-6">
                {/* Visual cinematic sliders */}
                <Hero 
                  onSearchClick={() => {
                    document.getElementById('search-panel-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  onExploreClick={() => {
                    setActiveTab('explorer');
                  }} 
                  onStatusClick={() => {
                    setActiveTab('status');
                  }} 
                />
                
                <div id="search-panel-anchor" className="pt-2">
                  <SearchPanel onSearch={handleSearch} />
                </div>

                {/* Listing panel anchor */}
                <div id="search-results-anchor" className="scroll-mt-24">
                  {searchCriteria && searchResults.length > 0 && (
                    <FlightResults
                      flights={searchResults}
                      cabin={searchCriteria.cabinClass}
                      originCode={searchCriteria.origin}
                      destinationCode={searchCriteria.destination}
                      onBookFlight={(flight) => setActiveBookingFlight(flight)}
                      onSaveSearch={handleSaveSearch}
                      savedSearches={savedSearches}
                    />
                  )}
                </div>
              </div>
            )}

            {activeTab === 'explorer' && (
              <Explorer onSelectDestination={handleSelectExplorerDestination} />
            )}

            {activeTab === 'status' && (
              <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-12 pb-24">
                {/* Status Page Header */}
                <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs tracking-wider text-stone-400 uppercase">Aviation Tracking Link</span>
                    <h1 className="font-serif text-4xl font-light text-slate-900 mt-1">Live Flight Status</h1>
                    <p className="text-xs text-stone-500 font-medium mt-1">Real-time trans-Atlantic telemetry, gate allocations and route timing charts.</p>
                  </div>

                  {/* Flight quick switches */}
                  <div className="flex bg-stone-100 p-1 rounded-sm gap-1 self-start">
                    {liveFlightsStatus.map(lf => (
                      <button
                        key={lf.id}
                        onClick={() => setSelectedStatusFlightId(lf.id)}
                        className="rounded-xs px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all"
                        style={{
                          backgroundColor: selectedStatusFlightId === lf.id ? '#ffffff' : 'transparent',
                          color: selectedStatusFlightId === lf.id ? '#0f172a' : '#6b7280',
                          boxShadow: selectedStatusFlightId === lf.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                        }}
                      >
                        {lf.flightNumber}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Visual Telemetry Map Tracker */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left (2 Spans): Active status visual details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-8 shadow-sm">
                      <div className="flex flex-wrap justify-between items-center border-b border-stone-100 pb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{currentStatusFlight.logo}</span>
                          <div>
                            <span className="font-mono text-xs font-bold text-slate-950 block">{currentStatusFlight.flightNumber}</span>
                            <span className="text-[10px] text-stone-400 uppercase font-mono">{currentStatusFlight.airline}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-stone-400 font-mono">Current telemetry state:</span>
                          <span className={`rounded-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${currentStatusFlight.status === 'In Flight' ? 'bg-blue-100 text-blue-800' : (currentStatusFlight.status === 'Landed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}`}>
                            {currentStatusFlight.status}
                          </span>
                        </div>
                      </div>

                      {/* visual route timeline */}
                      <div className="grid grid-cols-12 gap-4 items-center relative">
                        <div className="col-span-4">
                          <span className="font-mono text-[9px] text-stone-400 block uppercase">Departed LHR</span>
                          <span className="font-sans text-2xl font-bold tracking-tight text-slate-900 block">{currentStatusFlight.departureTime}</span>
                          <span className="font-sans text-xs text-stone-500">{currentStatusFlight.origin}</span>
                        </div>

                        {/* Progress timeline bar */}
                        <div className="col-span-4 flex flex-col items-center">
                          <span className="font-mono text-[9px] text-stone-400 font-semibold mb-1">{currentStatusFlight.remaining}</span>
                          <div className="relative w-full h-1 bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
                            <div 
                              className="h-full bg-slate-900 rounded-full" 
                              style={{ width: `${currentStatusFlight.progress}%` }}
                            />
                          </div>
                          {currentStatusFlight.status === 'In Flight' && (
                            <Plane className="h-4.5 w-4.5 text-slate-800 rotate-90 mt-2 animate-pulse" />
                          )}
                        </div>

                        <div className="col-span-4 text-right">
                          <span className="font-mono text-[9px] text-stone-400 block uppercase">Estimated Arrival</span>
                          <span className="font-sans text-2xl font-bold tracking-tight text-slate-900 block">{currentStatusFlight.arrivalTime}</span>
                          <span className="font-sans text-xs text-stone-500">{currentStatusFlight.destination}</span>
                        </div>
                      </div>

                      {/* Stats telemetry parameters */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-100 pt-6">
                        <div>
                          <span className="font-mono text-[9px] text-stone-400 block uppercase">Current Altitude</span>
                          <span className="font-sans text-sm font-bold text-slate-950 block">{currentStatusFlight.altitude}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-stone-400 block uppercase">Ground Speed</span>
                          <span className="font-sans text-sm font-bold text-slate-950 block">{currentStatusFlight.speed}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-stone-400 block uppercase">Aircraft model</span>
                          <span className="font-sans text-sm font-bold text-slate-950 block">{currentStatusFlight.aircraft}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-stone-400 block uppercase">Assigned Terminal Gate</span>
                          <span className="font-sans text-sm font-bold text-emerald-800 block">{currentStatusFlight.gate}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Status info notices */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="rounded-sm border border-stone-200 bg-stone-50/50 p-5 space-y-4">
                      <h3 className="font-serif text-lg font-normal text-slate-950">Disruption Advisories</h3>
                      <p className="text-xs text-stone-500 leading-relaxed font-light">
                        No adverse air weather patterns observed on the North Atlantic tracks today. All premium UK departures are tracking strictly on schedule.
                      </p>
                      
                      <div className="rounded-xs border border-stone-200 bg-white p-3 space-y-2">
                        <span className="font-mono text-[9px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm font-bold uppercase">Minor Alert</span>
                        <p className="text-[11px] text-stone-500 leading-relaxed">
                          Heathrow T5 luggage lines are slightly elevated. All premium business check-ins remain fully cleared.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'airports' && (
              <AirportGuide />
            )}

            {activeTab === 'trips' && (
              <MyTripsDashboard
                trips={trips}
                savedSearches={savedSearches}
                fareAlerts={fareAlerts}
                onRemoveSearch={handleRemoveSearch}
                onRemoveTrip={handleRemoveTrip}
                onNavigateSearch={handleNavigateSavedSearch}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Deluxe Premium Footer */}
      <footer className="bg-slate-950 text-stone-400 border-t border-stone-900 py-12 px-6 sm:px-8 mt-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-stone-900 font-sans text-xs font-semibold tracking-wider text-amber-400 border border-amber-500/20">
                Æ
              </div>
              <span className="font-sans text-sm font-bold tracking-[0.25em] text-white">AEROBRITANNIA</span>
            </div>
            <p className="text-xs text-stone-500 font-light max-w-xs leading-relaxed">
              Every Flight. Beautifully Planned. Aerobritannia is the digital front door to British commercial aviation, engineered for quiet elegance and supreme scheduling speed.
            </p>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase block">Terminal Hubs</span>
            <ul className="space-y-2">
              <li><button onClick={() => { setActiveTab('airports'); window.scrollTo(0,0); }} className="hover:text-stone-200">London Heathrow (LHR)</button></li>
              <li><button onClick={() => { setActiveTab('airports'); window.scrollTo(0,0); }} className="hover:text-stone-200">London City Airport (LCY)</button></li>
              <li><button onClick={() => { setActiveTab('airports'); window.scrollTo(0,0); }} className="hover:text-stone-200">Manchester Airport (MAN)</button></li>
              <li><button onClick={() => { setActiveTab('airports'); window.scrollTo(0,0); }} className="hover:text-stone-200">Edinburgh Airport (EDI)</button></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase block">AEROCURATIONS</span>
            <ul className="space-y-2">
              <li><button onClick={() => { setActiveTab('explorer'); window.scrollTo(0,0); }} className="hover:text-stone-200">Destination Galleries</button></li>
              <li><button onClick={() => { setActiveTab('search'); window.scrollTo(0,0); }} className="hover:text-stone-200">Executive Cabin Classes</button></li>
              <li><button onClick={() => { setActiveTab('status'); window.scrollTo(0,0); }} className="hover:text-stone-200">Telemetry Tracking</button></li>
              <li><button onClick={() => { setActiveTab('trips'); window.scrollTo(0,0); }} className="hover:text-stone-200">Executive Club Status</button></li>
            </ul>
          </div>

          {/* Licensing Col */}
          <div className="md:col-span-2 space-y-3 text-[10px] font-mono text-stone-600">
            <span className="tracking-widest uppercase text-stone-500 block">Licensing</span>
            <div className="space-y-1 bg-stone-900/40 p-3 rounded-sm border border-stone-800">
              <span className="block text-stone-400 font-bold">ATOL PROTECTED</span>
              <span className="block text-stone-500">License No. 10932</span>
              <span className="block text-stone-500 mt-1">Civil Aviation Authority (CAA) Compliant.</span>
            </div>
          </div>

        </div>

        <div className="mx-auto max-w-7xl border-t border-stone-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 font-mono gap-4">
          <span>© 2026 AEROBRITANNIA LTD. Built under contemporary editorial guidelines.</span>
          <div className="flex space-x-6">
            <span className="hover:text-stone-400 cursor-pointer">Security Protocols</span>
            <span className="hover:text-stone-400 cursor-pointer">Conditions of Carriage</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Statement</span>
          </div>
        </div>
      </footer>

      {/* Slide-over Booking Checkout Modal */}
      {activeBookingFlight && (
        <BookingModal
          flight={activeBookingFlight}
          onClose={() => setActiveBookingFlight(null)}
          onCompleteBooking={handleCompleteBooking}
        />
      )}

    </div>
  );
}
