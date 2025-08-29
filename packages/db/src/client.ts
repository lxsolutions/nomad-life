

import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env' });

declare global { var prisma: PrismaClient | undefined }
export const prisma = global.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
export default prisma;

