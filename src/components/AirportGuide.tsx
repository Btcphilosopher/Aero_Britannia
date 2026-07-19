/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MapPin, Info, Coffee, ShoppingBag, ShieldCheck, Bus, Train, CloudSun, Compass, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { airports } from '../data/airports';
import { motion } from 'motion/react';

export default function AirportGuide() {
  const [selectedAirportId, setSelectedAirportId] = useState<string>('LHR');
  const [boardType, setBoardType] = useState<'departures' | 'arrivals'>('departures');

  const airport = useMemo(() => {
    return airports.find(a => a.id === selectedAirportId) || airports[0];
  }, [selectedAirportId]);

  // Generate dynamic schedule board flights relative to current date/time
  const mockSchedules = useMemo(() => {
    const list = [];
    const airlines = [
      { name: 'British Airways', code: 'BA', logo: '🇬🇧' },
      { name: 'Virgin Atlantic', code: 'VS', logo: '❤️' },
      { name: 'Lufthansa', code: 'LH', logo: '🇩🇪' },
      { name: 'Air France', code: 'AF', logo: '🇫🇷' },
      { name: 'Emirates', code: 'EK', logo: '🇦🇪' }
    ];

    const destinations = [
      { city: 'New York', code: 'JFK' },
      { city: 'Dubai', code: 'DXB' },
      { city: 'Nice', code: 'NCE' },
      { city: 'Paris', code: 'CDG' },
      { city: 'Zurich', code: 'ZRH' },
      { city: 'Edinburgh', code: 'EDI' },
      { city: 'Munich', code: 'MUC' },
      { city: 'Tokyo', code: 'HND' }
    ];

    const statusesDepartures = ['Boarding', 'Gate Close', 'Scheduled', 'Delayed 15m', 'Departed'];
    const statusesArrivals = ['Landed 12:15', 'On Time', 'Delayed 10m', 'Baggage Track', 'Approaching'];

    // Generate ~8 departures
    for (let i = 0; i < 8; i++) {
      const flightNum = `${airlines[i % airlines.length].code}${200 + i * 17}`;
      const dest = destinations[i % destinations.length];
      const hour = 13 + i;
      const min = (i * 12) % 60;
      const time = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      
      list.push({
        id: `dep-${i}`,
        flightNumber: flightNum,
        airline: airlines[i % airlines.length],
        destination: dest.city,
        destinationCode: dest.code,
        time,
        gate: `A${10 + i * 2}`,
        terminal: airport.terminals[0]?.name || 'Terminal 1',
        status: statusesDepartures[i % statusesDepartures.length]
      });
    }

    // Generate ~8 arrivals
    const arrList = [];
    for (let i = 0; i < 8; i++) {
      const flightNum = `${airlines[(i + 2) % airlines.length].code}${400 + i * 13}`;
      const origin = destinations[(i + 3) % destinations.length];
      const hour = 11 + i;
      const min = (i * 9) % 60;
      const time = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

      arrList.push({
        id: `arr-${i}`,
        flightNumber: flightNum,
        airline: airlines[(i + 2) % airlines.length],
        origin: origin.city,
        originCode: origin.code,
        time,
        gate: `B${12 + i}`,
        terminal: airport.terminals[0]?.name || 'Terminal 1',
        status: statusesArrivals[i % statusesArrivals.length]
      });
    }

    return { departures: list, arrivals: arrList };
  }, [airport]);

  const activeBoard = boardType === 'departures' ? mockSchedules.departures : mockSchedules.arrivals;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-12 pb-24">
      
      {/* Selector and Hub Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-6">
        <div>
          <span className="font-mono text-xs tracking-wider text-white/40 uppercase">National Airport Network</span>
          <h1 className="font-serif text-4xl font-light text-[#F9F7F2] mt-1">United Kingdom Gateways</h1>
          <p className="text-xs text-white/50 font-medium mt-1">Explore real-time terminal guides, live timetables, and luxury airport lounges.</p>
        </div>

        {/* Airport Switches */}
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-sm gap-1 overflow-x-auto scrollbar-none self-start">
          {airports.map(air => (
            <button
              key={air.id}
              onClick={() => setSelectedAirportId(air.id)}
              className="rounded-xs px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap"
              style={{
                backgroundColor: selectedAirportId === air.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: selectedAirportId === air.id ? '#F9F7F2' : 'rgba(255, 255, 255, 0.4)',
                boxShadow: selectedAirportId === air.id ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              {air.id} • {air.city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Airport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Airport Bio & Live Board */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Airport Header Card */}
          <div className="relative h-80 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#05070A]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/40 to-transparent z-10" />
            <img
              src={airport.image}
              alt={airport.name}
              className="h-full w-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            
            {/* Absolute positioning of details */}
            <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="rounded-xs bg-amber-400 px-2 py-0.5 font-mono text-[10px] font-bold text-[#05070A]">UK HUB</span>
                <span className="flex items-center space-x-1 font-mono text-xs text-stone-300">
                  <CloudSun className="h-3.5 w-3.5 text-stone-400" />
                  <span>{airport.weather.temp}°C • {airport.weather.condition}</span>
                </span>
              </div>
              <h2 className="font-serif text-3xl font-normal text-white">{airport.name}</h2>
              <p className="text-stone-300/90 text-xs font-light leading-relaxed max-w-xl">
                {airport.description}
              </p>
            </div>
          </div>

          {/* Live Flight Information Board (Heathrow T5 Style) */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">Live Operations Board</span>
              </div>
              
              <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-sm gap-0.5 text-[10px] font-mono">
                <button
                  onClick={() => setBoardType('departures')}
                  className={`rounded-xs px-3 py-1 font-bold uppercase transition-all ${boardType === 'departures' ? 'bg-[#F9F7F2] text-[#05070A]' : 'text-[#F9F7F2]/40'}`}
                >
                  <PlaneTakeoff className="h-3 w-3 inline mr-1" />
                  Departures
                </button>
                <button
                  onClick={() => setBoardType('arrivals')}
                  className={`rounded-xs px-3 py-1 font-bold uppercase transition-all ${boardType === 'arrivals' ? 'bg-[#F9F7F2] text-[#05070A]' : 'text-[#F9F7F2]/40'}`}
                >
                  <PlaneLanding className="h-3 w-3 inline mr-1" />
                  Arrivals
                </button>
              </div>
            </div>

            {/* Timetable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase pb-2">
                    <th className="py-2.5">Time</th>
                    <th>Flight</th>
                    <th>{boardType === 'departures' ? 'Destination' : 'Origin'}</th>
                    <th className="hidden sm:table-cell">Terminal</th>
                    <th className="hidden sm:table-cell">Gate</th>
                    <th className="text-right">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {activeBoard.map(sched => (
                    <tr key={sched.id} className="hover:bg-white/5 transition-colors">
                       <td className="py-3 text-amber-300 font-bold">{sched.time}</td>
                      <td className="font-bold">{sched.flightNumber}</td>
                      <td>
                        <span className="font-sans font-medium text-[#F9F7F2]">{boardType === 'departures' ? sched.destination : sched.origin}</span>{' '}
                        <span className="text-white/30">({boardType === 'departures' ? sched.destinationCode : sched.originCode})</span>
                      </td>
                      <td className="hidden sm:table-cell text-white/50">{sched.terminal}</td>
                      <td className="hidden sm:table-cell text-white/50">{sched.gate}</td>
                      <td className="text-right">
                        <span
                          className="rounded-xs px-2 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            backgroundColor: sched.status.includes('Delayed') ? 'rgba(239, 68, 68, 0.15)' : (sched.status.includes('Boarding') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)'),
                            color: sched.status.includes('Delayed') ? '#ef4444' : (sched.status.includes('Boarding') ? '#10b981' : '#a3a3a3')
                          }}
                        >
                          {sched.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Lounges & Transit guides */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Lounges Discovery section */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#F9F7F2] flex items-center gap-2">
              <Coffee className="h-4 w-4 text-emerald-400" />
              Lounge Sanctuary Guides
            </h3>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              Aerobritannia passengers enjoy exclusive pre-flight lounge access options at our key terminal structures.
            </p>

            <div className="divide-y divide-white/10">
              {airport.terminals[0]?.lounges.map((lounge, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{lounge.name}</span>
                    <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                      {lounge.operator}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/50 font-light">{lounge.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {lounge.amenities.slice(0, 3).map((am, i) => (
                      <span key={i} className="font-mono text-[8px] bg-white/5 text-white/60 px-1.5 py-0.5 rounded-xs uppercase">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Public Transport connections */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#F9F7F2] flex items-center gap-2">
              <Train className="h-4 w-4 text-emerald-400" />
              City Connectivity
            </h3>
            <p className="text-xs text-white/50 font-light">
              High-speed rail, commuter connections, and express coaches servicing this terminal structure.
            </p>

            <div className="space-y-3">
              {airport.transport.map((trans, idx) => (
                <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      {trans.type === 'express' || trans.type === 'train' ? <Train className="h-3.5 w-3.5 text-white/40" /> : <Bus className="h-3.5 w-3.5 text-white/40" />}
                      {trans.name}
                    </span>
                    <span className="font-mono text-emerald-400">£{trans.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-white/40">
                    <span>Duration: {trans.duration} mins</span>
                    <span>{trans.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Luxury Hotels */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#F9F7F2] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Partner Accommodations
            </h3>
            <div className="space-y-3 divide-y divide-white/10">
              {airport.hotels.map((hot, i) => (
                <div key={i} className="flex items-center justify-between text-xs pt-3 first:pt-0">
                  <div>
                    <span className="font-bold text-white block">{hot.name}</span>
                    <span className="text-[10px] text-white/40 font-mono">{hot.distance}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-semibold text-[#F9F7F2] block">£{hot.price}</span>
                    <span className="text-[10px] text-amber-400 font-semibold font-mono">★ {hot.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
