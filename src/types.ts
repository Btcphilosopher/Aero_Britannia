/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export type DestinationCategory = 'beach' | 'city' | 'mountains' | 'winter_sun' | 'weekend_break' | 'business' | 'adventure' | 'culture';

export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface AirportSimple {
  code: string;
  name: string;
  city: string;
}

export interface BaggageInfo {
  cabinBagAllowed: boolean;
  checkedBagAllowed: boolean;
  checkedWeightLimitKg?: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: Airline;
  departureAirport: AirportSimple;
  arrivalAirport: AirportSimple;
  departureTime: string; // ISO string or short time e.g., "08:30"
  arrivalTime: string;   // ISO string or short time e.g., "11:45"
  duration: number;      // in minutes
  price: number;         // in GBP
  stops: number;
  stopDetails?: string[];
  aircraft: string;
  cabinClass: CabinClass;
  baggage: BaggageInfo;
  carbonFootprint: number; // in kg CO2
  onTimeRating: number;    // percentage e.g., 94
  score: number;           // quality rating out of 10 e.g. 9.2
  mealsIncluded: boolean;
  wifiAvailable: boolean;
}

export interface Lounge {
  name: string;
  operator: string;
  access: string;
  description: string;
  rating: number;
  amenities: string[];
  image: string;
}

export interface AirportServiceItem {
  name: string;
  type: string;
  location: string;
  description: string;
}

export interface TransportOption {
  name: string;
  type: 'train' | 'bus' | 'taxi' | 'express';
  duration: number; // in minutes
  cost: number;     // in GBP
  frequency: string;
}

export interface HotelSimple {
  name: string;
  rating: number;
  distance: string;
  price: number; // in GBP
}

export interface Terminal {
  name: string;
  lounges: Lounge[];
  shops: AirportServiceItem[];
  restaurants: AirportServiceItem[];
}

export interface Airport {
  id: string; // code (e.g., LHR)
  name: string;
  city: string;
  country: string;
  image: string;
  description: string;
  terminals: Terminal[];
  weather: {
    temp: number;
    condition: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  transport: TransportOption[];
  hotels: HotelSimple[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  category: DestinationCategory;
  image: string;
  description: string;
  priceEstimate: number; // in GBP
  topAttractions: string[];
  bestTimeToVisit: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  passportNumber: string;
  loyaltyNumber?: string;
  email: string;
}

export interface Trip {
  id: string;
  flight: Flight;
  passengerDetails: Passenger;
  seatNumber: string;
  bookingCode: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  departureGate?: string;
  boardingTime?: string;
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  departure: AirportSimple;
  arrival: AirportSimple;
  date: string;
  cabinClass: CabinClass;
  priceAlertsActive: boolean;
  createdAt: string;
}

export interface FareAlert {
  id: string;
  route: string; // e.g. "LHR ➔ JFK"
  currentPrice: number;
  previousPrice: number;
  direction: 'up' | 'down';
  createdAt: string;
}

export interface SearchCriteria {
  tripType: 'return' | 'one-way' | 'multi-city';
  origin: string; // airport code
  destination: string; // airport code
  departureDate: string; // YYYY-MM-DD
  returnDate?: string;   // YYYY-MM-DD
  cabinClass: CabinClass;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  multiCityLegs?: Array<{
    origin: string;
    destination: string;
    departureDate: string;
  }>;
}
