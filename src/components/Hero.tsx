/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, ChevronRight, Compass, Shield } from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
  onExploreClick: () => void;
  onStatusClick: () => void;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  accentColor: string;
  location: string;
}

export default function Hero({ onSearchClick, onExploreClick, onStatusClick }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 0,
      title: 'BRITAIN TAKES FLIGHT',
      subtitle: 'LONDON GATEWAY',
      desc: 'Embark from the UK’s architectural masterworks. Experience departures tailored with absolute precision, quiet luxury lounges, and unparalleled connections from the heart of the capital.',
      image: '/src/assets/images/hero_london_skyline_1784489513370.jpg',
      accentColor: 'border-amber-400 text-amber-400',
      location: 'Heathrow Runway 27R, London'
    },
    {
      id: 1,
      title: 'THE SCOTTISH HIGHLANDS',
      subtitle: 'REGIONAL MAJESTY',
      desc: 'Discover soaring peaks, dramatic valleys, and tranquil lochs. Connect directly from Edinburgh and Glasgow to remote islands and international business centers with regional refinement.',
      image: '/src/assets/images/scenery_scottish_highlands_1784489525455.jpg',
      accentColor: 'border-emerald-500 text-emerald-400',
      location: 'Above Glen Coe, Scotland'
    },
    {
      id: 2,
      title: 'TERMINAL ARCHITECTURE',
      subtitle: 'ENGINEERED SEAMLESSNESS',
      desc: 'Step into a world of light and glass. Designed by leading architects, our digital and physical spaces make modern departures feel calm, efficient, and inspiring.',
      image: '/src/assets/images/heathrow_terminal_5_interior_1784489537047.jpg',
      accentColor: 'border-blue-400 text-blue-400',
      location: 'Heathrow Terminal 5 Departures'
    }
  ];

  // Auto slide cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[640px] w-full overflow-hidden bg-[#05070A]">
      {/* Dynamic Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Overlay to preserve text contrast */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#05070A]/95 via-[#05070A]/75 to-transparent" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#05070A]/95 via-transparent to-[#05070A]/20" />
          
          <img
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            className="h-full w-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Content overlay */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-12 sm:px-8">
        {/* Top bar: Editorial Label */}
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs tracking-[0.25em] text-white/60 uppercase">Aerobritannia Dispatch</span>
          <div className="h-[1px] w-12 bg-white/20" />
          <span className="font-mono text-[10px] text-amber-400/90 tracking-widest uppercase">Issue No. 42</span>
        </div>

        {/* Central Content Column */}
        <div className="max-w-2xl my-auto space-y-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`sub-${activeSlide}`}
              className="inline-block rounded-xs border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold tracking-widest text-[#F9F7F2] backdrop-blur-xs"
            >
              ✦ {slides[activeSlide].subtitle}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              key={`title-${activeSlide}`}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl font-normal leading-[1.1] tracking-tight text-[#F9F7F2] sm:text-6xl md:text-7xl"
            >
              {slides[activeSlide].title.split(' ')[0]}
              <br />
              <span className="italic text-[#F9F7F2]/90 font-light">
                {slides[activeSlide].title.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            key={`desc-${activeSlide}`}
            transition={{ delay: 0.2 }}
            className="text-base text-[#F9F7F2]/70 leading-relaxed font-light"
          >
            {slides[activeSlide].desc}
          </motion.p>

          {/* Premium Call to Action Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onSearchClick}
              className="group flex items-center space-x-2.5 rounded-sm bg-[#F9F7F2] px-6 py-3.5 text-xs font-bold tracking-wider text-[#05070A] uppercase shadow-lg transition-all hover:bg-white hover:scale-[1.01]"
            >
              <span>Book Departures</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={onExploreClick}
              className="flex items-center space-x-2.5 rounded-sm border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold tracking-wider text-[#F9F7F2] uppercase backdrop-blur-xs transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Compass className="h-4 w-4 stroke-[1.8px] text-white/60" />
              <span>Explore Destinations</span>
            </button>
            
            <button
              onClick={onStatusClick}
              className="hidden sm:flex items-center space-x-2.5 rounded-sm border border-transparent bg-transparent px-5 py-3.5 text-xs font-semibold tracking-wider text-white/50 uppercase transition-all hover:text-[#F9F7F2]"
            >
              <span>Flight Status</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar: Indicators and Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-6 space-y-4 sm:space-y-0">
          {/* Slides navigation */}
          <div className="flex items-center space-x-4">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className="group flex items-center space-x-2 text-left text-white/60 hover:text-[#F9F7F2]"
              >
                <div className="relative h-1 w-10 overflow-hidden rounded-full bg-white/10">
                  {activeSlide === idx && (
                    <motion.div
                      layoutId="activeSlideIndicator"
                      className="absolute inset-0 bg-[#F9F7F2]"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
                <span className="font-mono text-[10px] tracking-wider uppercase hidden md:inline">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Location and assurance stats */}
          <div className="flex items-center space-x-6 text-white/60 font-mono text-xs">
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-white/40" />
              <span>{slides[activeSlide].location}</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1.5 border-l border-white/10 pl-6">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[#F9F7F2]/80">ATOL Protected • IATA Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
