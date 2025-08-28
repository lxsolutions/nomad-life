
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env' });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');
  
  // Test database connection first
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 Please ensure PostgreSQL is running on localhost:5432');
    console.log('💡 You can start it with: docker compose -f infra/docker-compose.dev.yml up -d db');
    process.exit(1);
  }

  // Create test user for immigration flows
  const testUser = await prisma.user.upsert({
    where: { email: 'test+immigration@nomad.life' },
    update: {},
    create: {
      email: 'test+immigration@nomad.life',
      name: 'Immigration Test User',
      phone: '+15551234567',
      role: 'guest',
      kycStatus: 'approved',
      verifiedAt: new Date(),
      profile: {
        create: {
          dateOfBirth: new Date('1990-01-01'),
          nationality: 'US',
          documentId: 'TEST123456'
        }
      }
    },
    include: {
      profile: true
    }
  });

  console.log(`✅ Created test user: ${testUser.email}`);

  // Create sample visa applications
  const visaApplication = await prisma.visaApplication.create({
    data: {
      userId: testUser.id,
      visaPathId: 'thailand-visa-exempt',
      nationality: 'US',
      destination: 'TH',
      purpose: 'tourism',
      stayLengthDays: 30,
      hasDependents: false,
      currentResidence: 'US',
      checklist: {
        create: [
          {
            title: 'Prepare passport',
            description: 'Ensure passport is valid for at least 6 months',
            priority: 'critical',
            estimatedTimeMinutes: 5,
            completed: true
          },
          {
            title: 'Book onward flight',
            description: 'Proof of onward travel within 30 days',
            priority: 'high',
            estimatedTimeMinutes: 30,
            completed: false
          },
          {
            title: 'Prepare proof of funds',
            description: 'Bank statement showing equivalent of 20,000 THB',
            priority: 'medium',
            estimatedTimeMinutes: 15,
            completed: false
          }
        ]
      }
    },
    include: {
      checklist: true
    }
  });

  console.log(`✅ Created visa application: ${visaApplication.id}`);

  // Create sample reminders
  const reminder = await prisma.reminder.create({
    data: {
      userId: testUser.id,
      applicationId: visaApplication.id,
      type: 'tm30',
      title: 'Complete TM30 arrival reporting',
      description: 'Report your arrival to immigration within 24 hours',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      completed: false,
      recurrence: 'once'
    }
  });

  console.log(`✅ Created reminder: ${reminder.title}`);

  console.log('🌱 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
