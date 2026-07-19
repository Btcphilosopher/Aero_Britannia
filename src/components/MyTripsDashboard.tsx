/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trip, SavedSearch, FareAlert } from '../types';
import { User, Bell, Trash2, Calendar, ShieldCheck, Ticket, QrCode, Plane, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface MyTripsDashboardProps {
  trips: Trip[];
  savedSearches: SavedSearch[];
  fareAlerts: FareAlert[];
  onRemoveSearch: (id: string) => void;
  onRemoveTrip: (id: string) => void;
  onNavigateSearch: (search: SavedSearch) => void;
}

export default function MyTripsDashboard({
  trips,
  savedSearches,
  fareAlerts,
  onRemoveSearch,
  onRemoveTrip,
  onNavigateSearch
}: MyTripsDashboardProps) {

  // Mock Executive loyalty details
  const loyaltyDetails = {
    tier: 'Silver Member',
    avios: 42850,
    tierPoints: 340,
    nextTierPoints: 600,
    memberNumber: 'BA-98274193',
    tierColor: 'border-slate-300 text-slate-500 bg-slate-50'
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-12 pb-24">
      
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="font-mono text-xs tracking-wider text-white/40 uppercase">Executive Club Dashboard</span>
        <h1 className="font-serif text-4xl font-light text-[#F9F7F2] mt-1">My Journeys</h1>
        <p className="text-xs text-white/50 font-medium mt-1">Manage active itineraries, tracked routes, price alerts, and Avios tier status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans): Active Bookings & Fare Alerts */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Active Bookings Section */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-[#F9F7F2] flex items-center gap-2">
              <Ticket className="h-5 w-5 text-emerald-400" />
              Active Boarding Passes
            </h2>

            {trips.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
                <Ticket className="h-10 w-10 text-white/30 mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-base font-medium text-white mt-3">No Upcoming Itineraries</h3>
                <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto">
                  Book premium flights in the search portal to access digital boarding passes and active travel notifications here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {trips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
                  >
                    
                    {/* Boarding Ticket Header */}
                    <div className="bg-white/5 text-amber-400 px-5 py-3.5 flex justify-between items-center border-b border-white/5 font-mono text-[10px] tracking-wider uppercase">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#F9F7F2]">{trip.flight.airline.name}</span>
                        <span className="text-white/10">•</span>
                        <span>Flight {trip.flight.flightNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#F9F7F2]/40">Status:</span>
                        <span className="text-emerald-400 font-bold">Confirmed</span>
                      </div>
                    </div>

                    {/* Ticket Core details */}
                    <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left side: route details */}
                      <div className="md:col-span-8 grid grid-cols-12 gap-4 items-center">
                        
                        {/* Origin Code */}
                        <div className="col-span-4">
                          <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">Origin</span>
                          <span className="font-sans text-3xl font-bold tracking-tight text-white block">{trip.flight.departureAirport.code}</span>
                          <span className="font-sans text-xs text-white/50">{trip.flight.departureAirport.city}</span>
                        </div>

                        {/* Middle Arrow */}
                        <div className="col-span-4 flex flex-col items-center justify-center">
                          <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block mb-1">
                            {trip.flight.cabinClass.replace('_', ' ')}
                          </span>
                          <div className="relative w-full h-[1px] bg-white/10">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 bg-white/20 rounded-full" />
                          </div>
                          <span className="font-mono text-[9px] text-white/50 mt-1">{trip.flight.departureTime}</span>
                        </div>

                        {/* Destination Code */}
                        <div className="col-span-4 text-right">
                          <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">Destination</span>
                          <span className="font-sans text-3xl font-bold tracking-tight text-white block">{trip.flight.arrivalAirport.code}</span>
                          <span className="font-sans text-xs text-white/50">{trip.flight.arrivalAirport.city}</span>
                        </div>

                      </div>

                      {/* Right side: passenger & boarding barcode */}
                      <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex items-center justify-between md:justify-around gap-4">
                        
                        {/* Passenger information block */}
                        <div className="space-y-1.5 text-xs">
                          <div>
                            <span className="font-mono text-[9px] text-white/40 block uppercase">Passenger</span>
                            <span className="font-bold text-white leading-none">
                              {trip.passengerDetails.firstName} {trip.passengerDetails.lastName}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div>
                              <span className="font-mono text-[9px] text-white/40 block uppercase">Seat</span>
                              <span className="font-bold text-white">{trip.seatNumber}</span>
                            </div>
                            <div>
                              <span className="font-mono text-[9px] text-white/40 block uppercase">Record</span>
                              <span className="font-bold text-white font-mono">{trip.bookingCode}</span>
                            </div>
                          </div>
                        </div>

                        {/* Barcode representation */}
                        <div className="flex flex-col items-center justify-center p-1.5 bg-white/5 border border-white/10 rounded-sm">
                          <QrCode className="h-12 w-12 text-[#F9F7F2]" />
                          <span className="font-mono text-[7px] text-white/40 uppercase tracking-wider mt-1">Scan Pass</span>
                        </div>

                      </div>

                    </div>

                    {/* Extra flight gate info details */}
                    <div className="bg-white/5 px-5 py-2.5 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] font-mono text-white/40 gap-2">
                      <div className="flex items-center space-x-4">
                        <span>Boarding Time: <span className="font-bold text-[#F9F7F2]">{trip.boardingTime || '12:45'}</span></span>
                        <span>Gate: <span className="font-bold text-[#F9F7F2]">{trip.departureGate || 'A14'}</span></span>
                      </div>
                      <button
                        onClick={() => onRemoveTrip(trip.id)}
                        className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider"
                      >
                        Cancel Booking
                      </button>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Searches / Price Alerts Grid */}
          <div className="space-y-4 border-t border-white/10 pt-10">
            <h2 className="font-serif text-2xl font-light text-[#F9F7F2] flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-400" />
              Saved Routes & Active Fare Trackers
            </h2>

            {savedSearches.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
                <Bell className="h-10 w-10 text-white/30 mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-base font-medium text-white mt-3">No Tracked Routes</h3>
                <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto">
                  Click 'Track Fares & Alerts' during flight search to monitor pricing and receive instant notifications.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-4 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div className="flex items-center space-x-1 font-sans text-xs font-bold text-white">
                        <span>{search.departure.city}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white/30" />
                        <span>{search.arrival.city}</span>
                      </div>
                      <button
                        onClick={() => onRemoveSearch(search.id)}
                        className="text-white/40 hover:text-red-400 transition-colors"
                        title="Delete track"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono text-[9px] text-white/40 block uppercase">Class Class</span>
                        <span className="font-semibold text-white/75 capitalize">{search.cabinClass.replace('_', ' ')}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-white/40 block uppercase">Track Date</span>
                        <span className="font-semibold text-white/75">{search.createdAt}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-white/40 block uppercase">Status</span>
                        <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ACTIVE
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateSearch(search)}
                      className="w-full text-center rounded-lg border border-white/10 bg-white/5 py-2 text-[10px] font-bold text-[#F9F7F2] uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Search Current Pricing
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Executive Loyalty Status & Document reminders */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Executive Club Membership Card */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-white/40" />
                <span className="font-sans text-xs font-bold text-[#F9F7F2] uppercase tracking-wider">Executive Card</span>
              </div>
              <span className="font-mono text-[9px] text-white/40">{loyaltyDetails.memberNumber}</span>
            </div>

            {/* Loyalty tier info */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">Active Tier</span>
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-light text-white">{loyaltyDetails.tier}</span>
                <span className="rounded-xs bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#F9F7F2]">
                  BRITISH AIRWAYS
                </span>
              </div>
            </div>

            {/* Loyalty parameters */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div>
                <span className="font-mono text-[9px] text-white/40 block uppercase">Avios Points Balance</span>
                <span className="font-sans text-lg font-bold text-white">{loyaltyDetails.avios.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-white/40 block uppercase">Tier Points</span>
                <span className="font-sans text-lg font-bold text-white">{loyaltyDetails.tierPoints} / {loyaltyDetails.nextTierPoints}</span>
              </div>
            </div>

            {/* Tier points slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>Bronze level: 300</span>
                <span>Silver level: 600</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 border border-white/5">
                <div 
                  className="h-full bg-[#F9F7F2] rounded-full" 
                  style={{ width: `${(loyaltyDetails.tierPoints / loyaltyDetails.nextTierPoints) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-white/50 leading-relaxed block">
                Accumulate 260 more tier points to reach Gold membership benefits.
              </span>
            </div>
          </div>

          {/* Current pricing movements list (simulating Fare alerts) */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-normal text-[#F9F7F2] flex items-center gap-2">
              <TrendingDown className="h-4.5 w-4.5 text-emerald-400" />
              Dynamic Fare Alerts
            </h3>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              Recent fare movements observed on monitored flight paths over the last 24 hours.
            </p>

            <div className="space-y-3">
              {fareAlerts.map(alert => (
                <div key={alert.id} className="rounded-lg border border-white/10 bg-white/5 p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{alert.route}</span>
                    <span className="text-[9px] text-white/40 font-mono">{alert.createdAt}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {alert.direction === 'down' ? (
                        <>
                          <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="font-serif font-bold text-emerald-400">£{alert.currentPrice}</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-3.5 w-3.5 text-red-400" />
                          <span className="font-serif font-bold text-red-400">£{alert.currentPrice}</span>
                        </>
                      )}
                    </div>
                    <span className="text-[9px] text-white/40 font-mono">Was £{alert.previousPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel documents Checklist */}
          <div className="rounded-xl border border-white/10 bg-[#111318]/90 backdrop-blur-xl p-5 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-normal text-[#F9F7F2] flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
              Departure Protocols
            </h3>
            <ul className="space-y-3 text-xs text-white/60 font-medium">
              <li className="flex items-start space-x-2.5">
                <input type="checkbox" defaultChecked className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4 mt-0.5" />
                <span>UK Passport Valid for next 6 months</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <input type="checkbox" defaultChecked className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4 mt-0.5" />
                <span>US ESTA Travel Waiver Approved</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <input type="checkbox" className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-white/5 h-4 w-4 mt-0.5" />
                <span>Download offline PDF Itineraries</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
