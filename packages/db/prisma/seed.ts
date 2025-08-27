

import { db } from '../src/index';

// Bangkok districts and BTS/MRT stations
const BANGKOK_DISTRICTS = [
  'Sukhumvit', 'Sathorn', 'Silom', 'Pathumwan', 'Phrom Phong', 
  'Thonglor', 'Ekkamai', 'Ari', 'Ratchathewi', 'Phaya Thai',
  'Huai Khwang', 'Chatuchak', 'Bang Rak', 'Khlong Toei', 'Watthana'
];

const BTS_STATIONS = [
  'Siam', 'Chit Lom', 'Phloen Chit', 'Nana', 'Asok', 
  'Phrom Phong', 'Thong Lo', 'Ekkamai', 'Phra Khanong', 'On Nut',
  'Ari', 'Sanam Pao', 'Victory Monument', 'Mo Chit', 'Chatuchak Park'
];

const MRT_STATIONS = [
  'Sukhumvit', 'Silom', 'Lumphini', 'Khlong Toei', 'Queen Sirikit National Convention Centre',
  'Sukhumvit', 'Phetchaburi', 'Phra Ram 9', 'Thailand Cultural Centre', 'Huai Khwang'
];

// Sample building data for Bangkok
const BUILDINGS = [
  {
    name: 'The Esse at Sukhumvit',
    address: '123 Sukhumvit Road, Khlong Toei',
    district: 'Sukhumvit',
    latitude: 13.738,
    longitude: 100.560,
    transit: { bts: ['Asok', 'Phrom Phong'], mrt: ['Sukhumvit'] },
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Elevator']
  },
  {
    name: 'Ideo Q Sukhumvit',
    address: '456 Sukhumvit Soi 36, Phra Khanong',
    district: 'Sukhumvit',
    latitude: 13.725,
    longitude: 100.572,
    transit: { bts: ['Thong Lo', 'Phrom Phong'], mrt: [] },
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Co-working']
  },
  {
    name: 'The Line Jatujak',
    address: '789 Phahonyothin Road, Chatuchak',
    district: 'Chatuchak',
    latitude: 13.802,
    longitude: 100.552,
    transit: { bts: ['Mo Chit'], mrt: ['Chatuchak Park'] },
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Garden']
  },
  {
    name: 'Noble Around Ari',
    address: '321 Phahonyothin Road, Phaya Thai',
    district: 'Phaya Thai',
    latitude: 13.782,
    longitude: 100.542,
    transit: { bts: ['Ari', 'Sanam Pao'], mrt: [] },
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Cafe']
  },
  {
    name: 'Lumpini Place Rama 9',
    address: '999 Rama IX Road, Huai Khwang',
    district: 'Huai Khwang',
    latitude: 13.762,
    longitude: 100.572,
    transit: { bts: [], mrt: ['Phra Ram 9', 'Thailand Cultural Centre'] },
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Shopping']
  }
];

// Sample user data
const USERS = [
  // Admin
  {
    email: 'admin@rentshield.th',
    name: 'RentShield Admin',
    role: 'ADMIN' as const,
    phone: '+66123456789',
    verifiedAt: new Date()
  },
  // Agents
  {
    email: 'sompong@bangkokproperties.com',
    name: 'Sompong Chen',
    role: 'AGENT' as const,
    phone: '+66987654321',
    verifiedAt: new Date(),
    agentProfile: {
      agencyName: 'Bangkok Properties Co., Ltd.',
      licenseNo: 'AG123456',
      bio: 'Experienced real estate agent specializing in Sukhumvit area.',
      responseTimeAvg: 15
    }
  },
  {
    email: 'nareerat@premierestate.th',
    name: 'Nareerat Wong',
    role: 'AGENT' as const,
    phone: '+66811223344',
    verifiedAt: new Date(),
    agentProfile: {
      agencyName: 'Premiere Estate Thailand',
      licenseNo: 'AG654321',
      bio: 'Professional agent with 5+ years experience in luxury condos.',
      responseTimeAvg: 30
    }
  },
  // Owners
  {
    email: 'chatchai@email.com',
    name: 'Chatchai Srisuk',
    role: 'OWNER' as const,
    phone: '+66988776655',
    verifiedAt: new Date(),
    ownerProfile: {
      portfolioCount: 3
    }
  },
  {
    email: 'supaporn@email.com',
    name: 'Supaporn Lim',
    role: 'OWNER' as const,
    phone: '+66855443322',
    verifiedAt: new Date(),
    ownerProfile: {
      portfolioCount: 2
    }
  },
  // Renters
  {
    email: 'david@email.com',
    name: 'David Johnson',
    role: 'RENTER' as const,
    phone: '+66900112233',
    verifiedAt: new Date()
  },
  {
    email: 'jiraporn@email.com',
    name: 'Jiraporn Srisawat',
    role: 'RENTER' as const,
    phone: '+66899887766',
    verifiedAt: new Date()
  }
];

