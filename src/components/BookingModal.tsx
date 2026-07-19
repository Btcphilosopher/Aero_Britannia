/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Flight, Passenger, Trip } from '../types';
import { ShieldCheck, User, CreditCard, ChevronRight, Check, X, Plane, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface BookingModalProps {
  flight: Flight;
  onClose: () => void;
  onCompleteBooking: (trip: Trip) => void;
}

export default function BookingModal({ flight, onClose, onCompleteBooking }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loyaltyNumber, setLoyaltyNumber] = useState('');

  // Seat Selection State
  const [selectedSeat, setSelectedSeat] = useState<string>('');

  // Optional luggage add-ons
  const [extraLuggage, setExtraLuggage] = useState<boolean>(false);
  const [priorityBoarding, setPriorityBoarding] = useState<boolean>(false);

  // Generate deterministic seat map depending on cabin
  const seatMap = useMemo(() => {
    const rows = flight.cabinClass === 'first' ? 4 : flight.cabinClass === 'business' ? 6 : 10;
    const cols = flight.cabinClass === 'first' || flight.cabinClass === 'business' ? ['A', 'D', 'G', 'K'] : ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // Occupied seats list
    const occupied = new Set<string>();
    cols.forEach(col => {
      for (let r = 1; r <= rows; r++) {
        if (Math.random() > 0.6) {
          occupied.add(`${r}${col}`);
        }
      }
    });

    return { rows, cols, occupied };
  }, [flight]);

  const totalPrice = useMemo(() => {
    let total = flight.price;
    if (extraLuggage) total += 40;
    if (priorityBoarding) total += 25;
    return total;
  }, [flight.price, extraLuggage, priorityBoarding]);

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && passportNumber && email) {
      setStep(2);
    }
  };

  const handleSeatSelect = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleConfirmSeat = () => {
    if (selectedSeat) {
      setStep(3);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking finish
    const bookingRef = `${flight.airline.code}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const generatedTrip: Trip = {
      id: `trip-${Date.now()}`,
      flight,
      passengerDetails: {
        firstName,
        lastName,
        passportNumber,
        email,
        loyaltyNumber: loyaltyNumber || undefined
      },
      seatNumber: selectedSeat,
      bookingCode: bookingRef,
      status: 'upcoming',
      departureGate: `${flight.airline.code === 'BA' ? 'A' : 'B'}${Math.floor(10 + Math.random() * 15)}`,
      boardingTime: `${String(Math.floor(Math.random() * 2) + 7).padStart(2, '0')}:45`,
      createdAt: new Date().toISOString()
    };
    
    setStep(4);
    setTimeout(() => {
      onCompleteBooking(generatedTrip);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070A]/90 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-4xl bg-[#111318] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[550px]"
      >
        
        {/* Left Side: Summary Panel (Aviation blue backdrop) */}
        <div className="hidden md:flex flex-col justify-between w-80 bg-[#05070A]/80 text-white/70 p-6 border-r border-white/10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg tracking-[0.2em] text-[#F9F7F2]">AEROBRITANNIA</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-mono text-[9px] text-white/40 block uppercase">Selected Flight</span>
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <span>{flight.departureAirport.city}</span>
                  <span>➔</span>
                  <span>{flight.arrivalAirport.city}</span>
                </span>
                <span className="font-mono text-[10px] text-white/40">{flight.airline.name} • {flight.flightNumber}</span>
              </div>

              <div>
                <span className="font-mono text-[9px] text-white/40 block uppercase">Departure Details</span>
                <span className="text-xs font-semibold text-white block">{flight.departureTime}</span>
                <span className="font-mono text-[10px] text-white/30">{flight.aircraft}</span>
              </div>

              {selectedSeat && (
                <div>
                  <span className="font-mono text-[9px] text-white/40 block uppercase">Assigned Seat</span>
                  <span className="text-xs font-bold text-amber-400">{selectedSeat}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="font-mono text-white/40 uppercase">Subtotal</span>
              <span className="font-serif text-lg font-light text-[#F9F7F2]">£{totalPrice}</span>
            </div>
            <p className="text-[9px] leading-relaxed text-white/30 font-mono">
              Prices include all passenger duties, security fees, and carbon offset initiatives.
            </p>
          </div>
        </div>

        {/* Right Side: Step Contents */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-[#111318] relative text-white">
          
          {/* Close trigger */}
          {step !== 4 && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Step Indicator Header */}
          {step !== 4 && (
            <div className="flex items-center space-x-6 border-b border-white/5 pb-4 mb-6">
              {[
                { s: 1, label: 'Passenger' },
                { s: 2, label: 'Seat' },
                { s: 3, label: 'Secure Payment' }
              ].map(indicator => (
                <div 
                  key={indicator.s} 
                  className={`flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider ${step === indicator.s ? 'text-[#F9F7F2] font-bold' : 'text-white/20'}`}
                >
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center border font-mono text-[9px] ${step === indicator.s ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold' : 'border-white/10'}`}>
                    {indicator.s}
                  </span>
                  <span className="hidden sm:inline">{indicator.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Step Panels */}
          <div className="flex-1">
            {step === 1 && (
              /* Step 1: Personal Details */
              <form onSubmit={handleSubmitDetails} className="space-y-4">
                <h3 className="font-serif text-xl font-normal text-[#F9F7F2] mb-4">Passenger Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-white/50 uppercase mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arthur"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-white/50 uppercase mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wellesley"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-white/50 uppercase mb-2">Passport Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GB981247"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-white/50 uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. arthur@houseoflords.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-white/50 uppercase mb-2">Executive Loyalty Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. BA-98274193"
                    value={loyaltyNumber}
                    onChange={(e) => setLoyaltyNumber(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 uppercase tracking-widest hover:bg-amber-300 transition-colors"
                  >
                    Select Cabin Seating
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              /* Step 2: Cabin Seat selector grid */
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-serif text-xl font-normal text-[#F9F7F2]">Select Seating</h3>
                    <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Cabin: {flight.cabinClass.replace('_', ' ')}</p>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center space-x-3 text-[10px] font-mono uppercase">
                    <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-white/10 border border-white/10 inline-block" /> Free</span>
                    <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-amber-400 inline-block" /> Mine</span>
                    <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-white/5 border border-transparent opacity-50 inline-block" /> Occupied</span>
                  </div>
                </div>

                {/* Aircraft seating scroll panel */}
                <div className="border border-white/10 rounded-xl bg-white/5 p-4 max-h-64 overflow-y-auto scrollbar-none flex flex-col items-center">
                  <div className="w-11/12 border border-dashed border-white/10 p-2 text-center text-[9px] font-mono uppercase tracking-widest text-white/40 mb-4 bg-[#111318] rounded-t-full">
                    Cockpit • Front of Aircraft
                  </div>

                  <div className="space-y-2">
                    {Array.from({ length: seatMap.rows }).map((_, rIdx) => {
                      const rowNum = rIdx + 1;
                      return (
                        <div key={rowNum} className="flex items-center space-x-3">
                          <span className="w-4 font-mono text-[10px] text-white/40 font-bold text-center">{rowNum}</span>
                          
                          <div className="flex items-center space-x-1.5">
                            {seatMap.cols.map((col, cIdx) => {
                              const seatId = `${rowNum}${col}`;
                              const isOccupied = seatMap.occupied.has(seatId);
                              const isSelected = selectedSeat === seatId;
                              
                              // Create gap in center for aisle
                              const isAisle = cIdx === Math.floor(seatMap.cols.length / 2);

                              return (
                                <React.Fragment key={col}>
                                  {isAisle && <div className="w-6 h-6 flex items-center justify-center font-mono text-[8px] text-white/30">||</div>}
                                  
                                  <button
                                    type="button"
                                    disabled={isOccupied}
                                    onClick={() => handleSeatSelect(seatId)}
                                    className="h-6 w-7 rounded-sm text-[9px] font-bold font-mono transition-all flex items-center justify-center"
                                    style={{
                                      backgroundColor: isSelected ? '#fbbf24' : (isOccupied ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)'),
                                      border: isSelected ? '1px solid #d97706' : '1px solid rgba(255,255,255,0.1)',
                                      color: isSelected ? '#090d16' : (isOccupied ? 'rgba(255,255,255,0.2)' : '#ffffff'),
                                      cursor: isOccupied ? 'not-allowed' : 'pointer',
                                      opacity: isOccupied ? 0.4 : 1
                                    }}
                                  >
                                    {col}
                                  </button>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white"
                  >
                    Back to Passenger info
                  </button>
                  <button
                    type="button"
                    disabled={!selectedSeat}
                    onClick={handleConfirmSeat}
                    className="rounded-lg bg-amber-400 disabled:opacity-50 px-6 py-3 text-xs font-bold text-slate-950 uppercase tracking-widest hover:bg-amber-300 transition-colors"
                  >
                    Confirm Seat {selectedSeat}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              /* Step 3: Payment details & Add-ons */
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-normal text-[#F9F7F2] mb-2">Receipt & Payment</h3>
                
                {/* Optional Ancillaries */}
                <div className="space-y-2 mb-4 border-b border-white/5 pb-4">
                  <span className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">Enhance Trip Selection</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="checkbox"
                          checked={extraLuggage}
                          onChange={(e) => setExtraLuggage(e.target.checked)}
                          className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-[#111318] h-4 w-4"
                        />
                        <span className="text-xs font-semibold text-white">Additional Checked Bag (+23kg)</span>
                      </div>
                      <span className="font-mono text-xs text-white/50">+£40</span>
                    </label>

                    <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="checkbox"
                          checked={priorityBoarding}
                          onChange={(e) => setPriorityBoarding(e.target.checked)}
                          className="rounded border-white/20 text-emerald-500 focus:ring-emerald-600 bg-[#111318] h-4 w-4"
                        />
                        <span className="text-xs font-semibold text-white">Priority Security & Boarding</span>
                      </div>
                      <span className="font-mono text-xs text-white/50">+£25</span>
                    </label>
                  </div>
                </div>

                {/* Fake Credit Card Form */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-1.5">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arthur Wellesley"
                      defaultValue={`${firstName} ${lastName}`}
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2 px-3 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-1.5">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4532 •••• •••• ••••"
                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2 px-3 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-1.5">CVV Code</label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="•••"
                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2 px-3 text-xs font-semibold text-white placeholder-white/20 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white"
                  >
                    Change Seating
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 uppercase tracking-widest hover:bg-emerald-400 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              /* Step 4: Booking processing / confirmation success cards */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 animate-bounce" />
                </div>
                
                <h3 className="font-serif text-2xl font-light text-[#F9F7F2]">Secure Ticket Authorized</h3>
                <p className="text-xs text-white/50 max-w-sm leading-relaxed">
                  We have verified your credentials and booked your premium cabin. Your digital boarding pass has been compiled and is now stored in your <span className="font-semibold text-amber-400">My Trips</span> panel.
                </p>

                <div className="flex items-center space-x-2 text-white/40 font-mono text-[10px]">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>Syncing with local Executive wallet...</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
