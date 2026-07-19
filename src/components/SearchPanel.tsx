/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, PlaneTakeoff, PlaneLanding, Plus, Trash2, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { SearchCriteria, CabinClass, AirportSimple } from '../types';
import { airportMap } from '../data/flights';

interface SearchPanelProps {
  onSearch: (criteria: SearchCriteria) => void;
  initialCriteria?: SearchCriteria;
}

const ukOrigins = [
  { code: 'LHR', name: 'London Heathrow (LHR)', city: 'London' },
  { code: 'LCY', name: 'London City Airport (LCY)', city: 'London' },
  { code: 'MAN', name: 'Manchester Airport (MAN)', city: 'Manchester' },
  { code: 'EDI', name: 'Edinburgh Airport (EDI)', city: 'Edinburgh' }
];

const worldDestinations = [
  { code: 'JFK', name: 'New York JFK (JFK)', city: 'New York' },
  { code: 'DXB', name: 'Dubai Intl (DXB)', city: 'Dubai' },
  { code: 'HND', name: 'Tokyo Haneda (HND)', city: 'Tokyo' },
  { code: 'NCE', name: 'Nice Côte d’Azur (NCE)', city: 'Nice' },
  { code: 'KEF', name: 'Keflavík Intl (KEF)', city: 'Reykjavik' },
  { code: 'ZRH', name: 'Zurich Airport (ZRH)', city: 'Zurich' },
  { code: 'BCN', name: 'Barcelona-El Prat (BCN)', city: 'Barcelona' },
  { code: 'FCO', name: 'Rome Fiumicino (FCO)', city: 'Rome' },
  { code: 'FRA', name: 'Frankfurt Airport (FRA)', city: 'Frankfurt' },
  { code: 'EDI', name: 'Edinburgh Airport (EDI)', city: 'Edinburgh' }
];