// Sample listings data
const LISTINGS = [
  {
    title: 'Modern Studio near BTS Asok',
    description: 'Beautiful studio apartment in prime Sukhumvit location. Fully furnished with high-speed internet, modern kitchen, and city views. Perfect for professionals.',
    media: ['https://picsum.photos/800/600?random=1', 'https://picsum.photos/800/600?random=2'],
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 32,
    floor: 12,
    furnished: true,
    priceTHB: 18000,
    depositTHB: 36000,
    minTermMonths: 6,
    availableFrom: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    pets: false,
    utilitiesNote: 'Electricity and water not included. Internet included.',
    parking: false
  },
  {
    title: 'Luxury 2-Bedroom in Thonglor',
    description: 'Spacious 2-bedroom condo in heart of Thonglor. Premium finishes, panoramic views, and access to all building amenities. Walking distance to BTS.',
    media: ['https://picsum.photos/800/600?random=3', 'https://picsum.photos/800/600?random=4'],
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 75,
    floor: 25,
    furnished: true,
    priceTHB: 45000,
    depositTHB: 90000,
    minTermMonths: 12,
    availableFrom: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    pets: true,
    utilitiesNote: 'All utilities included except electricity over 500 units',
    parking: true
  },
  {
    title: 'Cozy 1-Bedroom near Ari BTS',
    description: 'Charming 1-bedroom apartment in trendy Ari neighborhood. Recently renovated with new furniture and appliances. Close to cafes and restaurants.',
    media: ['https://picsum.photos/800/600?random=5', 'https://picsum.photos/800/600?random=6'],
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 45,
    floor: 8,
    furnished: true,
    priceTHB: 22000,
    depositTHB: 44000,
    minTermMonths: 12,
    availableFrom: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    pets: false,
    utilitiesNote: 'Water included. Electricity and internet extra.',
    parking: false
  },
  {
    title: 'Spacious 3-Bedroom Family Condo',
    description: 'Large family-friendly condo with 3 bedrooms and 2 bathrooms. Great for families or roommates. Quiet building with excellent security.',
    media: ['https://picsum.photos/800/600?random=7', 'https://picsum.photos/800/600?random=8'],
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 110,
    floor: 15,
    furnished: true,
    priceTHB: 55000,
    depositTHB: 110000,
    minTermMonths: 12,
    availableFrom: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
    pets: true,
    utilitiesNote: 'All utilities separate. Metered billing.',
    parking: true
  },
  {
    title: 'Budget Studio near On Nut BTS',
    description: 'Affordable studio apartment with basic furnishings. Good location near BTS and local markets. Perfect for students or budget-conscious renters.',
    media: ['https://picsum.photos/800/600?random=9', 'https://picsum.photos/800/600?random=10'],
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 28,
    floor: 6,
    furnished: true,
    priceTHB: 12000,
    depositTHB: 24000,
    minTermMonths: 6,
    availableFrom: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    pets: false,
    utilitiesNote: 'All utilities extra. Shared meter for building.',
    parking: false
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  const models = [
    'trustMetricSnapshot',
    'review',
    'viewingRequest',
    'favorite',
    'swipe',
    'leaseDraft',
    'inspection',
    'escrow',
    'dispute',
    'message',
    'thread',
    'listing',
    'building',
    'profileAgent',
    'profileOwner',
    'user'
  ];

  for (const model of models) {
    await (db as any)[model].deleteMany();
  }

  // Create buildings
  console.log('🏢 Creating buildings...');
  const createdBuildings = [];
  for (const buildingData of BUILDINGS) {
    const building = await db.building.create({
      data: buildingData
    });
    createdBuildings.push(building);
    console.log(`Created building: ${building.name}`);
  }

  // Create users with profiles
  console.log('👥 Creating users...');
  const createdUsers = [];
  for (const userData of USERS) {
    const { agentProfile, ownerProfile, ...userBase } = userData;
    
    const user = await db.user.create({
      data: {
        ...userBase,
        ...(agentProfile && {
          agentProfile: {
            create: agentProfile
          }
        }),
        ...(ownerProfile && {
          ownerProfile: {
            create: ownerProfile
          }
        })
      }
    });
    createdUsers.push(user);
    console.log(`Created user: ${user.name} (${user.role})`);
  }

  // Get agents and owners for listing assignment
  const agents = createdUsers.filter(u => u.role === 'AGENT');
  const owners = createdUsers.filter(u => u.role === 'OWNER');

  // Create listings
  console.log('🏠 Creating listings...');
  for (let i = 0; i < LISTINGS.length; i++) {
    const listingData = LISTINGS[i];
    const building = createdBuildings[i % createdBuildings.length];
    const owner = owners[i % owners.length];
    const agent = i % 2 === 0 ? agents[i % agents.length] : null; // Some listings have agents

    const listing = await db.listing.create({
      data: {
        ...listingData,
        ownerId: owner.id,
        agentId: agent?.id,
        buildingId: building.id,
        status: 'ACTIVE'
      }
    });
    console.log(`Created listing: ${listing.title} (฿${listing.priceTHB})`);
  }

  // Create some sample reviews
  console.log('⭐ Creating sample reviews...');
  const renters = createdUsers.filter(u => u.role === 'RENTER');
  const listings = await db.listing.findMany();
  
  // Create reviews for agents
  for (const agent of agents) {
    for (let i = 0; i < 3; i++) {
      const reviewer = renters[i % renters.length];
      await db.review.create({
        data: {
          reviewerId: reviewer.id,
          subjectType: 'AGENT',
          subjectId: agent.id,
          ratings: {
            communication: Math.floor(Math.random() * 5) + 1,
            accuracy: Math.floor(Math.random() * 5) + 1,
            fairness: Math.floor(Math.random() * 5) + 1,
            depositReturn: Math.floor(Math.random() * 5) + 1
          },
          comment: `Great agent! Very professional and responsive.`,
          verified: true
        }
      });
    }
  }

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

