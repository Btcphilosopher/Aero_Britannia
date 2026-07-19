/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flight, CabinClass, Airline, AirportSimple } from '../types';

// Supported airlines with correct names and codes
export const airlines: Airline[] = [
  { id: 'BA', name: 'British Airways', code: 'BA', logo: '🇬🇧' },
  { id: 'VS', name: 'Virgin Atlantic', code: 'VS', logo: '❤️' },
  { id: 'LM', name: 'Loganair', code: 'LM', logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'LH', name: 'Lufthansa', code: 'LH', logo: '🇩🇪' },
  { id: 'AF', name: 'Air France', code: 'AF', logo: '🇫🇷' },
  { id: 'EK', name: 'Emirates', code: 'EK', logo: '🇦🇪' }
];

// Simple helper to fetch airline details
export function getAirline(id: string): Airline {
  return airlines.find(a => a.id === id) || airlines[0];
}

// Map airport codes to their details for flight cards
export const airportMap: Record<string, AirportSimple> = {
  LHR: { code: 'LHR', name: 'London Heathrow', city: 'London' },
  LCY: { code: 'LCY', name: 'London City', city: 'London' },
  MAN: { code: 'MAN', name: 'Manchester Airport', city: 'Manchester' },
  EDI: { code: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh' },
  NCE: { code: 'NCE', name: 'Nice Côte d’Azur', city: 'Nice' },
  JFK: { code: 'JFK', name: 'New York JFK', city: 'New York' },
  KEF: { code: 'KEF', name: 'Keflavík International', city: 'Reykjavik' },
  DXB: { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
  ZRH: { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich' },
  HND: { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo' },
  BCN: { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona' },
  FCO: { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome' },
  FRA: { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' }
};

// Generates logical flight listings based on origin, destination and date
export function generateFlights(
  origin: string,
  destination: string,
  departureDateStr: string,
  cabin: CabinClass
): Flight[] {
  const departures = ['LHR', 'LCY', 'MAN', 'EDI'];
  const actualOrigin = departures.includes(origin) ? origin : 'LHR';
  const actualDestination = airportMap[destination] ? destination : 'JFK';

  if (actualOrigin === actualDestination) {
    return [];
  }

  const originAirport = airportMap[actualOrigin];
  const destAirport = airportMap[actualDestination];

  // Base configurations depending on distance
  const isLongHaul = ['JFK', 'DXB', 'HND'].includes(actualDestination);
  const isMediumHaul = ['KEF', 'ZRH', 'FRA'].includes(actualDestination);
  const isShortHaul = !isLongHaul && !isMediumHaul;

  // Multipliers for classes
  let classMultiplier = 1.0;
  if (cabin === 'premium_economy') classMultiplier = 1.6;
  if (cabin === 'business') classMultiplier = 3.5;
  if (cabin === 'first') classMultiplier = 6.8;

  // Let's create 6 logical flights spaced throughout the day
  const flightTemplates = [
    {
      timeOffset: '06:15',
      durationOffset: 0,
      priceOffset: -25,
      airlineId: actualOrigin === 'EDI' ? 'LM' : 'BA',
      stops: 0,
      aircraft: isLongHaul ? 'Airbus A350-1000' : 'Airbus A320neo',
      score: 8.8
    },
    {
      timeOffset: '08:45',
      durationOffset: 15,
      priceOffset: 20,
      airlineId: isLongHaul ? 'VS' : 'BA',
      stops: 0,
      aircraft: isLongHaul ? 'Boeing 787-9 Dreamliner' : 'Airbus A321neo',
      score: 9.2
    },
    {
      timeOffset: '11:30',
      durationOffset: -10,
      priceOffset: 45,
      airlineId: 'BA',
      stops: 0,
      aircraft: isLongHaul ? 'Boeing 777-300ER' : 'Airbus A320neo',
      score: 9.5
    },
    {
      timeOffset: '14:20',
      durationOffset: 25,
      priceOffset: -10,
      airlineId: isLongHaul ? 'BA' : 'AF',
      stops: isShortHaul ? 0 : 1,
      stopDetails: isShortHaul ? [] : ['CDG Paris (55m)'],
      aircraft: isLongHaul ? 'Boeing 787-9' : 'Embraer 190',
      score: 8.5
    },
    {
      timeOffset: '17:55',
      durationOffset: 5,
      priceOffset: 15,
      airlineId: isLongHaul ? 'VS' : 'LH',
      stops: isShortHaul ? 0 : 1,
      stopDetails: isShortHaul ? [] : ['FRA Frankfurt (1h 05m)'],
      aircraft: isLongHaul ? 'Airbus A350-1000' : 'Airbus A319',
      score: 8.9
    },
    {
      timeOffset: '20:30',
      durationOffset: -5,
      priceOffset: -35,
      airlineId: actualDestination === 'DXB' ? 'EK' : 'BA',
      stops: 0,
      aircraft: actualDestination === 'DXB' ? 'Airbus A380-800' : (isLongHaul ? 'Boeing 787-9' : 'Airbus A320neo'),
      score: 9.0
    }
  ];

  // Base parameters
  let basePrice = 85; // short haul
  let baseDuration = 95; // minutes (e.g. London to Paris)
  let baseCarbon = 65; // kg

  if (isLongHaul) {
    if (actualDestination === 'JFK') {
      basePrice = 320;
      baseDuration = 475; // ~8h
      baseCarbon = 420;
    } else if (actualDestination === 'DXB') {
      basePrice = 410;
      baseDuration = 415; // ~7h
      baseCarbon = 380;
    } else if (actualDestination === 'HND') {
      basePrice = 680;
      baseDuration = 710; // ~12h
      baseCarbon = 640;
    }
  } else if (isMediumHaul) {
    if (actualDestination === 'KEF') {
      basePrice = 140;
      baseDuration = 185; // 3h
      baseCarbon = 150;
    } else if (actualDestination === 'ZRH') {
      basePrice = 105;
      baseDuration = 100; // 1h40m
      baseCarbon = 85;
    } else if (actualDestination === 'FRA') {
      basePrice = 110;
      baseDuration = 90; // 1h30m
      baseCarbon = 80;
    }
  } else {
    // Other short hauls (Nice, Barcelona, Rome, Edinburgh etc.)
    if (actualDestination === 'NCE') {
      basePrice = 85;
      baseDuration = 120;
      baseCarbon = 95;
    } else if (actualDestination === 'BCN') {
      basePrice = 90;
      baseDuration = 135;
      baseCarbon = 110;
    } else if (actualDestination === 'FCO') {
      basePrice = 115;
      baseDuration = 155;
      baseCarbon = 130;
    } else if (actualDestination === 'EDI') {
      basePrice = 55;
      baseDuration = 80;
      baseCarbon = 60;
    }
  }

  // Map templates to actual flight objects
  return flightTemplates.map((tmpl, idx) => {
    const flightPrice = Math.round((basePrice + tmpl.priceOffset) * classMultiplier);
    const flightDuration = baseDuration + tmpl.durationOffset + (tmpl.stops * 75); // add layover time

    // Calculate arrival time
    const [depHours, depMins] = tmpl.timeOffset.split(':').map(Number);
    const totalMinutes = depHours * 60 + depMins + flightDuration;
    const arrHours = Math.floor((totalMinutes / 60) % 24);
    const arrMins = Math.floor(totalMinutes % 60);
    const arrivalTimeStr = `${String(arrHours).padStart(2, '0')}:${String(arrMins).padStart(2, '0')}`;

    // Baggage details
    const baggageAllowed = {
      cabinBagAllowed: true,
      checkedBagAllowed: cabin !== 'economy',
      checkedWeightLimitKg: cabin === 'first' ? 32 : cabin === 'business' ? 32 : cabin === 'premium_economy' ? 23 : undefined
    };

    const wifi = cabin !== 'economy' || tmpl.airlineId === 'VS' || tmpl.airlineId === 'EK';
    const meal = cabin !== 'economy' || isLongHaul;

    return {
      id: `${tmpl.airlineId}-${idx + 100}-${actualOrigin}-${actualDestination}-${departureDateStr.replace(/-/g, '')}`,
      flightNumber: `${getAirline(tmpl.airlineId).code}${Math.floor(100 + idx * 43 + Math.random() * 5)}`,
      airline: getAirline(tmpl.airlineId),
      departureAirport: originAirport,
      arrivalAirport: destAirport,
      departureTime: tmpl.timeOffset,
      arrivalTime: arrivalTimeStr,
      duration: flightDuration,
      price: flightPrice,
      stops: tmpl.stops,
      stopDetails: tmpl.stopDetails,
      aircraft: tmpl.aircraft,
      cabinClass: cabin,
      baggage: baggageAllowed,
      carbonFootprint: Math.round(baseCarbon * (tmpl.aircraft.includes('A380') ? 1.2 : tmpl.aircraft.includes('neo') ? 0.8 : 1.0)),
      onTimeRating: Math.floor(82 + (tmpl.score - 8) * 8),
      score: tmpl.score,
      mealsIncluded: meal,
      wifiAvailable: wifi
    };
  });
}
