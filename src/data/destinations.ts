/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'NCE',
    name: 'Nice',
    country: 'France',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'The glittering crown of the French Riviera, where dramatic azure waters meet the historic Promenade des Anglais. Indulge in warm Mediterranean sun, fresh seafood, and rich artistic culture.',
    priceEstimate: 145,
    topAttractions: ['Promenade des Anglais', 'Vieille Ville (Old Town)', 'Musée Matisse', 'Castle Hill (Colline du Château)'],
    bestTimeToVisit: 'May to October'
  },
  {
    id: 'JFK',
    name: 'New York City',
    country: 'United States',
    category: 'city',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    description: 'The legendary metropolis where high-altitude steel architecture meets endless cultural rhythm. Explore soaring observation decks, world-class theatre, and unmatched culinary depth.',
    priceEstimate: 380,
    topAttractions: ['Central Park', 'Manhattan Skyline (Summit One)', 'Broadway Theatre District', 'The Met Museum'],
    bestTimeToVisit: 'September to November (Autumn)'
  },
  {
    id: 'KEF',
    name: 'Reykjavik',
    country: 'Iceland',
    category: 'adventure',
    image: 'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=1200&q=80',
    description: 'The geothermal gateway to active volcanoes, roaring waterfalls, and the dancing Aurora Borealis. Reykjavik blends raw Nordic wilderness with hyper-modern design and cozy culture.',
    priceEstimate: 195,
    topAttractions: ['Hallgrímskirkja Cathedral', 'The Blue Lagoon', 'Golden Circle geysers', 'Northern Lights excursions'],
    bestTimeToVisit: 'October to March (Aurora) / June to August (Midnight Sun)'
  },
  {
    id: 'DXB',
    name: 'Dubai',
    country: 'United Arab Emirates',
    category: 'winter_sun',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'An oasis of ultra-futuristic architecture rising boldly out of the North Arabian desert. Perfect for high-end winter escapes, luxury shopping, and golden dunes under endless blue skies.',
    priceEstimate: 350,
    topAttractions: ['Burj Khalifa', 'The Palm Jumeirah', 'Dubai Mall & Fountain', 'Desert Conservation Safari'],
    bestTimeToVisit: 'November to February'
  },
  {
    id: 'ZRH',
    name: 'St. Moritz',
    country: 'Switzerland',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    description: 'The elegant alpine playground of Olympic heritage and stunning mountain vistas. St. Moritz combines premium ski chalets, frozen lake polo, and high-altitude luxury in the Swiss Alps.',
    priceEstimate: 210,
    topAttractions: ['Lake St. Moritz', 'Corvatsch Glacier & Piz Nair', 'Engadin Ski Trails', 'Glacier Express Railway'],
    bestTimeToVisit: 'December to March (Winter Sports) / July to August (Alpine Hiking)'
  },
  {
    id: 'HND',
    name: 'Tokyo',
    country: 'Japan',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'A beautiful collision of tranquil Shinto shrines and neon-washed futuristic crosswalks. Savour pristine culinary mastery, architectural masterpieces, and deep heritage craftsmanship.',
    priceEstimate: 720,
    topAttractions: ['Shibuya Crossing', 'Senso-ji Temple (Asakusa)', 'Meiji Jingu Forest', 'TeamLab Planets Digital Museum'],
    bestTimeToVisit: 'April to May (Cherry Blossom) / October to November (Autumn leaves)'
  },
  {
    id: 'BCN',
    name: 'Barcelona',
    country: 'Spain',
    category: 'weekend_break',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=1200&q=80',
    description: 'The Catalan jewel where Antoni Gaudí’s surrealist gothic architecture meets a vibrant beach promenade. The ultimate blend of visual art, sandy shores, and late-night tapas walks.',
    priceEstimate: 120,
    topAttractions: ['La Sagrada Família', 'Park Güell', 'Barri Gòtic (Gothic Quarter)', 'Barceloneta Beach'],
    bestTimeToVisit: 'May to June / September to October'
  },
  {
    id: 'FCO',
    name: 'Rome',
    country: 'Italy',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'The eternal living museum, where towering Roman ruins frame stylish pavement espresso culture. Step through millennia of history, Renaissance masterpieces, and exquisite Roman dining.',
    priceEstimate: 135,
    topAttractions: ['The Colosseum', 'Vatican Museums & Sistine Chapel', 'Trevi Fountain', 'Pantheon'],
    bestTimeToVisit: 'April to June / September to October'
  },
  {
    id: 'EDI',
    name: 'Edinburgh',
    country: 'United Kingdom',
    category: 'weekend_break',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    description: 'A dramatic skyline of medieval castles and neoclassical Georgian streets. Walk down the historic Royal Mile, climb the volcanic Arthur’s Seat, and explore cosy pubs with historic Scottish whiskies.',
    priceEstimate: 60,
    topAttractions: ['Edinburgh Castle', 'The Royal Mile', 'Arthur’s Seat volcanic hike', 'National Museum of Scotland'],
    bestTimeToVisit: 'May to September / December (Hogmanay celebration)'
  },
  {
    id: 'FRA',
    name: 'Frankfurt',
    country: 'Germany',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?auto=format&fit=crop&w=1200&q=80',
    description: 'The financial heart of mainland Europe, where historic timber architecture blends with the "Mainhattan" skyscraper skyline. Extremely fast transit, luxury hotels, and a launching pad for global finance.',
    priceEstimate: 110,
    topAttractions: ['Römerberg Square', 'Main Tower Observation Deck', 'Goethe House', 'Städel Museum'],
    bestTimeToVisit: 'September to October / December (Christmas Markets)'
  }
];
