/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plane, Compass, MapPin, Calendar, User, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedTripsCount: number;
}

export default function Navigation({ activeTab, setActiveTab, savedTripsCount }: NavigationProps) {
  const navItems = [
    { id: 'search', label: 'Search Flights', icon: Plane },
    { id: 'explorer', label: 'Destination Explorer', icon: Compass },
    { id: 'status', label: 'Flight Status', icon: Activity },
    { id: 'airports', label: 'Airport Guides', icon: MapPin },
    { id: 'trips', label: 'My Trips', icon: User, badge: savedTripsCount > 0 ? savedTripsCount : undefined }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05070A]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo - Distinctly British & Premium */}
        <div 
          onClick={() => setActiveTab('search')} 
          className="group flex cursor-pointer items-center space-x-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-white/5 font-sans text-sm font-semibold tracking-wider text-[#F9F7F2] border border-white/20 shadow-sm transition-transform group-hover:scale-102">
            Æ
            <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-600 border border-[#05070A]" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-[0.2em] text-[#F9F7F2]">AEROBRITANNIA</span>
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Britain's Flight Platform</span>
          </div>
        </div>

        {/* Navigation Tabs - Editorial Swiss-Modern minimalism */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative flex items-center space-x-2 rounded-md px-4 py-2.5 text-sm font-medium tracking-wide transition-all hover:bg-white/5"
                style={{ color: isActive ? '#F9F7F2' : 'rgba(255, 255, 255, 0.5)' }}
              >
                <Icon className="h-4 w-4 stroke-[1.8px]" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 font-sans text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#F9F7F2]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Corner Details - High-end Lounge status indicator */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col items-end border-r border-white/10 pr-4">
            <div className="flex items-center space-x-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">LHR Terminal 5</span>
            </div>
            <span className="font-mono text-[9px] text-white/40">Status: Operations Normal</span>
          </div>

          <button 
            onClick={() => setActiveTab('trips')}
            className="flex items-center space-x-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wider text-[#F9F7F2] uppercase shadow-sm transition-all hover:bg-white/10 hover:border-white/20"
          >
            <User className="h-3.5 w-3.5 text-white/80" />
            <span className="hidden sm:inline">Executive Club</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Rail */}
      <div className="flex md:hidden border-t border-white/10 bg-[#05070A]/95 overflow-x-auto scrollbar-none px-2 justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center space-y-1 py-2.5 px-3 text-[10px] font-medium tracking-wide"
              style={{ color: isActive ? '#F9F7F2' : 'rgba(255, 255, 255, 0.4)' }}
            >
              <Icon className="h-4.5 w-4.5 stroke-[1.8px]" />
              <span className="whitespace-nowrap">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
