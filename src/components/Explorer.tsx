/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { destinations } from '../data/destinations';
import { DestinationCategory, Destination } from '../types';
import { Compass, Heart, MapPin, ArrowRight, Calendar, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ExplorerProps {
  onSelectDestination: (destCode: string) => void;
}

export default function Explorer({ onSelectDestination }: ExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory | 'all'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories: Array<{ id: DestinationCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Gateways' },
    { id: 'beach', label: 'Beach escapes' },
    { id: 'city', label: 'City life' },
    { id: 'mountains', label: 'Alpine & Peak' },
    { id: 'winter_sun', label: 'Winter Sun' },
    { id: 'weekend_break', label: 'Weekend breaks' },
    { id: 'business', label: 'Business Hubs' },
    { id: 'adventure', label: 'Wild Adventure' },
    { id: 'culture', label: 'Rich Culture' }
  ];

  const filteredDestinations = useMemo(() => {
    if (activeCategory === 'all') return destinations;
    return destinations.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-12 pb-24">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-6">
        <div>
          <span className="font-mono text-xs tracking-wider text-white/40 uppercase">Editorial Curations</span>
          <h1 className="font-serif text-4xl font-light text-[#F9F7F2] mt-1">Destination Explorer</h1>
          <p className="text-xs text-white/50 font-medium mt-1">Browse world-renowned holiday capitals and global business centers.</p>
        </div>

        {/* Category Navigation - Minimal Editorial pills */}
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-sm gap-1 overflow-x-auto scrollbar-none self-start max-w-full">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-xs px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeCategory === cat.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeCategory === cat.id ? '#F9F7F2' : 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Curated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest, idx) => {
          const isFav = favorites.includes(dest.id);
          return (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.3) }}
              className="group flex flex-col rounded-xl border border-white/10 bg-[#111318]/90 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => onSelectDestination(dest.id)}
            >
              
              {/* Photo Canvas */}
              <div className="relative h-64 overflow-hidden bg-white/5">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badges */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="rounded-xs bg-black/85 backdrop-blur-xs px-2.5 py-1 font-mono text-[9px] font-bold text-stone-200 tracking-wider uppercase">
                    {dest.category.replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={(e) => toggleFavorite(dest.id, e)}
                  className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#111318]/95 hover:bg-[#111318] text-[#F9F7F2] border border-white/10 transition-all shadow-sm"
                >
                  <Heart className={`h-4.5 w-4.5 transition-colors ${isFav ? 'fill-red-600 text-red-600' : 'text-white/40 hover:text-white'}`} />
                </button>

                {/* Fade effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
                  <div className="flex items-center space-x-1.5 font-mono text-[10px] text-white font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>{dest.name}, {dest.country}</span>
                  </div>
                </div>
              </div>

              {/* Text content details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-white/50 leading-relaxed font-light">{dest.description}</p>
                  
                  {/* Top Attractions info bar */}
                  <div className="pt-2">
                    <span className="font-mono text-[9px] text-white/40 font-semibold tracking-wider uppercase block mb-1">Key Attractions</span>
                    <div className="flex flex-wrap gap-1">
                      {dest.topAttractions.slice(0, 3).map((attr, i) => (
                        <span key={i} className="font-sans text-[10px] bg-white/5 text-white/60 px-2 py-0.5 rounded-sm">
                          {attr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom details & action */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-white/40 block uppercase tracking-wider">Estimated Fares</span>
                    <span className="font-serif text-lg font-light text-[#F9F7F2]">From £{dest.priceEstimate}</span>
                  </div>

                  <div className="flex items-center space-x-1 font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider group-hover:text-emerald-300">
                    <span>Search Departures</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Grid of travel tips / Editorial layout */}
      <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/5 text-amber-400 border border-white/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <h4 className="font-serif text-lg font-normal text-[#F9F7F2]">Curated Flight Bundles</h4>
          <p className="text-xs text-white/50 leading-relaxed font-light">
            Receive exclusive fares paired with curated five-star accommodations. Seamless coordination with British Airways and partner hotels.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/5 text-amber-400 border border-white/10">
            <Calendar className="h-5 w-5" />
          </div>
          <h4 className="font-serif text-lg font-normal text-[#F9F7F2]">Flexible Scheduling</h4>
          <p className="text-xs text-white/50 leading-relaxed font-light">
            Activate price trackers on multi-city itineraries and get dynamic reminders regarding optimal booking dates throughout the year.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/5 text-amber-400 border border-white/10">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h4 className="font-serif text-lg font-normal text-[#F9F7F2]">Total Guarantee</h4>
          <p className="text-xs text-white/50 leading-relaxed font-light">
            All itineraries built on Aerobritannia are backed by ATOL licensing, offering flawless support for unexpected disruption.
          </p>
        </div>
      </div>

    </div>
  );
}
