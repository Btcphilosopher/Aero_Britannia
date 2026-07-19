/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Airport } from '../types';

export const airports: Airport[] = [
  {
    id: 'LHR',
    name: 'London Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    image: '/src/assets/images/heathrow_terminal_5_interior_1784489537047.jpg',
    description: 'The primary international gateway to the United Kingdom, Heathrow stands as one of the busiest and most architecturally significant aviation hubs globally. Featuring Foster + Partners layouts, Terminal 5 offers a refined, light-filled environment designed for smooth transfers and luxury pre-flight experiences.',
    weather: {
      temp: 19,
      condition: 'Partly Cloudy'
    },
    coordinates: {
      lat: 51.4700,
      lng: -0.4543
    },
    hotels: [
      { name: 'Sofitel London Heathrow (T5 Access)', rating: 4.8, distance: '0.1 miles (Direct Walkway)', price: 185 },
      { name: 'Hilton London Heathrow Airport', rating: 4.5, distance: '0.4 miles', price: 140 },
      { name: 'Radisson Blu Edwardian, Heathrow', rating: 4.4, distance: '1.2 miles', price: 110 }
    ],
    transport: [
      {
        name: 'Heathrow Express',
        type: 'express',
        duration: 15,
        cost: 25,
        frequency: 'Every 15 minutes to London Paddington'
      },
      {
        name: 'Elizabeth Line',
        type: 'train',
        duration: 35,
        cost: 12.80,
        frequency: 'Every 10 minutes to Central London & Canary Wharf'
      },
      {
        name: 'Piccadilly Line (London Underground)',
        type: 'train',
        duration: 50,
        cost: 5.60,
        frequency: 'Every 5 minutes to West End & Piccadilly Circus'
      },
      {
        name: 'Chauffeur / Black Cab Taxi',
        type: 'taxi',
        duration: 45,
        cost: 75,
        frequency: 'Available 24/7 on demand'
      }
    ],
    terminals: [
      {
        name: 'Terminal 5',
        lounges: [
          {
            name: 'The Concorde Room',
            operator: 'British Airways',
            access: 'First Class passengers & Concorde Room cardholders only',
            description: 'The pinnacle of private airport luxury, featuring vintage champagne, individual dining private booths, cabanas with day beds, and a beautiful outdoor terrace overlooking the runway.',
            rating: 4.9,
            amenities: ['Fine Dining', 'Champagne Bar', 'Cabanas', 'Spa treatments', 'Concierge'],
            image: '/src/assets/images/british_airways_lounge_luxury_1784489547393.jpg'
          },
          {
            name: 'Galleries Club Lounge (South)',
            operator: 'British Airways',
            access: 'Business Class (Club World/Europe) & Oneworld Sapphire/Emerald',
            description: 'Spacious lounge offering panoramic runway views, full hot buffet, complimentary bars, workspace zones, and comfortable seating in a sophisticated setting.',
            rating: 4.4,
            amenities: ['Hot Buffet', 'Premium Bars', 'Workstations', 'Showers', 'Kids Zone'],
            image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80'
          },
          {
            name: 'Plaza Premium Lounge',
            operator: 'Independent',
            access: 'Pay-per-visit, Priority Pass, DragonPass',
            description: 'Elegant, modern lounge with floor-to-ceiling windows, excellent selection of fresh hot and cold food, and visual workspace hubs.',
            rating: 4.2,
            amenities: ['Buffet', 'Shower Facilities', 'Private Resting Area', 'Draft Beer', 'Wi-Fi'],
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
          }
        ],
        shops: [
          { name: 'Harrods', type: 'Luxury Department Store', location: 'Gate A17', description: 'Curated selection of designer labels, fine food, tea, and souvenirs.' },
          { name: 'Fortnum & Mason', type: 'Fine English Food & Gifts', location: 'Gate A22', description: 'Famous hampers, loose-leaf English teas, marmalades, and sweets.' },
          { name: 'Tiffany & Co.', type: 'High Jewellery', location: 'Gate A15', description: 'Iconic fine jewellery, engagement rings, and classic gifts.' }
        ],
        restaurants: [
          { name: 'Gordon Ramsay Plane Food', type: 'British Editorial Dining', location: 'Departures Level 2', description: 'Express menu designed for pre-flight dining, including artisan burgers, short-rib, and British classics.' },
          { name: 'Wagamama', type: 'Asian Fusion & Noodle Bar', location: 'Departures Level 2', description: 'Fresh, fast-paced pan-Asian food, ramen, and nourishing juices.' },
          { name: 'Pilot’s Bar & Kitchen', type: '1950s Retro Diner', location: 'Gate A12', description: 'Premium visual British classics, full English breakfasts, and fine cocktails.' }
        ]
      },
      {
        name: 'Terminal 2 (The Queen’s Terminal)',
        lounges: [
          {
            name: 'Lufthansa Senator Lounge',
            operator: 'Lufthansa',
            access: 'Star Alliance Gold, First Class',
            description: 'Contemporary, calm lounge featuring excellent German beers, hot buffet, separate silent working spaces, and beautiful design elements.',
            rating: 4.5,
            amenities: ['Premium Dining', 'Bier on Tap', 'Work Cubicles', 'Forest Showers'],
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
          },
          {
            name: 'Singapore Airlines SilverKris Lounge',
            operator: 'Singapore Airlines',
            access: 'Business Class, Star Alliance Gold',
            description: 'Exquisite, warm atmosphere with individual high-walled work pods, authentic Singaporean laksa station, and top-tier hospitality.',
            rating: 4.7,
            amenities: ['Authentic Asian Cuisine', 'Cocktail Bar', 'Shower Suites', 'Solo Productivity Pods'],
            image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
          }
        ],
        shops: [
          { name: 'Mulberry', type: 'British Leather Craft', location: 'Departures Main Street', description: 'Luxury British bags, briefcases, and refined accessories.' },
          { name: 'Burberry', type: 'British Fashion House', location: 'Gate B35', description: 'Iconic trench coats, outerwear, and fine wool scarves.' }
        ],
        restaurants: [
          { name: 'The Perfectionists’ Cafe by Heston Blumenthal', type: 'Gourmet Gastropub', location: 'Departures Level', description: 'Unique culinary science applied to British classics: wood-fired pizza, nitrogen ice cream, and incredible fish & chips.' }
        ]
      }
    ]
  },
  {
    id: 'LCY',
    name: 'London City Airport',
    city: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    description: 'Located in the heart of London’s financial docks, London City Airport is the supreme speed choice for business and private flyers. Its single runway jutting into the Thames offers breathtaking approaches and departures over the skyscrapers of Canary Wharf and the City.',
    weather: {
      temp: 20,
      condition: 'Sunny'
    },
    coordinates: {
      lat: 51.5048,
      lng: 0.0500
    },
    hotels: [
      { name: 'Aloft London Excel', rating: 4.3, distance: '0.8 miles', price: 115 },
      { name: 'Novotel London Excel', rating: 4.2, distance: '1.1 miles', price: 125 }
    ],
    transport: [
      {
        name: 'Docklands Light Railway (DLR)',
        type: 'train',
        duration: 14,
        cost: 3.20,
        frequency: 'Every 4 minutes directly to Canary Wharf'
      },
      {
        name: 'City Uber / Taxi Service',
        type: 'taxi',
        duration: 20,
        cost: 35,
        frequency: 'Instant pickup'
      }
    ],
    terminals: [
      {
        name: 'Main Terminal',
        lounges: [
          {
            name: 'The First Class Lounge',
            operator: 'Airport Authority',
            access: 'Premium business bookings, private passengers',
            description: 'Ultra-quiet business sanctuary with private workspaces, tailored hot menu cooked to order, and direct tarmac transfer via luxury SUV.',
            rating: 4.8,
            amenities: ['A la carte Dining', 'Tarmac SUV Transfer', 'Valet', 'Quiet Office Pods'],
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
          }
        ],
        shops: [
          { name: 'Smythson', type: 'British Stationery & Leather', location: 'Gate 2', description: 'Fine stationery, diaries, and luxury travel leather goods.' }
        ],
        restaurants: [
          { name: 'The Cabin Bar & Grill', type: 'Modern British Diner', location: 'Departures Hall', description: 'Fine dry-aged steaks, British gin bar, and panoramic runway views.' }
        ]
      }
    ]
  },
  {
    id: 'MAN',
    name: 'Manchester Airport',
    city: 'Manchester',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80',
    description: 'The global gateway to the North of England, Manchester Airport serves a vast network of long-haul and regional flights. With its newly renovated Terminal 2, Manchester offers an airy, state-of-the-art layout complete with modern architectural features and premium lounges.',
    weather: {
      temp: 16,
      condition: 'Light Drizzle'
    },
    coordinates: {
      lat: 53.3588,
      lng: -2.2727
    },
    hotels: [
      { name: 'Radisson Blu Manchester Airport', rating: 4.5, distance: 'Connected (T1/T2 Skylink)', price: 130 },
      { name: 'Clayton Hotel Manchester Airport', rating: 4.2, distance: '0.3 miles', price: 95 }
    ],
    transport: [
      {
        name: 'TransPennine Express',
        type: 'train',
        duration: 15,
        cost: 6.20,
        frequency: 'Every 10 minutes to Manchester Piccadilly'
      },
      {
        name: 'Manchester Metrolink Tram',
        type: 'bus',
        duration: 45,
        cost: 4.60,
        frequency: 'Every 12 minutes'
      },
      {
        name: 'Airport Chauffeur / Cab',
        type: 'taxi',
        duration: 25,
        cost: 40,
        frequency: 'Available on demand'
      }
    ],
    terminals: [
      {
        name: 'Terminal 2 (The New Hub)',
        lounges: [
          {
            name: 'The 1903 Lounge',
            operator: 'Manchester Airport',
            access: 'Pre-book only, adults-only (16+)',
            description: 'An elegant premium sanctuary offering spectacular runway views, a curated buffet of local northern specialities, and hand-selected single malt whiskies.',
            rating: 4.6,
            amenities: ['Premium Local Buffet', 'Local Craft Beers', 'Single Malt Selection', 'FastTrack Security'],
            image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
          },
          {
            name: 'Escape Lounge',
            operator: 'Manchester Airport',
            access: 'Pay-at-gate, Priority Pass',
            description: 'A relaxed, family-friendly space to unwind before your flight. Offering fresh breakfast, pastries, light lunches, and a complimentary bar.',
            rating: 4.1,
            amenities: ['Hot Buffet', 'Open Bar', 'Charging Stations', 'Newspapers'],
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
          }
        ],
        shops: [
          { name: 'Selfridges Beauty', type: 'Designer Cosmetics', location: 'Departures Street', description: 'Premium selection of luxury cosmetics, skincare, and travel sizes.' },
          { name: 'WHSmith Bookshop & Press', type: 'Travel Essentials', location: 'Gate B12', description: 'Magazines, novels, journals, and local British sweets.' }
        ],
        restaurants: [
          { name: 'Archie’s Diner', type: 'Manchester Artisan Burgers', location: 'Departures Level 1', description: 'Famous northern pink diner serving handmade burgers and celebrity milkshakes.' },
          { name: 'San Carlo Cicchetti', type: 'Italian Premium Tapas', location: 'Lounge Zone', description: 'Award-winning Venetian small plates, fresh wood-fired bread, and fine wines.' }
        ]
      }
    ]
  },
  {
    id: 'EDI',
    name: 'Edinburgh Airport',
    city: 'Edinburgh',
    country: 'United Kingdom',
    image: '/src/assets/images/scenery_scottish_highlands_1784489525455.jpg',
    description: 'The primary gateway to Scotland’s stunning capital and majestic Highlands. Edinburgh Airport blends local Scottish charm with rapid operational speed, featuring high-quality regional cafes, boutique knitwear, and convenient tram links directly to Princes Street.',
    weather: {
      temp: 14,
      condition: 'Overcast'
    },
    coordinates: {
      lat: 55.9508,
      lng: -3.3615
    },
    hotels: [
      { name: 'Hampton by Hilton Edinburgh Airport', rating: 4.6, distance: '0.2 miles (Walkway)', price: 110 },
      { name: 'DoubleTree by Hilton Edinburgh Airport', rating: 4.4, distance: '0.4 miles', price: 98 }
    ],
    transport: [
      {
        name: 'Edinburgh Trams',
        type: 'train',
        duration: 25,
        cost: 6.50,
        frequency: 'Every 7 minutes directly to City Centre (Princes Street) & Newhaven'
      },
      {
        name: 'Airlink 100 Express Bus',
        type: 'bus',
        duration: 30,
        cost: 4.50,
        frequency: 'Every 10 minutes'
      },
      {
        name: 'Airport Taxi Rank',
        type: 'taxi',
        duration: 20,
        cost: 30,
        frequency: 'Available on demand'
      }
    ],
    terminals: [
      {
        name: 'Main Terminal',
        lounges: [
          {
            name: 'The Aspire Lounge',
            operator: 'Swissport',
            access: 'Pre-book, Priority Pass, Lounge Club',
            description: 'Featuring bespoke booths, work pods, local gin flight tastings, and delicious fresh soup, all overlooking the beautiful Pentland Hills.',
            rating: 4.3,
            amenities: ['Scottish Whisky Bar', 'Work Booths', 'Scenic Views', 'Hot Buffet'],
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
          },
          {
            name: 'Plaza Premium Lounge',
            operator: 'Independent',
            access: 'Pay-on-entry, DragonPass',
            description: 'Contemporary, stunningly designed space utilizing natural wood and warm stone, reflecting Scotland’s highland heritage.',
            rating: 4.5,
            amenities: ['Artisan Coffee Bar', 'Showers', 'Premium Buffet', 'Scenic Views'],
            image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
          }
        ],
        shops: [
          { name: 'The Royal Highland Shawls', type: 'Scottish Cashmere & Wool', location: 'Gate 4', description: 'Authentic tartan blankets, fine cashmere cardigans, and woollen socks.' },
          { name: 'World of Whiskies', type: 'Single Malt Boutique', location: 'Duty Free Central', description: 'Rare Speyside, Islay, and Highland single malts, including airport-exclusive bottlings.' }
        ],
        restaurants: [
          { name: 'The Sir Walter Scott Gastropub', type: 'Scottish Craft Diner', location: 'Departures Level 1', description: 'Craft Scottish ales, haggis bon-bons, venison burgers, and artisan breakfasts.' }
        ]
      }
    ]
  }
];
