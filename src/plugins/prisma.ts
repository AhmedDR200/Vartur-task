import fp from 'fastify-plugin';
import { PrismaClient } from '../../generated/prisma';

export default fp(async (fastify) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  fastify.decorate('prisma', prisma);
  fastify.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
});