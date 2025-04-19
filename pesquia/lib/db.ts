import { PrismaClient } from '../lib/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}