export default function SearchPanel({ onSearch, initialCriteria }: SearchPanelProps) {
  const defaultCriteria: SearchCriteria = {
    tripType: 'return',
    origin: 'LHR',
    destination: 'JFK',
    departureDate: '2026-08-15',
    returnDate: '2026-08-22',
    cabinClass: 'business',
    passengers: { adults: 1, children: 0, infants: 0 }
  };

  const [criteria, setCriteria] = useState<SearchCriteria>(initialCriteria || defaultCriteria);
  const [showPassengerMenu, setShowPassengerMenu] = useState(false);
  const [nearbyAirports, setNearbyAirports] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);

  // Multi-city state (if user selects multi-city)
  const [multiCityLegs, setMultiCityLegs] = useState<Array<{ origin: string; destination: string; departureDate: string }>>([
    { origin: 'LHR', destination: 'JFK', departureDate: '2026-08-15' },
    { origin: 'JFK', destination: 'FCO', departureDate: '2026-08-22' }
  ]);

  const handleTripTypeChange = (type: 'return' | 'one-way' | 'multi-city') => {
    setCriteria(prev => ({ ...prev, tripType: type }));
  };

  const handleClassChange = (cabin: CabinClass) => {
    setCriteria(prev => ({ ...prev, cabinClass: cabin }));
  };

  const handlePassengerCount = (type: 'adults' | 'children' | 'infants', op: 'add' | 'sub') => {
    setCriteria(prev => {
      const current = prev.passengers[type];
      let updated = current;
      if (op === 'add') updated += 1;
      if (op === 'sub') {
        if (type === 'adults' && current > 1) updated -= 1;
        if (type !== 'adults' && current > 0) updated -= 1;
      }
      return {
        ...prev,
        passengers: {
          ...prev.passengers,
          [type]: updated
        }
      };
    });
  };

  const swapRoute = () => {
    setCriteria(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handleAddLeg = () => {
    const lastLeg = multiCityLegs[multiCityLegs.length - 1];
    setMultiCityLegs([
      ...multiCityLegs,
      {
        origin: lastLeg ? lastLeg.destination : 'LHR',
        destination: 'DXB',
        departureDate: '2026-08-29'
      }
    ]);
  };

  const handleRemoveLeg = (idx: number) => {
    if (multiCityLegs.length > 2) {
      setMultiCityLegs(multiCityLegs.filter((_, i) => i !== idx));
    }
  };

  const handleLegChange = (idx: number, field: 'origin' | 'destination' | 'departureDate', val: string) => {
    const updated = [...multiCityLegs];
    updated[idx] = { ...updated[idx], [field]: val };
    setMultiCityLegs(updated);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (criteria.tripType === 'multi-city') {
      onSearch({
        ...criteria,
        origin: multiCityLegs[0].origin,
        destination: multiCityLegs[multiCityLegs.length - 1].destination,
        multiCityLegs
      });
    } else {
      onSearch(criteria);
    }
  };

  const totalPassengers = criteria.passengers.adults + criteria.passengers.children + criteria.passengers.infants;

  const cabinLabels: Record<CabinClass, string> = {
    economy: 'Economy',
    premium_economy: 'Premium Eco',
    business: 'Club (Business)',
    first: 'First Class'
  };

  return (
    <div className="mx-auto -mt-16 relative z-30 max-w-7xl px-6 sm:px-8">
      <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-6 shadow-2xl sm:p-8">
        
        {/* Top Controls: Trip Type & Cabin Selection */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex bg-white/5 border border-white/5 p-1 rounded-sm gap-1">
            {(['return', 'one-way', 'multi-city'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleTripTypeChange(type)}
                className="rounded-xs px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: criteria.tripType === type ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: criteria.tripType === type ? '#F9F7F2' : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: criteria.tripType === type ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['economy', 'premium_economy', 'business', 'first'] as CabinClass[]).map((cabin) => (
              <button
                key={cabin}
                type="button"
                onClick={() => handleClassChange(cabin)}
                className="rounded-sm border px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all"
                style={{
                  borderColor: criteria.cabinClass === cabin ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                  backgroundColor: criteria.cabinClass === cabin ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  color: criteria.cabinClass === cabin ? '#F9F7F2' : 'rgba(255, 255, 255, 0.5)',
                  fontWeight: criteria.cabinClass === cabin ? 600 : 500
                }}
              >
                {cabinLabels[cabin]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Search Fields */}
        <form onSubmit={handleSearchSubmit} className="mt-6 space-y-6">
          
          {criteria.tripType !== 'multi-city' ? (
            /* Round-Trip & One-Way Grid */
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 items-end">
              {/* Departure Airport Selector */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">Departure Point</label>
                <div className="relative">
                  <PlaneTakeoff className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <select
                    value={criteria.origin}
                    onChange={(e) => setCriteria(prev => ({ ...prev, origin: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm font-semibold text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 appearance-none cursor-pointer"
                  >
                    {ukOrigins.map(air => (
                      <option key={air.code} value={air.code} className="bg-[#111318] text-white">{air.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:col-span-1 py-1">
                <button
                  type="button"
                  onClick={swapRoute}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all shadow-sm"
                  title="Swap Departure and Arrival"
                >
                  <ArrowUpDown className="h-4 w-4 stroke-[1.8px]" />
                </button>
              </div>

              {/* Arrival Airport Selector */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">Arrival Destination</label>
                <div className="relative">
                  <PlaneLanding className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <select
                    value={criteria.destination}
                    onChange={(e) => setCriteria(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm font-semibold text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 appearance-none cursor-pointer"
                  >
                    {worldDestinations.map(air => (
                      <option key={air.code} value={air.code} className="bg-[#111318] text-white">{air.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className={criteria.tripType === 'return' ? "md:col-span-3" : "md:col-span-2"}>
                <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">Outbound Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="date"
                    required
                    value={criteria.departureDate}
                    onChange={(e) => setCriteria(prev => ({ ...prev, departureDate: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-white/5 py-3 pl-11 pr-3 text-sm font-semibold text-white focus:border-white/30 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {criteria.tripType === 'return' && (
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">Inbound Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      type="date"
                      required={criteria.tripType === 'return'}
                      value={criteria.returnDate || ''}
                      onChange={(e) => setCriteria(prev => ({ ...prev, returnDate: e.target.value }))}
                      className="w-full rounded-sm border border-white/10 bg-white/5 py-3 pl-11 pr-3 text-sm font-semibold text-white focus:border-white/30 focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Multi-City Itinerary Leg List */
            <div className="space-y-4">
              <span className="font-sans text-xs font-semibold text-white uppercase tracking-widest block">Itinerary Legs</span>
              {multiCityLegs.map((leg, idx) => (
                <div key={idx} className="grid grid-cols-1 gap-3 md:grid-cols-12 items-end border-l-2 border-[#F9F7F2]/20 pl-4 py-1">
                  
                  {/* Origin */}
                  <div className="md:col-span-4">
                    <label className="block text-[9px] font-mono text-white/40 uppercase mb-1">Leg {idx + 1} - From</label>
                    <div className="relative">
                      <PlaneTakeoff className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                      <select
                        value={leg.origin}
                        onChange={(e) => handleLegChange(idx, 'origin', e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-xs font-semibold text-white cursor-pointer focus:outline-none"
                      >
                        {ukOrigins.map(air => (
                          <option key={air.code} value={air.code} className="bg-[#111318] text-white">{air.name}</option>
                        ))}
                        {/* allow world airports as well for onwards travel */}
                        {worldDestinations.map(air => (
                          leg.origin === air.code && !ukOrigins.some(u => u.code === air.code) ? (
                            <option key={air.code} value={air.code} className="bg-[#111318] text-white">{air.name}</option>
                          ) : null
                        ))}
                        {worldDestinations.map(air => (
                          <option key={`w-${air.code}`} value={air.code} className="bg-[#111318] text-white">{air.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="md:col-span-4">
                    <label className="block text-[9px] font-mono text-white/40 uppercase mb-1">Leg {idx + 1} - To</label>
                    <div className="relative">
                      <PlaneLanding className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                      <select
                        value={leg.destination}
                        onChange={(e) => handleLegChange(idx, 'destination', e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-xs font-semibold text-white cursor-pointer focus:outline-none"
                      >
                        {worldDestinations.map(air => (
                          <option key={air.code} value={air.code} className="bg-[#111318] text-white">{air.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div className="md:col-span-3">
                    <label className="block text-[9px] font-mono text-white/40 uppercase mb-1">Departure</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                      <input
                        type="date"
                        required
                        value={leg.departureDate}
                        onChange={(e) => handleLegChange(idx, 'departureDate', e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-white/5 py-2 pl-9 pr-2 text-xs font-semibold text-white cursor-pointer focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delete Leg button */}
                  <div className="md:col-span-1 flex justify-end pb-1">
                    <button
                      type="button"
                      disabled={multiCityLegs.length <= 2}
                      onClick={() => handleRemoveLeg(idx)}
                      className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/5 bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddLeg}
                className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider pl-4"
              >
                <Plus className="h-4 w-4" />
                <span>Add Onward Flight Leg</span>
              </button>
            </div>
          )}

          {/* Bottom Bar: Passenger Popover and Search Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            
            {/* Quick Filters Options */}
            <div className="flex items-center space-x-6">
              {/* Passengers selector with dropdown toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassengerMenu(!showPassengerMenu)}
                  className="flex items-center space-x-2 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-[#F9F7F2] uppercase tracking-wider hover:bg-white/10"
                >
                  <User className="h-4 w-4 text-white/40" />
                  <span>{totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}</span>
                  <ChevronDown className="h-3 w-3 text-white/40" />
                </button>

                {showPassengerMenu && (
                  <div className="absolute left-0 mt-2 z-40 w-64 rounded-sm border border-white/10 bg-[#111318] p-4 shadow-2xl text-[#F9F7F2]">
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white block">Adults</span>
                          <span className="text-[10px] text-white/40">Age 12+</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handlePassengerCount('adults', 'sub')}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">{criteria.passengers.adults}</span>
                          <button
                            type="button"
                            onClick={() => handlePassengerCount('adults', 'add')}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white block">Children</span>
                          <span className="text-[10px] text-white/40">Age 2-11</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handlePassengerCount('children', 'sub')}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">{criteria.passengers.children}</span>
                          <button
                            type="button"
                            onClick={() => handlePassengerCount('children', 'add')}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white block">Infants</span>
                          <span className="text-[10px] text-white/40">Under 2 (on lap)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handlePassengerCount('infants', 'sub')}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">{criteria.passengers.infants}</span>
                          <button
                            type="button"
                            onClick={() => handlePassengerCount('infants', 'add')}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowPassengerMenu(false)}
                      className="mt-4 w-full rounded-sm bg-[#F9F7F2] py-2 text-center text-[10px] font-bold text-[#05070A] uppercase tracking-wider hover:bg-white"
                    >
                      Apply Selection
                    </button>
                  </div>
                )}
              </div>

              {/* Toggle 1: Nearby Airports */}
              <label className="hidden sm:flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nearbyAirports}
                  onChange={(e) => setNearbyAirports(e.target.checked)}
                  className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4"
                />
                <span className="text-xs text-white/60 font-medium tracking-wide">Include nearby UK airports</span>
              </label>

              {/* Toggle 2: Flexible Dates */}
              <label className="hidden sm:flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flexibleDates}
                  onChange={(e) => setFlexibleDates(e.target.checked)}
                  className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4"
                />
                <span className="text-xs text-white/60 font-medium tracking-wide">Flexible dates (±3 days)</span>
              </label>
            </div>

            {/* Submission CTA */}
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-[#F9F7F2] px-8 py-4 text-xs font-bold tracking-widest text-[#05070A] uppercase transition-all hover:bg-white shadow-lg shadow-black/40"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
