/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sliders, Leaf, Wifi, Coffee, Clock, Sparkles, Bell, ArrowRight, Heart, Info, ChevronDown } from 'lucide-react';
import { Flight, CabinClass, SavedSearch } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FlightResultsProps {
  flights: Flight[];
  cabin: CabinClass;
  originCode: string;
  destinationCode: string;
  onBookFlight: (flight: Flight) => void;
  onSaveSearch: (search: SavedSearch) => void;
  savedSearches: SavedSearch[];
}

export default function FlightResults({
  flights,
  cabin,
  originCode,
  destinationCode,
  onBookFlight,
  onSaveSearch,
  savedSearches
}: FlightResultsProps) {
  // Filter states
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [onlyDirect, setOnlyDirect] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'price' | 'score' | 'duration' | 'departure'>('score');
  const [showEcoOnly, setShowEcoOnly] = useState<boolean>(false);
  const [alertActive, setAlertActive] = useState<boolean>(false);

  // Determine dynamic limits based on results
  const priceRange = useMemo(() => {
    if (flights.length === 0) return { min: 0, max: 1000 };
    const prices = flights.map(f => f.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [flights]);

  // Set initial price slider value dynamically when flight list updates
  React.useEffect(() => {
    if (flights.length > 0) {
      setMaxPrice(priceRange.max);
    }
  }, [flights, priceRange.max]);

  // Unique airlines present in results
  const uniqueAirlines = useMemo(() => {
    const list = new Map();
    flights.forEach(f => {
      list.set(f.airline.id, f.airline.name);
    });
    return Array.from(list.entries()).map(([id, name]) => ({ id, name }));
  }, [flights]);

  // Filter and sort core logic
  const filteredFlights = useMemo(() => {
    let result = [...flights];

    if (selectedAirline !== 'all') {
      result = result.filter(f => f.airline.id === selectedAirline);
    }

    result = result.filter(f => f.price <= maxPrice);

    if (onlyDirect) {
      result = result.filter(f => f.stops === 0);
    }

    if (showEcoOnly) {
      // Treat flights below median carbon as Eco Friendly
      const carbonLimits = flights.map(f => f.carbonFootprint);
      const medianCarbon = carbonLimits.length > 0 ? carbonLimits.sort((a, b) => a - b)[Math.floor(carbonLimits.length / 2)] : 150;
      result = result.filter(f => f.carbonFootprint <= medianCarbon);
    }

    // Sort
    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'score') {
      result.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'departure') {
      result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    return result;
  }, [flights, selectedAirline, maxPrice, onlyDirect, showEcoOnly, sortBy]);

  const handleTrackRoute = () => {
    setAlertActive(true);
    // Trigger mock alert save
    onSaveSearch({
      id: `${originCode}-${destinationCode}-${cabin}-${Date.now()}`,
      departure: flights[0]?.departureAirport || { code: originCode, name: originCode, city: originCode },
      arrival: flights[0]?.arrivalAirport || { code: destinationCode, name: destinationCode, city: destinationCode },
      date: '2026-08-15',
      cabinClass: cabin,
      priceAlertsActive: true,
      createdAt: new Date().toLocaleDateString('en-GB')
    });
    setTimeout(() => {
      setAlertActive(false);
    }, 4000);
  };

  const isAlreadySaved = savedSearches.some(
    s => s.departure.code === originCode && s.arrival.code === destinationCode && s.cabinClass === cabin
  );

  return (
    <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8 pb-16">
      
      {/* Route Header and Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono text-xs tracking-wider text-white/40 uppercase">Available Departures</span>
          <h2 className="font-serif text-3xl font-light text-[#F9F7F2] mt-1 flex items-center gap-3">
            <span>{flights[0]?.departureAirport.city || originCode}</span>
            <ArrowRight className="h-5 w-5 text-white/40 stroke-[1.2px]" />
            <span>{flights[0]?.arrivalAirport.city || destinationCode}</span>
          </h2>
          <p className="text-xs text-white/50 font-medium mt-1">
            Showing {filteredFlights.length} of {flights.length} flights for <span className="capitalize font-semibold text-[#F9F7F2]">{cabin.replace('_', ' ')}</span>
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTrackRoute}
            disabled={isAlreadySaved}
            className="flex items-center space-x-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F9F7F2] transition-all hover:bg-white/10 disabled:opacity-75 disabled:hover:bg-white/5"
          >
            <Bell className="h-4 w-4 text-emerald-400" />
            <span>{isAlreadySaved ? 'Fare Track Active' : 'Track Fares & Alerts'}</span>
          </button>
        </div>
      </div>

      {/* Track Fares Animated notification */}
      <AnimatePresence>
        {alertActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 rounded-sm bg-emerald-950/20 border border-emerald-500/20 p-4 flex items-center space-x-3 shadow-xs"
          >
            <Sparkles className="h-5 w-5 text-emerald-400 shrink-0" />
            <div className="text-xs text-emerald-400">
              <span className="font-semibold block">Fare alert successfully activated.</span>
              We will notify you immediately of any price movements for {flights[0]?.departureAirport.city} ➔ {flights[0]?.arrivalAirport.city} ({cabin.replace('_', ' ')}).
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column: Highly Polished Filter Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-semibold text-[#F9F7F2] uppercase tracking-widest flex items-center gap-2">
                <Sliders className="h-3.5 w-3.5" />
                Refine Search
              </span>
              <button
                onClick={() => {
                  setSelectedAirline('all');
                  setMaxPrice(priceRange.max);
                  setOnlyDirect(false);
                  setShowEcoOnly(false);
                }}
                className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40 font-medium">Maximum Fare</span>
                <span className="font-semibold text-white">£{maxPrice}</span>
              </div>
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max || 1500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F9F7F2] cursor-pointer h-1 bg-white/15 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/30">
                <span>£{priceRange.min}</span>
                <span>£{priceRange.max}</span>
              </div>
            </div>

            {/* Stops Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-white block">Stops</span>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDirect}
                  onChange={(e) => setOnlyDirect(e.target.checked)}
                  className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4"
                />
                <span className="text-xs text-white/60 font-medium">Non-stop flights only</span>
              </label>
            </div>

            {/* Airlines filter */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-white block">Airline Network</span>
              <select
                value={selectedAirline}
                onChange={(e) => setSelectedAirline(e.target.value)}
                className="w-full rounded-sm border border-white/10 bg-[#05070A] py-2 px-3 text-xs font-semibold text-[#F9F7F2] cursor-pointer focus:outline-none"
              >
                <option value="all" className="bg-[#111318] text-white">All Airlines</option>
                {uniqueAirlines.map(airline => (
                  <option key={airline.id} value={airline.id} className="bg-[#111318] text-white">{airline.name}</option>
                ))}
              </select>
            </div>

            {/* Carbon Footprint */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <span className="text-xs font-semibold text-white block">Environmental Footprint</span>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEcoOnly}
                  onChange={(e) => setShowEcoOnly(e.target.checked)}
                  className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4"
                />
                <span className="text-xs text-white/60 font-medium flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  Lower emissions first
                </span>
              </label>
            </div>
          </div>

          {/* Quick flight stats banner */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-white/40" />
              <span className="text-xs font-bold text-[#F9F7F2] uppercase tracking-wide">Route Advisory</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/50 font-light">
              This route has high on-time reliability. British Airways operates major direct departures from London Heathrow Terminal 5.
            </p>
          </div>
        </div>

        {/* Right column: Results listing */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Sorting Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111318]/90 px-4 py-3 rounded-lg border border-white/10">
            <span className="text-xs font-medium text-white/40">Sorted by:</span>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {[
                { id: 'score', label: 'Recommended' },
                { id: 'price', label: 'Cheapest' },
                { id: 'duration', label: 'Fastest' },
                { id: 'departure', label: 'Departure Time' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id as any)}
                  className="rounded-xs px-3 py-1.5 text-xs font-semibold tracking-wide transition-all"
                  style={{
                    backgroundColor: sortBy === opt.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: sortBy === opt.id ? '#F9F7F2' : 'rgba(255, 255, 255, 0.4)'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flight Card Loop */}
          <div className="space-y-4">
            {filteredFlights.length === 0 ? (
              <div className="rounded-sm border border-dashed border-white/10 bg-white/5 p-12 text-center">
                <Sliders className="h-10 w-10 text-white/40 mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-lg font-medium text-white mt-4">No Matching Flights</h3>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  Try clearing your filters or widening your budget parameters to discover available departures.
                </p>
              </div>
            ) : (
              filteredFlights.map((flight, idx) => {
                const isEcoFriendly = flight.carbonFootprint < 180;
                
                return (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                    className="group rounded-xl border border-white/10 bg-[#111318]/90 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40 transition-all duration-200 overflow-hidden"
                  >
                    
                    {/* Visual Top Ribbon for Top Rated / Eco */}
                    <div className="flex items-center justify-between px-5 py-2.5 bg-white/5 border-b border-white/5 text-[10px] font-mono tracking-wider uppercase text-white/40">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#F9F7F2]">{flight.airline.name}</span>
                        <span className="text-white/10">•</span>
                        <span>{flight.aircraft}</span>
                        {isEcoFriendly && (
                          <>
                            <span className="text-white/10">•</span>
                            <span className="flex items-center text-emerald-400 font-semibold gap-1">
                              <Leaf className="h-3 w-3" />
                              Eco Choice (-18% CO2)
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-amber-400">Quality Score: {flight.score.toFixed(1)}/10</span>
                      </div>
                    </div>

                    {/* Main Flight Grid */}
                    <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left: Airline Logo and Times */}
                      <div className="md:col-span-7 grid grid-cols-12 gap-4 items-center">
                        {/* Airline Badge */}
                        <div className="col-span-2 flex flex-col items-center justify-center">
                          <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                            {flight.airline.logo}
                          </div>
                          <span className="font-mono text-[9px] font-bold text-white/40 mt-1">{flight.flightNumber}</span>
                        </div>

                        {/* Departure Time Block */}
                        <div className="col-span-3 text-right">
                          <span className="font-sans text-xl font-bold tracking-tight text-white block">{flight.departureTime}</span>
                          <span className="font-mono text-[10px] text-white/50 font-semibold uppercase">{flight.departureAirport.code}</span>
                        </div>

                        {/* Visual timeline vector */}
                        <div className="col-span-4 flex flex-col items-center justify-center px-2">
                          <span className="font-mono text-[9px] text-white/40 font-semibold tracking-wider">
                            {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                          </span>
                          <div className="relative w-full h-[2px] bg-white/10 my-1.5">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/20" />
                            {flight.stops > 0 && (
                              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-2 w-2 rounded-full bg-amber-400" title="Layover" />
                            )}
                          </div>
                          <span className="font-mono text-[9px] font-bold tracking-wide uppercase" style={{ color: flight.stops === 0 ? '#34d399' : '#fbbf24' }}>
                            {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
                          </span>
                        </div>

                        {/* Arrival Time Block */}
                        <div className="col-span-3 text-left">
                          <span className="font-sans text-xl font-bold tracking-tight text-white block">{flight.arrivalTime}</span>
                          <span className="font-mono text-[10px] text-white/50 font-semibold uppercase">{flight.arrivalAirport.code}</span>
                        </div>
                      </div>

                      {/* Middle: Core Amenities list */}
                      <div className="md:col-span-2 flex md:flex-col justify-center gap-3 sm:gap-4 md:gap-2.5 border-t md:border-t-0 md:border-l md:border-r border-white/10 pt-4 md:pt-0 md:px-4">
                        <div className="flex items-center space-x-2 text-white/40">
                          <Coffee className="h-3.5 w-3.5 text-white/40" />
                          <span className="text-[10px] font-medium text-white/60">{flight.mealsIncluded ? 'Hot Meal Included' : 'Buy On Board'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/40">
                          <Wifi className="h-3.5 w-3.5 text-white/40" />
                          <span className="text-[10px] font-medium text-white/60">{flight.wifiAvailable ? 'Complimentary Wi-Fi' : 'Offline Flight'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/40">
                          <Clock className="h-3.5 w-3.5 text-white/40" />
                          <span className="text-[10px] font-medium text-white/60">{flight.onTimeRating}% On-Time Rating</span>
                        </div>
                      </div>

                      {/* Right: Price and Select Action */}
                      <div className="md:col-span-3 text-right flex md:flex-col justify-between md:justify-center items-center md:items-end gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-white/40 block uppercase tracking-wider">Fare inclusive</span>
                          <span className="font-serif text-2xl font-light text-[#F9F7F2]">£{flight.price}</span>
                        </div>
                        <button
                          onClick={() => onBookFlight(flight)}
                          className="rounded-sm bg-[#F9F7F2] text-[#05070A] hover:bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                        >
                          Select Flight
                        </button>
                      </div>
                    </div>

                    {/* Extra fine luggage details footer */}
                    <div className="bg-white/5 px-6 py-2.5 border-t border-white/5 flex justify-between text-[10px] font-mono text-white/40">
                      <span>Carbon offset: {flight.carbonFootprint}kg CO2e</span>
                      <span className="uppercase font-semibold text-white/60">
                        {flight.baggage.checkedBagAllowed
                          ? `Checked bag included (${flight.baggage.checkedWeightLimitKg}kg)`
                          : 'Cabin bag only included'}
                      </span>
                    </div>

                  </motion.div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
